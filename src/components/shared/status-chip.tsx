import React from "react";
import { cn } from "@/lib/utils";

export type StatusType =
  | "present"
  | "absent"
  | "late"
  | "excused"
  | "paid"
  | "pending"
  | "overdue"
  | "partial"
  | "boarded"
  | "not-picked"
  | "dropped"
  | "no-show"
  | "delayed"
  | "on-schedule"
  | "completed"
  | "active"
  | "in-progress"
  | "investigating"
  | "resolved"
  | "high"
  | "medium"
  | "low";

interface StatusChipProps {
  status: StatusType | string;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: React.ReactNode;
}

const statusStyles: Record<string, string> = {
  // Attendance
  present: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  absent: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  late: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  excused: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",

  // Finance
  paid: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  overdue: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  partial: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",

  // Transport rider & trips
  boarded: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  "not-picked": "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20",
  dropped: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
  "no-show": "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
  delayed: "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30 animate-pulse",
  "on-schedule": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  completed: "bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30",
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "in-progress": "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30",

  // Incidents
  high: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
  medium: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
  low: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
  investigating: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
  resolved: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
};

export function StatusChip({
  status,
  label,
  size = "md",
  className,
  icon,
}: StatusChipProps) {
  const normalizedKey = status.toLowerCase().replace(/\s+/g, "-");
  const style =
    statusStyles[normalizedKey] ||
    "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700";

  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
    lg: "text-sm px-3 py-1.5 gap-2",
  };

  const displayText =
    label ||
    status.charAt(0).toUpperCase() + status.slice(1).replace(/-/g, " ");

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium border transition-colors select-none",
        sizeStyles[size],
        style,
        className,
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{displayText}</span>
    </span>
  );
}
