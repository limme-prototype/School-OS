import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Briefcase,
  Bus,
  ChevronDown,
  ExternalLink,
  GraduationCap,
  LayoutDashboard,
  Smartphone,
  Sparkles,
  Users,
  Users2,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PrototypeAppDef {
  id: string;
  name: string;
  khmer?: string;
  role: string;
  route: string;
  type: "mobile" | "desktop" | "responsive";
  icon: any;
  color: string;
  badge: string;
  description: string;
  flows: string[];
}

export const PROTOTYPES: PrototypeAppDef[] = [
  {
    id: "student",
    name: "Student App",
    role: "K-12 Students",
    route: "/student",
    type: "mobile",
    icon: GraduationCap,
    color: "bg-blue-600 text-white",
    badge: "Mobile",
    description: "Personalized timetable, assignments, academic results, and school bus status.",
    flows: ["Schedule", "Homework", "Bus Route", "Results"],
  },
  {
    id: "parent",
    name: "Parent App",
    role: "Parents / Guardians",
    route: "/parent",
    type: "mobile",
    icon: Users2,
    color: "bg-indigo-600 text-white",
    badge: "Mobile",
    description: "Child switcher, progress tracking, Bakong KHQR fee payment, and bus notifications.",
    flows: ["Child Switcher", "Tuition & KHQR", "Bus Tracker", "Attendance"],
  },
  {
    id: "teacher",
    name: "Teacher App",
    role: "Classroom Teachers",
    route: "/teacher",
    type: "mobile",
    icon: BookOpen,
    color: "bg-sky-600 text-white",
    badge: "Mobile",
    description: "Attendance marking with bus sync, homework posting, gradebook, and notices.",
    flows: ["Today's Classes", "Roll Call Attendance", "Gradebook", "Announcements"],
  },
  {
    id: "bus-staff",
    name: "Bus Staff App",
    role: "Drivers & Assistants",
    route: "/bus-staff",
    type: "mobile",
    icon: Bus,
    color: "bg-amber-500 text-amber-950 font-bold",
    badge: "Mobile",
    description: "Route navigator, student boarding check-in/out, and incident alerts.",
    flows: ["Trip Runner", "Student Boarding", "Live Stops", "Incident Reports"],
  },
  {
    id: "admin",
    name: "Admin Portal",
    role: "School Admin & Office",
    route: "/admin",
    type: "desktop",
    icon: LayoutDashboard,
    color: "bg-slate-900 text-white",
    badge: "Desktop",
    description: "Student management, billing & fees, bus fleet operations, and school settings.",
    flows: ["Executive Dashboard", "Student Directory", "Fee Invoices", "Transport"],
  },
];

export function ShowcaseNav() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const isHub = currentPath === "/";
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentApp = PROTOTYPES.find((p) => p.route === currentPath);

  return (
    <div
      suppressHydrationWarning
      className="sticky top-0 z-50 flex h-12 w-full items-center justify-between border-b border-border/80 bg-background/95 px-3 backdrop-blur sm:px-6"
    >
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-bold tracking-tight text-primary transition-colors hover:text-primary/80"
        >
          <div className="grid size-6 place-items-center rounded-md bg-primary text-primary-foreground font-extrabold text-[11px]">
            OS
          </div>
          <span className="hidden sm:inline">School OS</span>
          <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
            UX Prototypes
          </span>
        </Link>

        {!isHub && (
          <>
            <span className="text-muted-foreground/50">/</span>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-md border border-input bg-card px-2.5 py-1 text-xs font-semibold shadow-xs hover:bg-muted"
              >
                {currentApp && (
                  <>
                    <currentApp.icon className="size-3.5 text-primary" />
                    <span>{currentApp.name}</span>
                  </>
                )}
                <ChevronDown className="size-3 text-muted-foreground" />
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute left-0 top-9 z-50 w-72 rounded-lg border border-border bg-popover p-1.5 shadow-xl">
                    <div className="px-2 py-1 text-[10px] font-semibold uppercase text-muted-foreground">
                      Switch Prototype
                    </div>
                    {PROTOTYPES.map((p) => {
                      const Icon = p.icon;
                      const active = p.route === currentPath;
                      return (
                        <Link
                          key={p.id}
                          to={p.route}
                          onClick={() => setDropdownOpen(false)}
                          className={cn(
                            "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-xs transition-colors",
                            active
                              ? "bg-primary text-primary-foreground font-semibold"
                              : "text-foreground hover:bg-muted"
                          )}
                        >
                          <div
                            className={cn(
                              "grid size-6 shrink-0 place-items-center rounded-md",
                              active ? "bg-white/20 text-white" : p.color
                            )}
                          >
                            <Icon className="size-3.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium">{p.name}</p>
                            <p className={cn("text-[10px] truncate", active ? "text-primary-foreground/80" : "text-muted-foreground")}>
                              {p.role}
                            </p>
                          </div>
                          <span className={cn("text-[9px] font-mono", active ? "text-primary-foreground/75" : "text-muted-foreground")}>
                            {p.type === "mobile" ? "360p" : p.type === "desktop" ? "1440p" : "Web"}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        {!isHub ? (
          <Link to="/">
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs font-semibold">
              <ArrowLeft className="size-3.5" />
              <span className="hidden sm:inline">Back to Prototype Hub</span>
              <span className="sm:hidden">Hub</span>
            </Button>
          </Link>
        ) : (
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="inline-block size-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-foreground">5 Apps</span>
          </div>
        )}
      </div>
    </div>
  );
}
