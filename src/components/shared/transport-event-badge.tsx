import React from "react";
import {
  AlertTriangle,
  Bell,
  Bus,
  CheckCircle2,
  Clock,
  Flag,
  MapPin,
  ShieldCheck,
  UserCheck,
  UserX,
} from "lucide-react";
import { TransportEventType } from "@/data/mock-data";
import { cn } from "@/lib/utils";

interface TransportEventBadgeProps {
  type: TransportEventType;
  timestamp?: string;
  className?: string;
  showIcon?: boolean;
}

export function TransportEventBadge({
  type,
  timestamp,
  className,
  showIcon = true,
}: TransportEventBadgeProps) {
  let label = type.replace(/_/g, " ");
  let color = "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-200";
  let icon = <Bus className="size-3.5" />;

  switch (type) {
    case "TRIP_STARTED":
    case "PM_TRIP_STARTED":
      label = "Trip Started";
      color = "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30";
      icon = <Bus className="size-3.5 text-sky-600" />;
      break;
    case "STOP_ARRIVED":
      label = "Stop Arrived";
      color = "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30";
      icon = <MapPin className="size-3.5 text-blue-600" />;
      break;
    case "STUDENT_BOARDED":
      label = "Boarded Safely";
      color = "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
      icon = <UserCheck className="size-3.5 text-emerald-600" />;
      break;
    case "STUDENT_ARRIVED_CAMPUS":
      label = "Arrived at Campus";
      color = "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
      icon = <CheckCircle2 className="size-3.5 text-emerald-600" />;
      break;
    case "STUDENT_DROPPED_OFF":
      label = "Dropped Off";
      color = "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
      icon = <ShieldCheck className="size-3.5 text-emerald-600" />;
      break;
    case "STUDENT_NO_SHOW":
      label = "Student No-Show";
      color = "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30";
      icon = <UserX className="size-3.5 text-rose-600" />;
      break;
    case "ROUTE_DELAYED":
      label = "Route Delayed";
      color = "bg-amber-500/20 text-amber-800 dark:text-amber-200 border-amber-500/30";
      icon = <Clock className="size-3.5 text-amber-600" />;
      break;
    case "INCIDENT_LOGGED":
      label = "Incident Logged";
      color = "bg-rose-500/20 text-rose-800 dark:text-rose-200 border-rose-500/30";
      icon = <AlertTriangle className="size-3.5 text-rose-600" />;
      break;
    case "ETA_ALERT_SENT":
      label = "ETA Alert Sent";
      color = "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30";
      icon = <Bell className="size-3.5 text-purple-600" />;
      break;
    case "GUARDIAN_CONFIRMED":
      label = "Guardian Confirmed";
      color = "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
      icon = <ShieldCheck className="size-3.5 text-emerald-600" />;
      break;
    case "TRIP_COMPLETED":
      label = "Trip Completed";
      color = "bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30";
      icon = <Flag className="size-3.5 text-slate-600" />;
      break;
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border",
        color,
        className,
      )}
    >
      {showIcon && icon}
      <span>{label}</span>
      {timestamp && (
        <span className="opacity-75 font-normal ml-0.5 text-[10px]">
          · {timestamp}
        </span>
      )}
    </div>
  );
}
