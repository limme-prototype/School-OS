import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PROTOTYPES } from "@/components/showcase-nav";

export function ShowcaseHub() {
  return (
    <div suppressHydrationWarning className="min-h-[calc(100dvh-3rem)] bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 sm:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            School OS
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">
            Integrated education operating system for Cambodian K-12 schools, unifying student information, Bakong KHQR tuition billing, and live bus fleet tracking.
          </p>
        </div>

        <div>
          <div className="mb-5 flex items-center justify-between border-b border-border/80 pb-3">
            <div>
              <h2 className="text-base font-bold text-foreground">Core Ecosystem</h2>
              <p className="text-xs text-muted-foreground">5 Daily Operational Apps</p>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              5 Connected Roles
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROTOTYPES.map((app) => {
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

                    <p className="mt-3.5 text-xs text-muted-foreground leading-relaxed">
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
      </div>
    </div>
  );
}
