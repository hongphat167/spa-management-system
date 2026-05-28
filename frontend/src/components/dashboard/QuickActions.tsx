import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function QuickActions({ title, actions }: { title: string; actions: string[] }) {
  return (
    <Card>
      <h3 className="mb-4 font-semibold">{title}</h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {actions.map((action) => (
          <Button key={action} className="justify-start rounded-xl bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100">
            {action}
          </Button>
        ))}
      </div>
    </Card>
  );
}
