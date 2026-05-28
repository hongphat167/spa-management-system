"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "@/i18n/useTranslation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

export default function LoginPage() {
  const { t } = useTranslation(["auth", "common"]);
  const schema = z.object({ email: z.string().email(t("auth:errors.email")), password: z.string().min(6, t("auth:errors.password")), remember: z.boolean().optional() });
  type FormData = z.infer<typeof schema>;
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", remember: false },
  });

  return (
    <Card className="w-full max-w-md space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{t("auth:title")}</h1>
        <LanguageSwitcher />
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(async () => new Promise((r) => setTimeout(r, 500)))}>
        <div>
          <Input placeholder={t("auth:email")} {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>}
        </div>
        <div>
          <Input type="password" placeholder={t("auth:password")} {...register("password")} />
          {errors.password && <p className="mt-1 text-xs text-rose-600">{errors.password.message}</p>}
        </div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register("remember")} /> {t("auth:remember")}</label>
        <Button type="submit" disabled={isSubmitting} className="w-full">{isSubmitting ? t("common:buttons.loading") : t("auth:login")}</Button>
      </form>
    </Card>
  );
}
