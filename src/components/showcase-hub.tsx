import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PROTOTYPES } from "@/components/showcase-nav";

export function ShowcaseHub() {
  const coreApps = PROTOTYPES.filter((p) =>
    ["parent", "student", "teacher", "bus-staff", "admin"].includes(p.id)
  );
  const portalApps = PROTOTYPES.filter((p) =>
    ["applicant", "alumni", "employer"].includes(p.id)
  );

  return (
    <div suppressHydrationWarning className="min-h-[calc(100dvh-3rem)] bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 sm:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            School OS Interactive Prototypes
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Complete multi-portal operating system for Cambodian K-12 education, tuition billing, and bus tracking.
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <div className="mb-4 flex items-center justify-between border-b border-border/70 pb-2">
              <h2 className="text-sm font-semibold text-foreground">Core Ecosystem</h2>
              <span className="text-xs text-muted-foreground">5 Daily Operational Apps</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {coreApps.map((app) => {
                const Icon = app.icon;
                return (
                  <Link
                    key={app.id}
                    to={app.route}
                    className="group flex flex-col justify-between rounded-xl border border-border/80 bg-card p-5 shadow-2xs transition hover:border-primary/50 hover:shadow-xs"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="grid size-9 place-items-center rounded-lg bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <Icon className="size-4.5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                              {app.name}
                            </h3>
                            <p className="text-[11px] text-muted-foreground">{app.role}</p>
                          </div>
                        </div>
                        <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          {app.badge}
                        </span>
                      </div>

                      <p className="mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {app.description}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-3 text-xs font-semibold text-primary">
                      <span>Launch App</span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between border-b border-border/70 pb-2">
              <h2 className="text-sm font-semibold text-foreground">Specialized Web Portals</h2>
              <span className="text-xs text-muted-foreground">Admissions, Alumni & Career Partnerships</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {portalApps.map((app) => {
                const Icon = app.icon;
                return (
                  <Link
                    key={app.id}
                    to={app.route}
                    className="group flex flex-col justify-between rounded-xl border border-border/80 bg-card p-5 shadow-2xs transition hover:border-primary/50 hover:shadow-xs"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="grid size-9 place-items-center rounded-lg bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <Icon className="size-4.5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                              {app.name}
                            </h3>
                            <p className="text-[11px] text-muted-foreground">{app.role}</p>
                          </div>
                        </div>
                        <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          {app.badge}
                        </span>
                      </div>

                      <p className="mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {app.description}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-3 text-xs font-semibold text-primary">
                      <span>Launch Portal</span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
