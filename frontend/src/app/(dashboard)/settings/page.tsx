"use client";

import { useTranslation } from "@/i18n/useTranslation";
import { Card } from "@/components/ui/Card";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import ThemeSwitcher from "@/components/layout/ThemeSwitcher";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  const { t } = useTranslation("settings");
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="space-y-3"><h2 className="font-semibold">{t("profile")}</h2><Input placeholder={t("name")} /><Input placeholder={t("email")} /><Button>{t("save")}</Button></Card>
        <Card className="space-y-3"><h2 className="font-semibold">{t("preferences")}</h2><div className="flex items-center justify-between"><span>{t("language")}</span><LanguageSwitcher /></div><div className="flex items-center justify-between"><span>{t("theme")}</span><ThemeSwitcher /></div></Card>
      </div>
    </div>
  );
}
