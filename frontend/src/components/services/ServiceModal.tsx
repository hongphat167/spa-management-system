"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { createService, updateService } from "@/lib/api";
import { ServiceRow } from "@/lib/api";

type ServiceModalProps = {
  open: boolean;
  onClose: () => void;
  service?: ServiceRow | null;
};

const initialForm = {
  id: undefined as number | undefined,
  name: "",
  description: "",
  imageUrl: "",
  price: "",
  durationMinutes: "60",
  isActive: true,
};

function dispatchToast(kind: "success" | "error", message: string) {
  window.dispatchEvent(
    new CustomEvent("spa-api-toast", {
      detail: { kind, message },
    }),
  );
}

export default function ServiceModal({ open, onClose, service }: ServiceModalProps) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (open) {
      setForm(
        service
          ? {
              id: service.id,
              name: service.name,
              description: service.description,
              imageUrl: service.imageUrl ?? "",
              price: String(service.price),
              durationMinutes: String(service.durationMinutes),
              isActive: service.isActive,
            }
          : initialForm,
      );
    }
  }, [open, service]);

  function handleImageFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setForm((current) => ({ ...current, imageUrl: result }));
      }
    };
    reader.readAsDataURL(file);
  }

  const mutation = useMutation({
    mutationFn: () => {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        imageUrl: form.imageUrl.trim() || undefined,
        price: Number(form.price),
        durationMinutes: Number(form.durationMinutes),
        isActive: form.isActive,
      };

      return form.id ? updateService(form.id, payload) : createService(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["services"] });
      dispatchToast("success", service ? `Service \"${form.name}\" updated successfully.` : `Service \"${form.name}\" created successfully.`);
      onClose();
      setForm(initialForm);
    },
  });

  return (
    <Modal open={open} onClose={onClose} title={service ? "Edit Service" : "Add Service"}>
      <form
        className="space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          mutation.mutate();
        }}
      >
        <Input
          placeholder="Service name"
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          required
        />
        <textarea
          className="min-h-24 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-blue-400 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-900"
          placeholder="Description"
          value={form.description}
          onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
        />
        <div className="space-y-2 rounded-xl border border-dashed border-slate-300 p-3 dark:border-slate-700">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Service image</p>
            <Button
              type="button"
              className="h-9 rounded-lg bg-slate-100 px-3 text-xs text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload file
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageFileChange}
          />
          <Input
            placeholder="Image URL or data URL"
            value={form.imageUrl}
            onChange={(event) => setForm((current) => ({ ...current, imageUrl: event.target.value }))}
          />
          {form.imageUrl && (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
              <img src={form.imageUrl} alt="Service preview" className="h-40 w-full object-cover" />
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="number"
            min="0"
            step="0.01"
            placeholder="Price"
            value={form.price}
            onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
            required
          />
          <Input
            type="number"
            min="1"
            step="1"
            placeholder="Duration (minutes)"
            value={form.durationMinutes}
            onChange={(event) => setForm((current) => ({ ...current, durationMinutes: event.target.value }))}
            required
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(event) => setForm((current) => ({ ...current, isActive: event.target.checked }))}
          />
          Active
        </label>
        <div className="flex items-center justify-end gap-2 pt-2">
          <Button type="button" className="bg-gray-300 text-black hover:bg-gray-400" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : service ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
