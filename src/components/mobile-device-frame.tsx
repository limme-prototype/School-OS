import { useState } from "react";
import {
  Battery,
  Laptop,
  Maximize2,
  Minimize2,
  RotateCcw,
  Smartphone,
  Sparkles,
  Tablet,
  Wifi,
  Signal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PROTOTYPES } from "@/components/showcase-nav";

interface MobileDeviceFrameProps {
  children: React.ReactNode;
  appName: string;
  roleBadge?: string;
}

type DeviceMode = "standard" | "large" | "tablet" | "fluid";

export function MobileDeviceFrame({ children, appName, roleBadge }: MobileDeviceFrameProps) {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("standard");
  const [showBezel, setShowBezel] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  // Match current prototype to get descriptive flows and info
  const prototype = PROTOTYPES.find(
    (p) =>
      p.name.toLowerCase().includes(appName.toLowerCase()) ||
      appName.toLowerCase().includes(p.name.toLowerCase())
  );

  return (
    <div className="relative flex min-h-[calc(100dvh-3rem)] w-full flex-col items-center justify-center overflow-x-hidden bg-slate-100/80 dark:bg-slate-950 sm:p-4 md:p-6">
      {/* Frame Top Toolbar (visible on screens >= sm) */}
      <header
        suppressHydrationWarning
        className="z-20 mb-3 hidden w-full max-w-4xl items-center justify-between px-2 text-xs text-slate-600 dark:text-slate-400 sm:flex"
      >
        {/* Left: App title, role badge, and active flows */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-semibold text-foreground tracking-tight">{appName}</span>
          {roleBadge && (
            <span className="rounded-md border border-border bg-card px-2 py-0.5 text-[10px] font-medium text-muted-foreground shadow-2xs">
              {roleBadge}
            </span>
          )}
          {prototype?.flows && (
            <div className="hidden lg:flex items-center gap-1.5 ml-2 border-l border-border pl-3">
              {prototype.flows.slice(0, 3).map((f) => (
                <span
                  key={f}
                  className="rounded bg-muted/60 border border-border/60 px-1.5 py-0.5 text-[10px] text-muted-foreground font-normal"
                >
                  {f}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right: Device size switchers, bezel toggle, reset */}
        <div className="flex items-center gap-1.5 shrink-0 bg-card border border-border rounded-lg p-1 shadow-2xs">
          {/* Preset buttons */}
          <div className="flex items-center rounded-md bg-muted/50 p-0.5 border border-border/60">
            <button
              onClick={() => setDeviceMode("standard")}
              title="Standard Phone (390px)"
              className={cn(
                "flex items-center gap-1 rounded px-2 py-1 text-[11px] font-medium transition cursor-pointer",
                deviceMode === "standard"
                  ? "bg-card text-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Smartphone className="size-3" />
              <span>390p</span>
            </button>
            <button
              onClick={() => setDeviceMode("large")}
              title="Large Phone / Max (430px)"
              className={cn(
                "flex items-center gap-1 rounded px-2 py-1 text-[11px] font-medium transition cursor-pointer",
                deviceMode === "large"
                  ? "bg-card text-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span>430p</span>
            </button>
            <button
              onClick={() => setDeviceMode("tablet")}
              title="Tablet / Wide (540px)"
              className={cn(
                "flex items-center gap-1 rounded px-2 py-1 text-[11px] font-medium transition cursor-pointer",
                deviceMode === "tablet"
                  ? "bg-card text-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Tablet className="size-3" />
              <span>Wide</span>
            </button>
            <button
              onClick={() => setDeviceMode("fluid")}
              title="Fluid Full Width"
              className={cn(
                "flex items-center gap-1 rounded px-2 py-1 text-[11px] font-medium transition cursor-pointer",
                deviceMode === "fluid"
                  ? "bg-card text-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Maximize2 className="size-3" />
              <span>Fit</span>
            </button>
          </div>

          <div className="h-4 w-px bg-border" />

          {/* Bezel Frame toggle */}
          <button
            onClick={() => setShowBezel(!showBezel)}
            title="Toggle device bezel"
            className={cn(
              "flex items-center gap-1 rounded px-2 py-1 text-[11px] font-medium transition cursor-pointer",
              showBezel
                ? "bg-muted text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            )}
          >
            <span>{showBezel ? "Bezel" : "Frameless"}</span>
          </button>

          {/* Reset key */}
          <button
            onClick={() => setReloadKey((k) => k + 1)}
            title="Reset prototype state"
            className="flex size-7 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer"
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>
      </header>

      {/* Main Prototype Device Container */}
      <div
        key={reloadKey}
        className={cn(
          "transition-all duration-200 relative flex flex-col overflow-hidden bg-background",
          // Mobile screen (< 640px): 100% full-bleed native experience
          "w-full h-[calc(100dvh-3rem)] rounded-none border-0 shadow-none",
          // Desktop / Tablet screens (>= 640px): Interactive framed canvas
          deviceMode === "standard" &&
            "sm:w-[390px] sm:h-[min(844px,calc(100dvh-7.5rem))] sm:rounded-[44px]",
          deviceMode === "large" &&
            "sm:w-[430px] sm:h-[min(888px,calc(100dvh-7.5rem))] sm:rounded-[44px]",
          deviceMode === "tablet" &&
            "sm:w-[540px] sm:h-[min(880px,calc(100dvh-7.5rem))] sm:rounded-[32px]",
          deviceMode === "fluid" &&
            "sm:w-full sm:max-w-2xl sm:h-[calc(100dvh-7.5rem)] sm:rounded-2xl",
          // Bezel styles on desktop
          showBezel && [
            "sm:border-[10px] sm:border-slate-900 sm:ring-1 sm:ring-slate-800",
            "sm:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.22),0_0_0_1px_rgba(0,0,0,0.08)]",
          ],
          !showBezel && "sm:border sm:border-border sm:shadow-md sm:rounded-2xl"
        )}
      >
        {/* Modern Dynamic Island & Phone Status Bar (Only in Bezel mode on desktop) */}
        {showBezel && (
          <div
            suppressHydrationWarning
            className="hidden sm:flex h-8 w-full shrink-0 items-center justify-between bg-slate-950 px-5 text-[11px] font-semibold text-slate-300 select-none z-30"
          >
            <span className="font-mono text-[10px] tracking-tight">09:41</span>

            {/* Dynamic Island pill */}
            <div className="h-5 w-24 rounded-full bg-black ring-1 ring-white/10 flex items-center justify-end pr-2 gap-1.5 shadow-inner">
              <span className="size-1.5 rounded-full bg-emerald-500/90 animate-pulse" />
              <span className="size-2 rounded-full bg-slate-900 border border-slate-700" />
            </div>

            <div className="flex items-center gap-1.5 text-slate-300">
              <Signal className="size-3 opacity-90" />
              <Wifi className="size-3 opacity-90" />
              <Battery className="size-3.5 opacity-90" />
            </div>
          </div>
        )}

        {/* Application Content Canvas */}
        <div className="relative flex flex-1 min-h-0 flex-col overflow-hidden bg-background">
          {children}
        </div>

        {/* Home Indicator Bar (Only in Bezel mode on desktop) */}
        {showBezel && (
          <div className="hidden sm:flex h-4 w-full shrink-0 items-center justify-center bg-card select-none z-30 pb-0.5">
            <div className="h-1 w-32 rounded-full bg-foreground/25" />
          </div>
        )}
      </div>

      {/* Footer hint for testers */}
      <p className="mt-3 hidden sm:block text-center text-[11px] text-muted-foreground">
        School OS Native Mobile Experience · Tap controls to simulate live user actions
      </p>
    </div>
  );
}
