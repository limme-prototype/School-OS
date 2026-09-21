import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Bus,
  GraduationCap,
  LayoutDashboard,
  Users2,
} from "lucide-react";
import { PROTOTYPES } from "@/components/showcase-nav";

export function ShowcaseHub() {
  return (
    <div suppressHydrationWarning className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">School OS</h1>
          <p className="text-sm text-slate-500 mt-1">Select an app to open the interactive prototype</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {PROTOTYPES.map((app) => {
            const Icon = app.icon;
            return (
              <Link
                key={app.id}
                to={app.route}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-blue-500 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="grid size-10 place-items-center rounded-lg bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <h2 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {app.name}
                        </h2>
                        <span className="text-xs text-slate-500">{app.role}</span>
                      </div>
                    </div>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                      {app.badge}
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                    {app.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-medium text-blue-600">
                  <span>Open Prototype</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
