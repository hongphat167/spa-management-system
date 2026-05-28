import { Skeleton } from "@/components/ui/Skeleton";

export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-1/3" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
}
