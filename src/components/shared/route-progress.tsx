import React from "react";
import { CheckCircle2, Clock, MapPin } from "lucide-react";
import { RouteStop } from "@/data/mock-data";
import { cn } from "@/lib/utils";

interface RouteProgressProps {
  stops: RouteStop[];
  currentStopIndex?: number;
  delayMinutes?: number;
  className?: string;
  onStopClick?: (stop: RouteStop) => void;
}

export function RouteProgress({
  stops,
  currentStopIndex = 2,
  delayMinutes = 0,
  className,
  onStopClick,
}: RouteProgressProps) {
  return (
    <div className={cn("relative space-y-0", className)}>
      {stops.map((stop, index) => {
        const isArrived = index < currentStopIndex;
        const isCurrent = index === currentStopIndex;
        const isPending = index > currentStopIndex;

        return (
          <div
            key={stop.id}
            onClick={() => onStopClick?.(stop)}
            className={cn(
              "group relative flex items-start gap-3.5 pb-6 last:pb-1",
              onStopClick && "cursor-pointer",
            )}
          >
            {/* Connecting line */}
            {index < stops.length - 1 && (
              <div
                className={cn(
                  "absolute left-[13px] top-[26px] h-full w-[2px]",
                  isArrived ? "bg-emerald-500" : isCurrent ? "bg-amber-400" : "bg-border",
                )}
              />
            )}

            {/* Stop indicator badge */}
            <div className="relative z-10 shrink-0">
              {isArrived ? (
                <div className="grid size-7 place-items-center rounded-full bg-emerald-500 text-white shadow-xs">
                  <CheckCircle2 className="size-4" />
                </div>
              ) : isCurrent ? (
                <div className="relative grid size-7 place-items-center rounded-full bg-amber-500 text-white shadow-xs animate-bounce">
                  <MapPin className="size-4" />
                </div>
              ) : (
                <div className="grid size-7 place-items-center rounded-full border-2 border-border bg-card text-muted-foreground text-xs font-bold">
                  {stop.sequence}
                </div>
              )}
            </div>

            {/* Stop content */}
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex items-center justify-between gap-2">
                <p
                  className={cn(
                    "text-xs font-semibold leading-tight",
                    isCurrent ? "text-amber-600 dark:text-amber-400 font-bold" : "text-foreground",
                  )}
                >
                  {stop.name}
                </p>
                <span
                  className={cn(
                    "shrink-0 text-[11px] font-mono",
                    isCurrent
                      ? "rounded bg-amber-500/10 px-1.5 py-0.5 text-amber-700 dark:text-amber-300 font-bold"
                      : "text-muted-foreground",
                  )}
                >
                  {isCurrent && delayMinutes > 0
                    ? `+${delayMinutes}m delay`
                    : stop.actualArrivalTime || stop.scheduledPickupTime}
                </span>
              </div>

              <p className="mt-0.5 text-[11px] text-muted-foreground truncate">
                {stop.landmark} · {stop.expectedRidersCount} riders expected
              </p>

              {isCurrent && delayMinutes > 0 && (
                <div className="mt-1.5 flex items-center gap-1.5 rounded-md bg-amber-500/10 px-2 py-1 text-[11px] font-medium text-amber-800 dark:text-amber-300 border border-amber-500/20">
                  <Clock className="size-3 shrink-0" />
                  <span>Traffic delay. Revised arrival window active.</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
