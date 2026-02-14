import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  count?: number;
}

export function PageHeader({
  title,
  description,
  icon: Icon,
  count,
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-7 w-7 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            {title}
          </h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      {count !== undefined && (
        <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
          <span className="text-sm font-medium text-primary">{count} items</span>
        </div>
      )}
    </div>
  );
}
