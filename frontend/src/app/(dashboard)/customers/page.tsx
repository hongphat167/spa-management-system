"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCustomers } from "@/features/customers/hooks/use-customers";
import { CustomerForm } from "@/features/customers/components/customer-form";

export default function CustomersPage() {
  const { data = [] } = useCustomers();
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Customers</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add customer</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create customer</DialogTitle>
            </DialogHeader>
            <CustomerForm
              onSubmit={() => {
                toast.success("Customer saved");
                setOpen(false);
              }}
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable
        data={data}
        searchKey="fullName"
        columns={[
          { key: "fullName", label: "Name" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "loyaltyPoints", label: "Loyalty points" },
        ]}
      />
    </div>
  );
}
