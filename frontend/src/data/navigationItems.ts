import type { LucideIcon } from "lucide-react";
import { CalendarDays, FileText, LayoutDashboard, Settings, Sparkles, Users } from "lucide-react";

export interface NavigationItem {
  href: string;
  key: string;
  icon: LucideIcon;
}

export const navigationItems: NavigationItem[] = [
  { href: "/dashboard", key: "navigation.dashboard", icon: LayoutDashboard },
  { href: "/customers", key: "navigation.customers", icon: Users },
  { href: "/services", key: "navigation.services", icon: Sparkles },
  { href: "/appointments", key: "navigation.appointments", icon: CalendarDays },
  { href: "/invoices", key: "navigation.invoices", icon: FileText },
  { href: "/settings", key: "navigation.settings", icon: Settings },
];
