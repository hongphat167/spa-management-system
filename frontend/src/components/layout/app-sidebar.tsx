"use client";

import Link from "next/link";
import { CalendarDays, FileText, LayoutDashboard, Scissors, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["ADMIN", "MANAGER", "THERAPIST", "RECEPTIONIST"] },
  { href: "/customers", label: "Customers", icon: Users, roles: ["ADMIN", "MANAGER", "RECEPTIONIST"] },
  { href: "/services", label: "Services", icon: Scissors, roles: ["ADMIN", "MANAGER"] },
  { href: "/appointments", label: "Appointments", icon: CalendarDays, roles: ["ADMIN", "MANAGER", "THERAPIST", "RECEPTIONIST"] },
  { href: "/invoices", label: "Invoices", icon: FileText, roles: ["ADMIN", "MANAGER", "RECEPTIONIST"] },
];

export function AppSidebar({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const visibleNavigation = navigation.filter((item) => !user || item.roles.includes(user.role));

  return (
    <aside className={cn("border-r border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950", collapsed ? "w-20" : "w-64")}> 
      <div className="mb-6 text-sm font-semibold">{collapsed ? "SPA" : "Spa Management"}</div>
      <nav className="space-y-1">
        {visibleNavigation.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900",
                active && "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
