import React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: {
    value: string;
    trend: "up" | "down" | "neutral";
    label?: string;
  };
  icon?: React.ReactNode;
  badge?: string;
  badgeVariant?: "default" | "warning" | "success" | "danger";
  onClick?: () => void;
  className?: string;
}

export function KpiCard({
  title,
  value,
  subtitle,
  change,
  icon,
  badge,
  badgeVariant = "default",
  onClick,
  className,
}: KpiCardProps) {
  const badgeColors = {
    default: "bg-primary/10 text-primary border-primary/20",
    warning: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    success: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    danger: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-xl border border-border bg-card p-4 transition-all shadow-xs",
        onClick && "cursor-pointer hover:border-primary/50 hover:shadow-md active:scale-[0.99]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground">{title}</p>
        {badge && (
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-semibold border",
              badgeColors[badgeVariant],
            )}
          >
            {badge}
          </span>
        )}
        {icon && !badge && (
          <div className="text-muted-foreground/80">{icon}</div>
        )}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <h3 className="text-2xl font-bold tracking-tight text-foreground">
          {value}
        </h3>
        {change && (
          <div
            className={cn(
              "flex items-center text-xs font-semibold",
              change.trend === "up" && "text-emerald-600 dark:text-emerald-400",
              change.trend === "down" && "text-rose-600 dark:text-rose-400",
              change.trend === "neutral" && "text-muted-foreground",
            )}
          >
            {change.trend === "up" && <ArrowUpRight className="size-3.5" />}
            {change.trend === "down" && <ArrowDownRight className="size-3.5" />}
            <span>{change.value}</span>
            {change.label && (
              <span className="ml-1 text-[10px] font-normal text-muted-foreground">
                {change.label}
              </span>
            )}
          </div>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
