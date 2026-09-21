import { useMemo, useState } from "react";
import {
  AlertCircle,
  Bell,
  BookOpen,
  Building2,
  Bus,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  Download,
  Eye,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Plus,
  Radio,
  Search,
  Send,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Section =
  | "Dashboard"
  | "Students & Parents"
  | "Classes & Programs"
  | "Admissions"
  | "Fees & Finance"
  | "Transport"
  | "Communication"
  | "Reports"
  | "Settings & Roles";

const navItems: Array<{ label: Section; khmer: string; icon: LucideIcon }> = [
  { label: "Dashboard", khmer: "ផ្ទាំងគ្រប់គ្រង", icon: LayoutDashboard },
  { label: "Students & Parents", khmer: "សិស្ស និងអាណាព្យាបាល", icon: Users },
  { label: "Classes & Programs", khmer: "ថ្នាក់ និងកម្មវិធី", icon: BookOpen },
  { label: "Admissions", khmer: "ការចុះឈ្មោះ", icon: ClipboardList },
  { label: "Fees & Finance", khmer: "ថ្លៃសិក្សា និងហិរញ្ញវត្ថុ", icon: CircleDollarSign },
  { label: "Transport", khmer: "ការដឹកជញ្ជូន", icon: Bus },
  { label: "Communication", khmer: "ទំនាក់ទំនង", icon: MessageSquare },
  { label: "Reports", khmer: "របាយការណ៍ និងស្ថិតិ", icon: TrendingUp },
  { label: "Settings & Roles", khmer: "ការកំណត់ និងតួនាទី", icon: Settings },
];

const students = [
  { id: "STU-2401", name: "Sokha Chan", khmer: "ចាន់ សុខា", grade: "Grade 8A", parent: "Dara Chan", attendance: "96%", status: "Active" },
  { id: "STU-2402", name: "Sreyneang Lim", khmer: "លឹម ស្រីនាង", grade: "Grade 7B", parent: "Malis Lim", attendance: "92%", status: "Active" },
  { id: "STU-2403", name: "Vannak Chea", khmer: "ជា វណ្ណៈ", grade: "Grade 9A", parent: "Sopheap Chea", attendance: "84%", status: "Review" },
  { id: "STU-2404", name: "Bopha Heng", khmer: "ហេង បុប្ផា", grade: "Grade 6C", parent: "Rady Heng", attendance: "98%", status: "Active" },
  { id: "STU-2405", name: "Makara Pen", khmer: "ប៉ែន មករា", grade: "Grade 8B", parent: "Sovann Pen", attendance: "89%", status: "Active" },
];

const invoices = [
  { id: "INV-2026-0842", student: "Sokha Chan", item: "Term 1 Tuition", due: "24 Sep 2026", amount: "$420.00", status: "Paid" },
  { id: "INV-2026-0841", student: "Sreyneang Lim", item: "Term 1 Tuition", due: "24 Sep 2026", amount: "$420.00", status: "Pending" },
  { id: "INV-2026-0839", student: "Vannak Chea", item: "Bus Service · Q3", due: "18 Sep 2026", amount: "$90.00", status: "Overdue" },
  { id: "INV-2026-0836", student: "Bopha Heng", item: "Learning Materials", due: "30 Sep 2026", amount: "$55.00", status: "Pending" },
  { id: "INV-2026-0832", student: "Makara Pen", item: "Term 1 Tuition", due: "12 Sep 2026", amount: "$420.00", status: "Paid" },
];

const accounts = [
  { name: "Kosal Meas", email: "kosal@school.edu.kh", role: "Super Admin", last: "Today, 06:32", status: "Active" },
  { name: "Sophea Touch", email: "sophea@school.edu.kh", role: "Registrar", last: "Yesterday, 16:45", status: "Active" },
  { name: "Rachana Kim", email: "rachana@school.edu.kh", role: "Accountant", last: "Yesterday, 14:10", status: "Active" },
  { name: "Vuthy Sao", email: "vuthy@school.edu.kh", role: "Transport Manager", last: "18 Sep, 07:12", status: "Invited" },
];

export function AdminPortal() {
  const [section, setSection] = useState<Section>("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selectSection = (next: Section) => {
    setSection(next);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-[calc(100dvh-3rem)] min-h-[700px] overflow-hidden bg-background font-sans text-foreground">
      <Sidebar section={section} open={sidebarOpen} onSelect={selectSection} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setSidebarOpen(true)} />
        <main className="min-w-0 flex-1 overflow-y-auto">
          {section === "Dashboard" && <Dashboard onNavigate={selectSection} />}
          {section === "Students & Parents" && <StudentsPage />}
          {section === "Fees & Finance" && <FinancePage />}
          {section === "Transport" && <TransportPage />}
          {section === "Reports" && <ReportsPage />}
          {section === "Settings & Roles" && <RolesPage />}
          {section === "Classes & Programs" && <ClassesPage />}
          {section === "Admissions" && <AdmissionsPage />}
          {section === "Communication" && <CommunicationPage />}
        </main>
      </div>
    </div>
  );
}

function Sidebar({
  section,
  open,
  onSelect,
  onClose,
}: {
  section: Section;
  open: boolean;
  onSelect: (section: Section) => void;
  onClose: () => void;
}) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-overlay lg:hidden" onClick={onClose} aria-hidden="true" />}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col bg-sidebar text-sidebar-foreground transition-transform lg:static lg:translate-x-0 border-r border-sidebar-border",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-[64px] items-center gap-3 border-b border-sidebar-border px-5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-sidebar-foreground">School OS</p>
            <p className="text-[11px] text-sidebar-muted">Admin Portal · ផ្ទាំងគ្រប់គ្រង</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground lg:hidden"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="size-4" />
          </Button>
        </div>

        <div className="border-b border-sidebar-border px-4 py-3">
          <button className="flex w-full items-center gap-2.5 rounded-md border border-sidebar-border bg-sidebar-surface px-2.5 py-2 text-left transition-colors hover:bg-sidebar-accent cursor-pointer">
            <div className="flex size-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
              NS
            </div>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-semibold text-sidebar-foreground">New Sunrise School</span>
              <span className="block truncate text-[10px] text-sidebar-muted">Phnom Penh Campus</span>
            </span>
            <ChevronDown className="size-3.5 text-sidebar-muted" />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-3" aria-label="Main navigation">
          <p className="mb-2 px-3 text-[11px] font-semibold text-sidebar-foreground/70">
            Workspace
          </p>
          {navItems.map(({ label, khmer, icon: Icon }) => (
            <button
              key={label}
              onClick={() => onSelect(label)}
              className={cn(
                "group flex min-h-10 w-full items-center gap-2.5 rounded-md px-3 text-left text-xs transition-colors cursor-pointer",
                section === label
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-surface hover:text-sidebar-foreground"
              )}
            >
              <Icon className={cn("size-4", section === label ? "text-primary-foreground" : "text-primary")} />
              <span className="min-w-0 flex-1">
                <span className="block truncate">{label}</span>
                <span className={cn("block truncate text-[9px]", section === label ? "opacity-90" : "text-sidebar-muted")}>
                  {khmer}
                </span>
              </span>
              {label === "Admissions" && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.2 text-[9px] font-bold",
                    section === label ? "bg-white text-primary" : "bg-primary text-primary-foreground"
                  )}
                >
                  12
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <div className="rounded-md bg-sidebar-surface p-2.5">
            <div className="mb-1.5 flex items-center justify-between text-[11px]">
              <span className="text-sidebar-muted">Academic year</span>
              <span className="font-semibold text-sidebar-foreground">2026–2027</span>
            </div>
            <div className="h-1.5 rounded-full bg-sidebar-border overflow-hidden">
              <div className="h-full w-[38%] rounded-full bg-primary" />
            </div>
            <p className="mt-1.5 text-[9px] text-sidebar-muted">Term 1 · Week 6 of 16</p>
          </div>
        </div>
      </aside>
    </>
  );
}

function Topbar({ onMenu }: { onMenu: () => void }) {
  const [lang, setLang] = useState<"EN" | "ខ្មែរ">("EN");
  const [langOpen, setLangOpen] = useState(false);
  const [notifsOpen, setNotifsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  return (
    <header className="relative flex h-[64px] shrink-0 items-center gap-4 border-b border-border bg-card px-5 lg:px-7">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenu} aria-label="Open menu">
        <Menu className="size-5" />
      </Button>

      <div className="relative hidden w-full max-w-[380px] sm:block">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="h-9 bg-muted/70 pl-9 shadow-none text-xs border-0"
          placeholder="Search students, invoices, classes..."
          aria-label="Global search"
        />
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-border bg-card px-1 py-0.5 text-[9px] font-mono text-muted-foreground">
          ⌘K
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Language selector dropdown */}
        <div className="relative">
          <Button
            variant="ghost"
            onClick={() => {
              setLangOpen(!langOpen);
              setNotifsOpen(false);
              setUserMenuOpen(false);
            }}
            className="hidden h-9 gap-1 px-2.5 text-muted-foreground sm:flex text-xs font-semibold hover:text-foreground"
          >
            <span>{lang === "EN" ? "EN / English" : "ខ្មែរ / Khmer"}</span>
            <ChevronDown className="size-3" />
          </Button>

          {langOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
              <div className="absolute right-0 top-10 z-50 w-36 rounded-lg border border-border bg-popover p-1 shadow-lg text-xs">
                <button
                  onClick={() => {
                    setLang("EN");
                    setLangOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-2 text-left cursor-pointer",
                    lang === "EN" ? "bg-primary text-white font-semibold" : "hover:bg-muted"
                  )}
                >
                  <span>English (EN)</span>
                  {lang === "EN" && <Check className="size-3.5" />}
                </button>
                <button
                  onClick={() => {
                    setLang("ខ្មែរ");
                    setLangOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-2 text-left cursor-pointer",
                    lang === "ខ្មែរ" ? "bg-primary text-white font-semibold" : "hover:bg-muted"
                  )}
                >
                  <span>ភាសាខ្មែរ (KH)</span>
                  {lang === "ខ្មែរ" && <Check className="size-3.5" />}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setNotifsOpen(!notifsOpen);
              setLangOpen(false);
              setUserMenuOpen(false);
            }}
            className="relative size-9"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
            {unreadCount > 0 && (
              <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-card bg-destructive" />
            )}
          </Button>

          {notifsOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setNotifsOpen(false)} />
              <div className="absolute right-0 top-10 z-50 w-80 rounded-xl border border-border bg-popover p-3 shadow-xl">
                <div className="flex items-center justify-between border-b pb-2 mb-2">
                  <span className="font-bold text-xs text-foreground">Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => setUnreadCount(0)}
                      className="text-[10px] text-primary hover:underline font-semibold cursor-pointer"
                    >
                      Mark read
                    </button>
                  )}
                </div>
                <div className="space-y-2 text-xs">
                  <div className="rounded-lg bg-muted/60 p-2.5">
                    <p className="font-semibold text-foreground">Payment received via Bakong</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Sokha Chan · Invoice INV-2026-0842 · $420.00</p>
                    <span className="text-[9px] text-primary font-medium mt-1 inline-block">12 min ago</span>
                  </div>
                  <div className="rounded-lg bg-muted/60 p-2.5">
                    <p className="font-semibold text-foreground">Bus trip completed</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Route 03 · Morning pickup finished on time</p>
                    <span className="text-[9px] text-primary font-medium mt-1 inline-block">34 min ago</span>
                  </div>
                  <div className="rounded-lg bg-muted/60 p-2.5">
                    <p className="font-semibold text-foreground">New Admissions Application</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Grade 7 applicant Sovann Vicheka submitted</p>
                    <span className="text-[9px] text-primary font-medium mt-1 inline-block">1 hour ago</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mx-1 h-6 w-px bg-border" />

        {/* User profile menu */}
        <div className="relative">
          <button
            onClick={() => {
              setUserMenuOpen(!userMenuOpen);
              setLangOpen(false);
              setNotifsOpen(false);
            }}
            className="flex items-center gap-2 rounded-md p-1 text-left hover:bg-muted cursor-pointer transition-colors"
          >
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                KM
              </AvatarFallback>
            </Avatar>
            <span className="hidden lg:block">
              <span className="block text-xs font-semibold leading-tight">Kosal Meas</span>
              <span className="block text-[10px] text-muted-foreground leading-tight">Super Admin</span>
            </span>
            <ChevronDown className="hidden size-3.5 text-muted-foreground lg:block" />
          </button>

          {userMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
              <div className="absolute right-0 top-11 z-50 w-56 rounded-xl border border-border bg-popover p-2 shadow-xl text-xs">
                <div className="px-2.5 py-2 border-b border-border/80">
                  <p className="font-bold text-foreground">Kosal Meas</p>
                  <p className="text-[10px] text-muted-foreground">kosal@school.edu.kh</p>
                  <span className="inline-block mt-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200 px-1.5 py-0.5 text-[9px] font-bold">
                    Super Admin Role
                  </span>
                </div>
                <div className="mt-1 space-y-0.5">
                  <button
                    onClick={() => setUserMenuOpen(false)}
                    className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left hover:bg-muted cursor-pointer"
                  >
                    <Settings className="size-3.5 text-muted-foreground" />
                    <span>Profile & Account Settings</span>
                  </button>
                  <button
                    onClick={() => setUserMenuOpen(false)}
                    className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left hover:bg-muted cursor-pointer"
                  >
                    <ShieldCheck className="size-3.5 text-muted-foreground" />
                    <span>Security & 2FA</span>
                  </button>
                  <div className="my-1 border-t border-border" />
                  <button
                    onClick={() => setUserMenuOpen(false)}
                    className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-destructive hover:bg-destructive/10 cursor-pointer"
                  >
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="mb-1 text-xs font-semibold text-primary">{eyebrow}</p>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}

function Dashboard({ onNavigate }: { onNavigate: (section: Section) => void }) {
  return (
    <div className="mx-auto max-w-[1440px] p-5 lg:p-7">
      <PageHeader
        eyebrow="Sunday, 20 September 2026"
        title="Good afternoon, Kosal"
        description="Here’s what’s happening across New Sunrise School today."
        action={
          <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
            <CalendarDays className="size-3.5" />
            <span>Academic Year 2026–2027</span>
            <ChevronDown className="size-3" />
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi
          icon={Users}
          label="Total students"
          value="1,248"
          detail="+34 this term"
          tone="blue"
          onClick={() => onNavigate("Students & Parents")}
        />
        <Kpi
          icon={Check}
          label="Attendance today"
          value="94.6%"
          detail="1,181 present"
          tone="green"
        />
        <Kpi
          icon={CircleDollarSign}
          label="Outstanding fees"
          value="$18,420"
          detail="72 invoices"
          tone="red"
          onClick={() => onNavigate("Fees & Finance")}
        />
        <Kpi
          icon={Bus}
          label="Bus riders today"
          value="386"
          detail="12 active routes"
          tone="amber"
          onClick={() => onNavigate("Transport")}
        />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.65fr_1fr]">
        <section className="rounded-lg border border-border bg-card p-5 shadow-card">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-sm">Attendance trend</h2>
              <p className="text-xs text-muted-foreground">Average daily attendance · Last 7 days</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-success">
              <TrendingUp className="size-4" /> 2.4%
            </span>
          </div>
          <div className="relative h-[210px] border-b border-l border-border">
            {["100%", "95%", "90%", "85%"].map((v, i) => (
              <span key={v} className="absolute -left-10 text-[10px] text-muted-foreground" style={{ top: `${i * 31}%` }}>
                {v}
              </span>
            ))}
            <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 700 210" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="var(--primary)" stopOpacity="0.2" />
                  <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 105 C70 98, 82 65, 140 72 S230 102,280 81 S370 45,420 58 S515 84,560 52 S650 34,700 40 L700 210 L0 210 Z"
                fill="url(#chartFill)"
              />
              <path
                d="M0 105 C70 98, 82 65, 140 72 S230 102,280 81 S370 45,420 58 S515 84,560 52 S650 34,700 40"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
          <div className="mt-3 flex justify-between pl-1 text-[10px] text-muted-foreground">
            <span>Mon 14</span>
            <span>Tue 15</span>
            <span>Wed 16</span>
            <span>Thu 17</span>
            <span>Fri 18</span>
            <span>Sat 19</span>
            <span>Sun 20</span>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-card p-5 shadow-card">
          <div className="mb-5">
            <h2 className="font-semibold text-sm">Enrollment by division</h2>
            <p className="text-xs text-muted-foreground">1,248 active students across K-12</p>
          </div>
          <div className="space-y-4">
            {[
              ["Primary (1–6)", 548, "44%"],
              ["Lower secondary (7–9)", 410, "33%"],
              ["Upper secondary (10–12)", 290, "23%"],
            ].map(([label, value, percent]) => (
              <div key={String(label)}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span>{label}</span>
                  <span className="font-semibold">{value}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: String(percent) }} />
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate("Students & Parents")}
            className="mt-7 flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-border text-xs font-semibold text-primary hover:bg-accent cursor-pointer"
          >
            View student directory <ChevronRight className="size-3.5" />
          </button>
        </section>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.65fr_1fr]">
        <RecentActivity />
        <section className="rounded-lg border border-border bg-card p-5 shadow-card">
          <h2 className="font-semibold text-sm">Quick actions</h2>
          <p className="mb-4 text-xs text-muted-foreground">Administrative shortcuts</p>
          <div className="grid grid-cols-2 gap-3">
            <QuickAction icon={Users} label="Add student" onClick={() => onNavigate("Students & Parents")} />
            <QuickAction icon={FileText} label="Create invoice" onClick={() => onNavigate("Fees & Finance")} />
            <QuickAction icon={Bus} label="View trips" onClick={() => onNavigate("Transport")} />
            <QuickAction icon={Mail} label="Announcement" onClick={() => onNavigate("Communication")} />
          </div>
        </section>
      </div>
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  detail,
  tone,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
  tone: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-lg border border-border bg-card p-5 shadow-card transition",
        onClick && "cursor-pointer hover:border-primary/60 hover:shadow-md active:scale-[.99]"
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="mt-1.5 text-2xl font-bold">{value}</p>
        </div>
        <div className={cn("flex size-10 items-center justify-center rounded-md", `tone-${tone}`)}>
          <Icon className="size-5" />
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}

function RecentActivity() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-sm">Recent activity</h2>
          <p className="text-xs text-muted-foreground">Live transactions and transport sync</p>
        </div>
        <Button variant="ghost" size="sm" className="h-8 text-xs">
          View all
        </Button>
      </div>
      <div className="divide-y divide-border">
        {[
          ["SC", "Payment received via Bakong", "Sokha Chan · Invoice INV-2026-0842", "$420.00", "12 min"],
          ["VT", "Bus trip completed", "Route R03 · Morning pickup", "On time", "34 min"],
          ["SL", "Attendance submitted", "Grade 7B · 28/30 present", "Completed", "1 hr"],
        ].map(([initialsText, title, detail, stat, time]) => (
          <div key={title} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <Avatar className="size-8">
              <AvatarFallback className="text-[10px] font-semibold">{initialsText}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">{title}</p>
              <p className="truncate text-[11px] text-muted-foreground">{detail}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold">{stat}</p>
              <p className="text-[10px] text-muted-foreground">{time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuickAction({ icon: Icon, label, onClick }: { icon: LucideIcon; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex min-h-[70px] flex-col items-center justify-center gap-1.5 rounded-md border border-border bg-background text-xs font-medium transition-colors hover:border-primary hover:bg-accent cursor-pointer"
    >
      <Icon className="size-5 text-primary" />
      {label}
    </button>
  );
}

function StudentsPage() {
  const [studentList, setStudentList] = useState(students);
  const [query, setQuery] = useState("");
  const [grade, setGrade] = useState("All grades");
  const [selected, setSelected] = useState<(typeof students)[number] | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newKhmer, setNewKhmer] = useState("");
  const [newGrade, setNewGrade] = useState("Grade 7A");
  const [newParent, setNewParent] = useState("");

  const filtered = useMemo(
    () =>
      studentList.filter(
        (s) =>
          `${s.name} ${s.khmer} ${s.id}`.toLowerCase().includes(query.toLowerCase()) &&
          (grade === "All grades" || s.grade.includes(grade))
      ),
    [studentList, query, grade]
  );

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const nextId = `STU-24${String(studentList.length + 1).padStart(2, "0")}`;
    setStudentList((prev) => [
      {
        id: nextId,
        name: newName.trim(),
        khmer: newKhmer.trim() || newName.trim(),
        grade: newGrade,
        parent: newParent.trim() || "Guardian",
        attendance: "100%",
        status: "Active",
      },
      ...prev,
    ]);
    setNewName("");
    setNewKhmer("");
    setNewParent("");
    setAddModalOpen(false);
  };

  return (
    <div className="mx-auto max-w-[1440px] p-5 lg:p-7">
      <PageHeader
        eyebrow="Student information system"
        title="Students & Parents"
        description="Manage enrollment, family contacts, and student records."
        action={
          <Button size="sm" className="h-9 gap-1 text-xs" onClick={() => setAddModalOpen(true)}>
            <Plus className="size-4" />
            <span>Add student</span>
          </Button>
        }
      />
      <div className="rounded-lg border border-border bg-card shadow-card">
        <div className="flex flex-wrap gap-3 border-b border-border p-3.5">
          <div className="relative min-w-[240px] flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 h-9 text-xs"
              placeholder="Search by student name or ID..."
            />
          </div>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 text-xs"
          >
            <option>All grades</option>
            <option>Grade 6</option>
            <option>Grade 7</option>
            <option>Grade 8</option>
            <option>Grade 9</option>
          </select>
          <Button variant="outline" size="sm" className="h-9 text-xs">
            <SlidersHorizontal className="size-3.5" />
            <span>More filters</span>
          </Button>
          <Button variant="outline" size="icon" className="size-9" aria-label="Download student list">
            <Download className="size-3.5" />
          </Button>
        </div>

        <DataTable headers={["Student", "Student ID", "Grade", "Parent / Guardian", "Attendance", "Status", ""]}>
          {filtered.map((student) => (
            <tr
              key={student.id}
              className="cursor-pointer border-b border-border last:border-0 hover:bg-muted/60"
              onClick={() => setSelected(student)}
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-accent text-[11px] font-semibold text-primary">
                      {initials(student.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-semibold">{student.name}</p>
                    <p className="text-[10px] text-muted-foreground">{student.khmer}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{student.id}</td>
              <td className="px-4 py-3 text-xs font-medium">{student.grade}</td>
              <td className="px-4 py-3 text-xs">{student.parent}</td>
              <td className="px-4 py-3 text-xs font-medium">{student.attendance}</td>
              <td className="px-4 py-3">
                <StatusChip status={student.status} />
              </td>
              <td className="px-4 py-3">
                <ChevronRight className="size-4 text-muted-foreground" />
              </td>
            </tr>
          ))}
        </DataTable>
        <TableFooter count={filtered.length} total={1248 + (studentList.length - students.length)} />
      </div>

      {/* Add Student Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-foreground">Add New Student</h3>
                <p className="text-xs text-muted-foreground">Enroll a student into the SIS</p>
              </div>
              <Button variant="ghost" size="icon" className="size-8" onClick={() => setAddModalOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>

            <form onSubmit={handleAddStudent} className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-semibold">Full Name (English) *</label>
                <Input
                  required
                  placeholder="e.g. Vicheka Seng"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="mt-1 h-9 text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-semibold">Name in Khmer</label>
                <Input
                  placeholder="e.g. សេង វិច្ឆិកា"
                  value={newKhmer}
                  onChange={(e) => setNewKhmer(e.target.value)}
                  className="mt-1 h-9 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold">Grade</label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-xs"
                  >
                    <option>Grade 6A</option>
                    <option>Grade 7A</option>
                    <option>Grade 7B</option>
                    <option>Grade 8A</option>
                    <option>Grade 8B</option>
                    <option>Grade 9A</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold">Parent / Guardian</label>
                  <Input
                    placeholder="e.g. Channa Seng"
                    value={newParent}
                    onChange={(e) => setNewParent(e.target.value)}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-2 border-t pt-3">
                <Button type="button" variant="outline" size="sm" onClick={() => setAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={!newName.trim()}>
                  Save Student
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selected && (
        <StudentPanel
          student={selected}
          onClose={() => setSelected(null)}
          onStatusToggle={() => {
            const nextStatus = selected.status === "Active" ? "Review" : "Active";
            setSelected({ ...selected, status: nextStatus });
            setStudentList((prev) =>
              prev.map((s) => (s.id === selected.id ? { ...s, status: nextStatus } : s))
            );
          }}
        />
      )}
    </div>
  );
}

function StudentPanel({
  student,
  onClose,
  onStatusToggle,
}: {
  student: (typeof students)[number];
  onClose: () => void;
  onStatusToggle?: () => void;
}) {
  const [profileViewOpen, setProfileViewOpen] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-overlay" onClick={onClose}>
      <aside
        className="h-full w-full max-w-[420px] overflow-y-auto bg-card shadow-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-[64px] items-center justify-between border-b border-border px-5">
          <div>
            <p className="text-xs font-bold">Student profile</p>
            <p className="text-[10px] text-muted-foreground">ព័ត៌មានសិស្ស</p>
          </div>
          <Button variant="ghost" size="icon" className="size-8" onClick={onClose} aria-label="Close profile">
            <X className="size-4" />
          </Button>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3.5">
            <Avatar className="size-14">
              <AvatarFallback className="bg-primary text-base font-bold text-primary-foreground">
                {initials(student.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-bold">{student.name}</h2>
              <p className="text-xs text-muted-foreground">{student.khmer}</p>
              <div className="mt-1.5 flex items-center gap-2">
                <StatusChip status={student.status} />
                <button
                  onClick={onStatusToggle}
                  className="text-[10px] text-primary hover:underline font-semibold cursor-pointer"
                >
                  (Toggle)
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2.5">
            <MiniStat value={student.attendance} label="Attendance" />
            <MiniStat value="B+" label="Average" />
            <MiniStat value="3" label="Activities" />
          </div>

          <ProfileSection
            title="School information"
            items={[
              ["Student ID", student.id],
              ["Class", student.grade],
              ["Academic year", "2026–2027"],
              ["Enrollment", "18 August 2022"],
            ]}
          />
          <ProfileSection
            title="Parent / Guardian"
            items={[
              ["Name", student.parent],
              ["Relationship", "Parent"],
              ["Phone", "+855 12 345 678"],
              ["Email", "parent@example.com"],
            ]}
          />

          <div className="mt-6 flex gap-2.5">
            <Button
              className="flex-1 h-9 text-xs"
              onClick={() => setProfileViewOpen(true)}
            >
              {profileViewOpen ? "✓ Details Verified" : "Verify full profile"}
            </Button>
            <Button
              variant="outline"
              className="h-9 text-xs"
              onClick={onStatusToggle}
            >
              Toggle Status: {student.status}
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function FinancePage() {
  const [invoiceList, setInvoiceList] = useState(invoices);
  const [tab, setTab] = useState("Invoices");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);
  const [invStudent, setInvStudent] = useState("");
  const [invItem, setInvItem] = useState("Term 1 Tuition");
  const [invAmount, setInvAmount] = useState("$420.00");
  const [invDue, setInvDue] = useState("30 Sep 2026");

  const filtered = invoiceList.filter(
    (i) =>
      `${i.id} ${i.student}`.toLowerCase().includes(query.toLowerCase()) &&
      (status === "All statuses" || i.status === status)
  );

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invStudent.trim()) return;
    const nextId = `INV-2026-08${String(invoiceList.length + 50).slice(0, 2)}`;
    setInvoiceList((prev) => [
      {
        id: nextId,
        student: invStudent.trim(),
        item: invItem,
        due: invDue,
        amount: invAmount.startsWith("$") ? invAmount : `$${invAmount}`,
        status: "Pending",
      },
      ...prev,
    ]);
    setInvStudent("");
    setCreateInvoiceOpen(false);
  };

  return (
    <div className="mx-auto max-w-[1440px] p-5 lg:p-7">
      <PageHeader
        eyebrow="Finance management"
        title="Fees & Finance"
        description="Track invoices, fee plans, payments, and outstanding balances."
        action={
          <Button size="sm" className="h-9 gap-1 text-xs" onClick={() => setCreateInvoiceOpen(true)}>
            <Plus className="size-4" />
            <span>Create invoice</span>
          </Button>
        }
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <Kpi icon={CircleDollarSign} label="Collected this month" value="$42,680" detail="84% of target" tone="green" />
        <Kpi icon={Clock3} label="Pending invoices" value="$12,240" detail="54 invoices" tone="amber" />
        <Kpi icon={FileText} label="Overdue balance" value="$6,180" detail="18 invoices" tone="red" />
      </div>

      <div className="rounded-lg border border-border bg-card shadow-card">
        <Tabs tabs={["Invoices", "Fee plans"]} value={tab} onChange={setTab} />
        {tab === "Invoices" ? (
          <>
            <div className="flex flex-wrap gap-3 border-b border-border p-3.5">
              <div className="relative min-w-[240px] flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9 h-9 text-xs"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search invoice or student..."
                />
              </div>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 text-xs"
              >
                <option>All statuses</option>
                <option>Paid</option>
                <option>Pending</option>
                <option>Overdue</option>
              </select>
              <Button variant="outline" size="sm" className="h-9 text-xs">
                <Download className="size-3.5" />
                <span>Export CSV</span>
              </Button>
            </div>
            <DataTable headers={["Invoice", "Student", "Fee item", "Due date", "Amount", "Status", ""]}>
              {filtered.map((i) => (
                <tr key={i.id} className="border-b border-border last:border-0 hover:bg-muted/60">
                  <td className="px-4 py-3 text-xs font-semibold font-mono text-primary">{i.id}</td>
                  <td className="px-4 py-3 text-xs font-medium">{i.student}</td>
                  <td className="px-4 py-3 text-xs">{i.item}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{i.due}</td>
                  <td className="px-4 py-3 text-xs font-bold">{i.amount}</td>
                  <td className="px-4 py-3">
                    <StatusChip status={i.status} />
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </DataTable>
            <TableFooter count={filtered.length} total={148 + (invoiceList.length - invoices.length)} />
          </>
        ) : (
          <FeePlans />
        )}
      </div>

      {/* Create Invoice Modal */}
      {createInvoiceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-foreground">Create New Invoice</h3>
                <p className="text-xs text-muted-foreground">Issue tuition or transport billing</p>
              </div>
              <Button variant="ghost" size="icon" className="size-8" onClick={() => setCreateInvoiceOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>

            <form onSubmit={handleCreateInvoice} className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-semibold">Student Name *</label>
                <Input
                  required
                  placeholder="e.g. Sokha Chan"
                  value={invStudent}
                  onChange={(e) => setInvStudent(e.target.value)}
                  className="mt-1 h-9 text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-semibold">Fee Item</label>
                <select
                  value={invItem}
                  onChange={(e) => setInvItem(e.target.value)}
                  className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-xs"
                >
                  <option>Term 1 Tuition</option>
                  <option>Bus Service · Q3</option>
                  <option>Learning Materials</option>
                  <option>Uniform & Sports Kit</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold">Amount ($ USD)</label>
                  <Input
                    placeholder="$420.00"
                    value={invAmount}
                    onChange={(e) => setInvAmount(e.target.value)}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold">Due Date</label>
                  <Input
                    placeholder="30 Sep 2026"
                    value={invDue}
                    onChange={(e) => setInvDue(e.target.value)}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-2 border-t pt-3">
                <Button type="button" variant="outline" size="sm" onClick={() => setCreateInvoiceOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={!invStudent.trim()}>
                  Issue Invoice
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function FeePlans() {
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    khmer: string;
    price: string;
    detail: string;
    studentsCount: number;
    breakdown: Array<{ item: string; amount: string; desc: string }>;
    schedule: Array<{ term: string; due: string; amount: string; status: string }>;
  } | null>(null);
  const [planToast, setPlanToast] = useState("");

  const plans = [
    {
      name: "Primary tuition",
      khmer: "ថ្លៃសិក្សាបឋមសិក្សា",
      price: "$320",
      detail: "Grades 1–6",
      studentsCount: 384,
      breakdown: [
        { item: "Base Tuition Fee", amount: "$260.00", desc: "Core MoEYS curriculum & language classes" },
        { item: "Learning Materials & Books", amount: "$35.00", desc: "Textbooks, workbooks, art supplies" },
        { item: "Digital IT Lab & Activities", amount: "$25.00", desc: "Computer lab and campus sports activities" },
      ],
      schedule: [
        { term: "Term 1 (Aug - Oct)", due: "30 Sep 2026", amount: "$320.00", status: "Active" },
        { term: "Term 2 (Nov - Jan)", due: "15 Jan 2027", amount: "$320.00", status: "Scheduled" },
        { term: "Term 3 (Feb - Apr)", due: "05 Apr 2027", amount: "$320.00", status: "Scheduled" },
        { term: "Term 4 (May - Jul)", due: "15 Jun 2027", amount: "$320.00", status: "Scheduled" },
      ],
    },
    {
      name: "Secondary tuition",
      khmer: "ថ្លៃសិក្សាអនុវិទ្យាល័យ",
      price: "$420",
      detail: "Grades 7–9",
      studentsCount: 296,
      breakdown: [
        { item: "Base Tuition Fee", amount: "$340.00", desc: "Secondary subjects & bilingual instruction" },
        { item: "Science & Computer Labs", amount: "$45.00", desc: "Physics, Chemistry, and ICT laboratory kits" },
        { item: "MoEYS Curriculum Books", amount: "$35.00", desc: "Prescribed national syllabus resources" },
      ],
      schedule: [
        { term: "Term 1 (Aug - Oct)", due: "30 Sep 2026", amount: "$420.00", status: "Active" },
        { term: "Term 2 (Nov - Jan)", due: "15 Jan 2027", amount: "$420.00", status: "Scheduled" },
        { term: "Term 3 (Feb - Apr)", due: "05 Apr 2027", amount: "$420.00", status: "Scheduled" },
        { term: "Term 4 (May - Jul)", due: "15 Jun 2027", amount: "$420.00", status: "Scheduled" },
      ],
    },
    {
      name: "Senior tuition",
      khmer: "ថ្លៃសិក្សាវិទ្យាល័យ",
      price: "$520",
      detail: "Grades 10–12",
      studentsCount: 242,
      breakdown: [
        { item: "Base Tuition Fee", amount: "$410.00", desc: "Advanced baccalaureate preparation curriculum" },
        { item: "Advanced STEM Lab & Experiments", amount: "$65.00", desc: "Full chemistry/robotics equipment" },
        { item: "National Exam Coaching Fee", amount: "$45.00", desc: "BacII MoEYS mock exams & tutoring" },
      ],
      schedule: [
        { term: "Term 1 (Aug - Oct)", due: "30 Sep 2026", amount: "$520.00", status: "Active" },
        { term: "Term 2 (Nov - Jan)", due: "15 Jan 2027", amount: "$520.00", status: "Scheduled" },
        { term: "Term 3 (Feb - Apr)", due: "05 Apr 2027", amount: "$520.00", status: "Scheduled" },
        { term: "Term 4 (May - Jul)", due: "15 Jun 2027", amount: "$520.00", status: "Scheduled" },
      ],
    },
  ];

  return (
    <div className="p-5">
      {planToast && (
        <div className="mb-4 flex items-center justify-between rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-800 dark:text-emerald-300">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="size-4" />
            <span>{planToast}</span>
          </div>
          <button onClick={() => setPlanToast("")} className="text-muted-foreground hover:text-foreground">
            <X className="size-3.5" />
          </button>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.name} className="rounded-lg border border-border p-4 bg-background shadow-xs hover:border-primary/60 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex size-8 items-center justify-center rounded-md bg-accent text-primary">
                <FileText className="size-4" />
              </div>
              <StatusChip status="Active" />
            </div>
            <h3 className="mt-3 font-semibold text-sm">{plan.name}</h3>
            <p className="text-[11px] text-muted-foreground">{plan.khmer} · {plan.detail}</p>
            <p className="mt-3 text-xl font-bold">
              {plan.price}
              <span className="text-xs font-normal text-muted-foreground"> / term</span>
            </p>
            <p className="mt-1 text-[10px] text-muted-foreground">{plan.studentsCount} enrolled students</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 w-full text-xs font-medium cursor-pointer"
              onClick={() => setSelectedPlan(plan)}
            >
              View plan details
            </Button>
          </div>
        ))}
      </div>

      {/* Plan Details Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-foreground">{selectedPlan.name}</h3>
                  <StatusChip status="Active" />
                </div>
                <p className="text-xs text-muted-foreground">{selectedPlan.khmer} · {selectedPlan.detail}</p>
              </div>
              <Button variant="ghost" size="icon" className="size-8" onClick={() => setSelectedPlan(null)}>
                <X className="size-4" />
              </Button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="flex items-center justify-between rounded-lg bg-muted/60 p-3.5">
                <div>
                  <span className="text-muted-foreground">Total term tuition rate:</span>
                  <p className="text-2xl font-black text-foreground">{selectedPlan.price} <span className="text-xs font-medium text-muted-foreground">/ term</span></p>
                </div>
                <div className="text-right">
                  <span className="rounded bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200 px-2 py-0.5 text-[10px] font-bold">
                    KHQR Bakong Enabled
                  </span>
                  <p className="mt-1 text-[10px] text-muted-foreground">Auto-reconciliation on scan</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Itemized Fee Breakdown</h4>
                <div className="rounded-lg border border-border divide-y divide-border overflow-hidden">
                  {selectedPlan.breakdown.map((item) => (
                    <div key={item.item} className="flex items-center justify-between p-2.5">
                      <div>
                        <p className="font-semibold">{item.item}</p>
                        <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                      </div>
                      <span className="font-bold text-foreground font-mono">{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Term Installment Schedule</h4>
                <div className="rounded-lg border border-border divide-y divide-border overflow-hidden">
                  {selectedPlan.schedule.map((sch) => (
                    <div key={sch.term} className="flex items-center justify-between p-2.5">
                      <div>
                        <p className="font-semibold">{sch.term}</p>
                        <p className="text-[10px] text-muted-foreground">Due: {sch.due}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold font-mono">{sch.amount}</span>
                        <StatusChip status={sch.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t pt-4">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setPlanToast(`Downloaded fee schedule PDF for ${selectedPlan.name}`);
                  setSelectedPlan(null);
                }}
              >
                <Download className="size-3.5 mr-1" />
                Download Schedule PDF
              </Button>
              <Button size="sm" className="text-xs" onClick={() => setSelectedPlan(null)}>
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TransportPage() {
  const [tab, setTab] = useState("Routes / Stops");
  const [addRouteOpen, setAddRouteOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [selectedRouteModal, setSelectedRouteModal] = useState<string | null>(null);
  const [newRouteName, setNewRouteName] = useState("");
  const [newStops, setNewStops] = useState("6 stops");
  const [newRiders, setNewRiders] = useState("24 riders");
  const [alertTargetRoute, setAlertTargetRoute] = useState("Route 03");
  const [alertMessage, setAlertMessage] = useState(
    "Russian Blvd municipal drainage roadwork delay (+12m). All students are safe and comfortable onboard.",
  );
  const [toastMsg, setToastMsg] = useState("");

  const [routes, setRoutes] = useState<Array<string[]>>([
    ["R03", "Route 03 · Toul Kork & Russian Blvd", "5 stops", "24 riders", "Delayed"],
    ["R07", "Route 07 · Chamkarmon & BKK1", "6 stops", "22 riders", "Active"],
    ["R01", "Route 01 · Sen Sok & Camko City", "8 stops", "29 riders", "Active"],
    ["L12", "Ligne 12 · Campus Paris 15e", "5 stops", "18 riders", "Active"],
  ]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  const handleAddRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRouteName.trim()) return;
    const nextCode = `R0${routes.length + 1}`;
    setRoutes((prev) => [
      ...prev,
      [nextCode, newRouteName.trim(), newStops, newRiders, "Active"],
    ]);
    setNewRouteName("");
    setAddRouteOpen(false);
    showToast(`New route ${newRouteName.trim()} registered.`);
  };

  const handleSendAlert = (e: React.FormEvent) => {
    e.preventDefault();
    setAlertModalOpen(false);
    showToast(`Broadcast sent: Route Alert dispatched to 18 parents on ${alertTargetRoute}!`);
  };

  return (
    <div className="mx-auto max-w-[1440px] p-5 lg:p-7">
      {toastMsg && (
        <div className="fixed top-18 right-8 z-50 rounded-xl bg-slate-900 text-white p-3 text-xs font-semibold shadow-2xl border border-white/20 animate-in fade-in flex items-center gap-2">
          <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      <PageHeader
        eyebrow="Transport operations"
        title="Transport"
        description="Manage routes, ordered stops, fleet tracking, safety incidents, and family delay alerts."
        action={
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-9 gap-1.5 text-xs font-semibold"
              onClick={() => setAlertModalOpen(true)}
            >
              <Bell className="size-3.5 text-amber-500" />
              <span>Broadcast Route Alert</span>
            </Button>
            <Button size="sm" className="h-9 gap-1 text-xs" onClick={() => setAddRouteOpen(true)}>
              <Plus className="size-4" />
              <span>Add route</span>
            </Button>
          </div>
        }
      />
      <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi icon={MapPin} label="Active routes" value={`${routes.length + 8}`} detail="54 stops total" tone="blue" />
        <Kpi icon={Bus} label="Buses in service" value="14 / 16" detail="2 in maintenance" tone="amber" />
        <Kpi icon={Users} label="Subscribed riders" value="386" detail="31% of student body" tone="green" />
        <Kpi icon={ShieldCheck} label="Open incidents" value="2" detail="1 roadwork in progress" tone="red" />
      </div>
      <div className="rounded-lg border border-border bg-card shadow-card">
        <Tabs
          tabs={["Routes / Stops", "Buses / Drivers", "Trips", "Incidents & No-Shows"]}
          value={tab}
          onChange={setTab}
        />
        <TransportContent
          tab={tab}
          dynamicRoutes={routes}
          onSelectRoute={(code) => setSelectedRouteModal(code)}
        />
      </div>

      {/* Add Route Modal */}
      {addRouteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-foreground">Add New Bus Route</h3>
                <p className="text-xs text-muted-foreground">Register route and stop sequence</p>
              </div>
              <Button variant="ghost" size="icon" className="size-8" onClick={() => setAddRouteOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>

            <form onSubmit={handleAddRoute} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="font-semibold">Route Path *</label>
                <Input
                  required
                  placeholder="e.g. Boeng Keng Kang → School"
                  value={newRouteName}
                  onChange={(e) => setNewRouteName(e.target.value)}
                  className="mt-1 h-9 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold">Estimated Stops</label>
                  <Input
                    placeholder="8 stops"
                    value={newStops}
                    onChange={(e) => setNewStops(e.target.value)}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold">Expected Riders</label>
                  <Input
                    placeholder="30 riders"
                    value={newRiders}
                    onChange={(e) => setNewRiders(e.target.value)}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-2 border-t pt-3">
                <Button type="button" variant="outline" size="sm" onClick={() => setAddRouteOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={!newRouteName.trim()}>
                  Save Route
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Broadcast Route Alert Modal (Prompt 9) */}
      {alertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-5 shadow-2xl text-left text-xs space-y-3">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-sm font-bold text-foreground">Broadcast Route-Specific Parent Alert</h3>
                <p className="text-[11px] text-muted-foreground">Direct SMS & In-App push to affected families</p>
              </div>
              <Button variant="ghost" size="icon" className="size-8" onClick={() => setAlertModalOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>

            <form onSubmit={handleSendAlert} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-foreground">Target Route *</label>
                <select
                  value={alertTargetRoute}
                  onChange={(e) => setAlertTargetRoute(e.target.value)}
                  className="mt-1 w-full h-9 rounded-lg border border-input bg-background px-3 font-semibold text-xs"
                >
                  <option>Route 03 · Toul Kork & Russian Blvd (18 Families)</option>
                  <option>Route 07 · Chamkarmon & BKK1 (22 Families)</option>
                  <option>Route 01 · Sen Sok & Camko City (29 Families)</option>
                  <option>Ligne 12 · Campus Paris 15e (18 Families)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Urgency / Category</label>
                <div className="grid grid-cols-3 gap-1.5 mt-1">
                  <span className="rounded-md border border-amber-500/40 bg-amber-500/10 p-1.5 text-center font-bold text-amber-700 dark:text-amber-400">
                    Delay Warning
                  </span>
                  <span className="rounded-md border border-border bg-muted/40 p-1.5 text-center font-medium text-muted-foreground">
                    Substitute Bus
                  </span>
                  <span className="rounded-md border border-border bg-muted/40 p-1.5 text-center font-medium text-muted-foreground">
                    Route Change
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Message Copy *</label>
                <textarea
                  value={alertMessage}
                  onChange={(e) => setAlertMessage(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-input bg-background p-2.5 text-xs min-h-20"
                />
              </div>

              <div className="rounded-lg bg-amber-500/10 p-2 text-[11px] text-amber-800 dark:text-amber-300 border border-amber-500/20">
                Notice will be pushed to 18 active parent devices and synced to the Parent App Bus tab.
              </div>

              <div className="flex justify-end gap-2 border-t pt-3">
                <Button type="button" variant="outline" size="sm" onClick={() => setAlertModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-extrabold">
                  Send Broadcast
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Route Detail Inspector Modal */}
      {selectedRouteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-2xl text-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-sm font-bold text-foreground">Route Details: {selectedRouteModal}</h3>
                <p className="text-[11px] text-muted-foreground">Ordered stop sequence and rider manifests</p>
              </div>
              <Button variant="ghost" size="icon" className="size-8" onClick={() => setSelectedRouteModal(null)}>
                <X className="size-4" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2 rounded-xl bg-muted/50 p-3 text-center">
              <div>
                <p className="text-muted-foreground text-[10px]">Vehicle</p>
                <p className="font-bold text-foreground">KH 2A-9412 (28 Seats)</p>
              </div>
              <div>
                <p className="text-muted-foreground text-[10px]">Driver</p>
                <p className="font-bold text-foreground">Seng Vibol (+855 12 998 123)</p>
              </div>
              <div>
                <p className="text-muted-foreground text-[10px]">Current Status</p>
                <p className="font-bold text-amber-600 dark:text-amber-400">+12m Traffic Delay</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-foreground">
                Ordered Stops & Times
              </h4>
              <div className="divide-y divide-border rounded-lg border">
                {[
                  { stop: "Stop 1: Toul Kork Circle (TK Avenue)", pickup: "06:40 AM", riders: "4 riders", status: "Arrived" },
                  { stop: "Stop 2: St. 315 & St. 592 Intersection", pickup: "06:52 AM", riders: "5 riders", status: "Arrived" },
                  { stop: "Stop 3: Russian Blvd / 7 Makara Flyover", pickup: "07:08 AM", riders: "6 riders", status: "Delayed (+12m)" },
                  { stop: "Stop 4: Santhormok Junction", pickup: "07:22 AM", riders: "5 riders", status: "Pending" },
                  { stop: "Stop 5: Phnom Penh Main Campus Gate 2", pickup: "07:35 AM", riders: "Campus Arrival", status: "Pending" },
                ].map((st, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5">
                    <div>
                      <p className="font-semibold text-foreground">{st.stop}</p>
                      <p className="text-[10px] text-muted-foreground">{st.riders}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-foreground">{st.pickup}</span>
                      <span className="block text-[10px] text-muted-foreground">{st.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button size="sm" onClick={() => setSelectedRouteModal(null)}>
                Close Inspector
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TransportContent({
  tab,
  dynamicRoutes,
  onSelectRoute,
}: {
  tab: string;
  dynamicRoutes?: Array<string[]>;
  onSelectRoute?: (code: string) => void;
}) {
  const content: Record<string, Array<string[]>> = {
    "Routes / Stops": dynamicRoutes ?? [
      ["R03", "Route 03 · Toul Kork & Russian Blvd", "5 stops", "24 riders", "Delayed"],
      ["R07", "Route 07 · Chamkarmon & BKK1", "6 stops", "22 riders", "Active"],
      ["R01", "Route 01 · Sen Sok & Camko City", "8 stops", "29 riders", "Active"],
      ["L12", "Ligne 12 · Campus Paris 15e", "5 stops", "18 riders", "Active"],
    ],
    "Buses / Drivers": [
      ["BUS-01", "Toyota Coaster · 2AB-3842", "Sok Vuthy", "42 seats", "In service"],
      ["BUS-02", "Hyundai County · 2AC-1087", "Phan Dara", "38 seats", "In service"],
      ["BUS-03", "Toyota Coaster · 2BD-5571", "Kim Veasna", "42 seats", "Maintenance"],
    ],
    Trips: [
      ["TRP-0920-01", "R03 · Morning pickup", "06:35", "24 riders", "Delayed (+12m)"],
      ["TRP-0920-02", "R07 · Morning pickup", "06:40", "22 riders", "Completed"],
      ["TRP-0920-03", "R03 · Afternoon drop-off", "15:45", "24 riders", "Scheduled"],
    ],
    "Incidents & No-Shows": [
      ["INC-118", "Road drainage delay", "Russian Blvd Flyover", "21 Sep, 07:15", "Investigating"],
      ["INC-117", "Student no-show", "R03 Stop 2 (St. 315)", "21 Sep, 06:56", "Resolved"],
      ["INC-116", "Traffic congestion", "Monivong Blvd", "18 Sep, 16:02", "Resolved"],
    ],
  };

  const headers: Record<string, string[]> = {
    "Routes / Stops": ["Route", "Name", "Stops", "Riders", "Status"],
    "Buses / Drivers": ["Bus", "Vehicle", "Driver", "Capacity", "Status"],
    Trips: ["Trip", "Route / Session", "Start", "Riders", "Status"],
    "Incidents & No-Shows": ["Incident", "Type", "Location", "Reported", "Status"],
  };

  const rows = content[tab] ?? [];
  const tableHeaders = headers[tab] ?? [];

  return (
    <>
      <div className="flex gap-3 border-b border-border p-3.5">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9 h-9 text-xs" placeholder={`Search ${tab.toLowerCase()}...`} />
        </div>
        <Button variant="outline" size="sm" className="h-9 text-xs">
          <SlidersHorizontal className="size-3.5" />
          <span>Filter</span>
        </Button>
      </div>
      <DataTable headers={tableHeaders}>
        {rows.map((row) => (
          <tr
            key={row[0]}
            onClick={() => tab === "Routes / Stops" && onSelectRoute?.(row[1] ?? row[0] ?? "")}
            className={cn(
              "border-b border-border last:border-0 hover:bg-muted/60 transition",
              tab === "Routes / Stops" && "cursor-pointer",
            )}
          >
            {row.map((cell, index) => (
              <td
                key={cell}
                className={cn(
                  "px-4 py-3 text-xs",
                  index === 0 && "font-semibold text-primary font-mono",
                  index === 1 && "text-xs font-medium",
                )}
              >
                {index === row.length - 1 ? <StatusChip status={cell} /> : cell}
              </td>
            ))}
          </tr>
        ))}
      </DataTable>
      <TableFooter count={rows.length} total={rows.length} />
    </>
  );
}

function RolesPage() {
  const [accountsList, setAccountsList] = useState(accounts);
  const [tab, setTab] = useState("User accounts");
  const [query, setQuery] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [selectedRolePerms, setSelectedRolePerms] = useState<string | null>(null);

  // Invite user form state
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Registrar");

  // School profile form state
  const [schoolProfile, setSchoolProfile] = useState({
    nameEn: "New Sunrise School",
    nameKh: "សាលា អរុណរះថ្មី",
    moeysLicense: "MoEYS-PP-2024-892",
    phone: "+855 23 888 777",
    email: "info@school.edu.kh",
    address: "No. 45, Street 271, Toul Kork, Phnom Penh, Cambodia",
    principal: "Dr. Chan Vichea",
  });

  // Academic year state
  const [academicYear, setAcademicYear] = useState({
    year: "2026–2027",
    activeTerm: "Term 1",
    term1Start: "2026-08-18",
    term1End: "2026-12-18",
    midtermStart: "2026-10-12",
    midtermEnd: "2026-10-16",
    examStart: "2026-12-08",
    examEnd: "2026-12-15",
  });

  // Notifications settings state
  const [notifSettings, setNotifSettings] = useState({
    telegram: true,
    sms: true,
    push: true,
    emergency: true,
  });

  const filtered = accountsList.filter((a) =>
    `${a.name} ${a.email} ${a.role}`.toLowerCase().includes(query.toLowerCase())
  );

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) return;
    setAccountsList((prev) => [
      ...prev,
      {
        name: inviteName.trim(),
        email: inviteEmail.trim(),
        role: inviteRole,
        last: "Invited just now",
        status: "Invited",
      },
    ]);
    setToastMsg(`Invitation sent to ${inviteEmail.trim()} as ${inviteRole}!`);
    setInviteName("");
    setInviteEmail("");
    setInviteModalOpen(false);
  };

  const toggleUserStatus = (email: string) => {
    setAccountsList((prev) =>
      prev.map((acc) => {
        if (acc.email === email) {
          const nextStatus = acc.status === "Active" ? "Suspended" : "Active";
          setToastMsg(`Account ${acc.name} marked as ${nextStatus}`);
          return { ...acc, status: nextStatus };
        }
        return acc;
      })
    );
  };

  return (
    <div className="mx-auto max-w-[1440px] p-5 lg:p-7">
      {toastMsg && (
        <div className="mb-4 flex items-center justify-between rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-800 dark:text-emerald-300 animate-in fade-in">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="size-4" />
            <span>{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg("")} className="text-muted-foreground hover:text-foreground">
            <X className="size-3.5" />
          </button>
        </div>
      )}

      <PageHeader
        eyebrow="Access control"
        title="Settings & Roles"
        description="Manage staff accounts, permissions, and school configuration."
        action={
          <Button size="sm" className="h-9 gap-1 text-xs cursor-pointer" onClick={() => setInviteModalOpen(true)}>
            <Plus className="size-4" />
            <span>Invite user</span>
          </Button>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-lg border border-border bg-card p-2 shadow-card">
          {["User accounts", "Roles & permissions", "School profile", "Academic year", "Notifications"].map(
            (item) => (
              <button
                key={item}
                onClick={() => setTab(item)}
                className={cn(
                  "flex min-h-9 w-full items-center gap-2.5 rounded-md px-3 text-left text-xs cursor-pointer transition-colors",
                  tab === item
                    ? "bg-accent font-semibold text-primary"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <Settings className="size-3.5" />
                <span>{item}</span>
              </button>
            )
          )}
        </aside>

        <div className="rounded-lg border border-border bg-card shadow-card">
          {tab === "User accounts" && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-3.5">
                <div>
                  <h2 className="font-semibold text-sm">User accounts</h2>
                  <p className="text-xs text-muted-foreground">Staff accounts with access to the admin portal</p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="pl-9 h-9 text-xs"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search accounts..."
                  />
                </div>
              </div>
              <DataTable headers={["User", "Role", "Last active", "Status", "Actions"]}>
                {filtered.map((a) => (
                  <tr key={a.email} className="border-b border-border last:border-0 hover:bg-muted/60">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="size-8">
                          <AvatarFallback className="text-[10px] font-semibold">
                            {initials(a.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs font-semibold">{a.name}</p>
                          <p className="text-[10px] text-muted-foreground">{a.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs font-medium">{a.role}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{a.last}</td>
                    <td className="px-4 py-3">
                      <StatusChip status={a.status} />
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-[11px] font-medium text-primary hover:text-primary cursor-pointer"
                        onClick={() => toggleUserStatus(a.email)}
                      >
                        {a.status === "Active" ? "Suspend" : "Activate"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </DataTable>
            </>
          )}

          {tab === "Roles & permissions" && (
            <div className="p-5">
              <h2 className="text-base font-semibold">Roles & Permissions</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">Define role scopes and functional authorization for campus staff.</p>
              <div className="mt-4 space-y-2.5">
                {[
                  { role: "Super Admin", count: 2, desc: "Full root access to all modules, financial audits, and security" },
                  { role: "Registrar", count: 3, desc: "Admissions enrollment, student records, and class rosters" },
                  { role: "Accountant", count: 2, desc: "Fee invoices, Bakong payments reconciliation, and billing reports" },
                  { role: "Transport Manager", count: 2, desc: "Bus route dispatch, driver roster, and safety logs" },
                  { role: "Teacher", count: 18, desc: "Attendance check-in, grades entry, and homework publishing" },
                ].map(({ role, count, desc }) => (
                  <div key={role} className="flex items-center gap-3.5 rounded-lg border border-border p-3.5 bg-background">
                    <div className="flex size-9 items-center justify-center rounded-md bg-accent text-primary">
                      <ShieldCheck className="size-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold">{role}</p>
                      <p className="text-[11px] text-muted-foreground">{count} users · {desc}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs cursor-pointer"
                      onClick={() => setSelectedRolePerms(role)}
                    >
                      Manage
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "School profile" && (
            <div className="p-5">
              <h2 className="text-base font-semibold">School Profile</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">General campus information and official Ministry of Education credentials.</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setToastMsg("School profile changes saved successfully!");
                }}
                className="mt-5 space-y-4 max-w-2xl text-xs"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="font-semibold text-foreground">School Name (English)</label>
                    <Input
                      className="mt-1 h-9 text-xs"
                      value={schoolProfile.nameEn}
                      onChange={(e) => setSchoolProfile({ ...schoolProfile, nameEn: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-foreground">School Name (Khmer)</label>
                    <Input
                      className="mt-1 h-9 text-xs"
                      value={schoolProfile.nameKh}
                      onChange={(e) => setSchoolProfile({ ...schoolProfile, nameKh: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="font-semibold text-foreground">MoEYS Registration No.</label>
                    <Input
                      className="mt-1 h-9 text-xs"
                      value={schoolProfile.moeysLicense}
                      onChange={(e) => setSchoolProfile({ ...schoolProfile, moeysLicense: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-foreground">Principal / Director</label>
                    <Input
                      className="mt-1 h-9 text-xs"
                      value={schoolProfile.principal}
                      onChange={(e) => setSchoolProfile({ ...schoolProfile, principal: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-foreground">Campus Address</label>
                  <Input
                    className="mt-1 h-9 text-xs"
                    value={schoolProfile.address}
                    onChange={(e) => setSchoolProfile({ ...schoolProfile, address: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="font-semibold text-foreground">Official Phone</label>
                    <Input
                      className="mt-1 h-9 text-xs"
                      value={schoolProfile.phone}
                      onChange={(e) => setSchoolProfile({ ...schoolProfile, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-foreground">Official Email</label>
                    <Input
                      className="mt-1 h-9 text-xs"
                      value={schoolProfile.email}
                      onChange={(e) => setSchoolProfile({ ...schoolProfile, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button type="submit" size="sm" className="cursor-pointer">
                    Save Profile Changes
                  </Button>
                </div>
              </form>
            </div>
          )}

          {tab === "Academic year" && (
            <div className="p-5">
              <h2 className="text-base font-semibold">Academic Year & Calendar</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">Manage active academic sessions, term start/end dates, and examination periods.</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setToastMsg("Academic year schedule updated successfully!");
                }}
                className="mt-5 space-y-4 max-w-2xl text-xs"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="font-semibold text-foreground">Academic Year</label>
                    <Input
                      className="mt-1 h-9 text-xs"
                      value={academicYear.year}
                      onChange={(e) => setAcademicYear({ ...academicYear, year: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-foreground">Active Term</label>
                    <select
                      className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-xs"
                      value={academicYear.activeTerm}
                      onChange={(e) => setAcademicYear({ ...academicYear, activeTerm: e.target.value })}
                    >
                      <option>Term 1 (Aug – Dec)</option>
                      <option>Term 2 (Jan – Mar)</option>
                      <option>Term 3 (Apr – Jun)</option>
                      <option>Term 4 (Summer Session)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="font-semibold text-foreground">Term 1 Start Date</label>
                    <Input
                      className="mt-1 h-9 text-xs"
                      value={academicYear.term1Start}
                      onChange={(e) => setAcademicYear({ ...academicYear, term1Start: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-foreground">Term 1 End Date</label>
                    <Input
                      className="mt-1 h-9 text-xs"
                      value={academicYear.term1End}
                      onChange={(e) => setAcademicYear({ ...academicYear, term1End: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="font-semibold text-foreground">Mid-Term Assessment Week</label>
                    <Input
                      className="mt-1 h-9 text-xs"
                      value="12 Oct 2026 – 16 Oct 2026"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-foreground">Semester Final Exams</label>
                    <Input
                      className="mt-1 h-9 text-xs"
                      value="08 Dec 2026 – 15 Dec 2026"
                      readOnly
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button type="submit" size="sm" className="cursor-pointer">
                    Save Academic Calendar
                  </Button>
                </div>
              </form>
            </div>
          )}

          {tab === "Notifications" && (
            <div className="p-5">
              <h2 className="text-base font-semibold">Notification & Dispatch Channels</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">Configure delivery channels for parent alerts, attendance updates, and emergency broadcasts.</p>
              <div className="mt-5 space-y-4 max-w-2xl">
                {[
                  {
                    key: "telegram" as const,
                    title: "Telegram Bot Integration",
                    desc: "Real-time automated alerts forwarded to the official school staff channel",
                  },
                  {
                    key: "sms" as const,
                    title: "Parent SMS Gateway (Cellcard / Smart)",
                    desc: "Fallback SMS for parents with low mobile data or feature phones",
                  },
                  {
                    key: "push" as const,
                    title: "Mobile App Push Notifications",
                    desc: "Instant push alerts for RFID gate check-ins, bus arrivals, and homework",
                  },
                  {
                    key: "emergency" as const,
                    title: "MoEYS Emergency Broadcast Priority",
                    desc: "Override silent profile on authorized school devices during severe weather or alerts",
                  },
                ].map(({ key, title, desc }) => (
                  <div key={key} className="flex items-center justify-between rounded-lg border border-border p-3.5 bg-background">
                    <div>
                      <p className="text-xs font-semibold text-foreground">{title}</p>
                      <p className="text-[11px] text-muted-foreground">{desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setNotifSettings((prev) => ({ ...prev, [key]: !prev[key] }));
                        setToastMsg(`Toggled ${title} to ${!notifSettings[key] ? "Enabled" : "Disabled"}`);
                      }}
                      className={cn(
                        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden",
                        notifSettings[key] ? "bg-primary" : "bg-muted"
                      )}
                    >
                      <span
                        className={cn(
                          "pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
                          notifSettings[key] ? "translate-x-5" : "translate-x-0"
                        )}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Invite User Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-foreground">Invite New Staff Member</h3>
                <p className="text-xs text-muted-foreground">Send login credentials and assign role</p>
              </div>
              <Button variant="ghost" size="icon" className="size-8" onClick={() => setInviteModalOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>

            <form onSubmit={handleInviteSubmit} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-foreground">Full Name *</label>
                <Input
                  required
                  placeholder="e.g. Sokha Ouk"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="mt-1 h-9 text-xs"
                />
              </div>
              <div>
                <label className="font-semibold text-foreground">Work Email *</label>
                <Input
                  required
                  type="email"
                  placeholder="e.g. sokha.ouk@school.edu.kh"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="mt-1 h-9 text-xs"
                />
              </div>
              <div>
                <label className="font-semibold text-foreground">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-xs"
                >
                  <option>Registrar</option>
                  <option>Accountant</option>
                  <option>Transport Manager</option>
                  <option>Teacher</option>
                  <option>Super Admin</option>
                </select>
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t pt-3">
                <Button type="button" variant="outline" size="sm" onClick={() => setInviteModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={!inviteName.trim() || !inviteEmail.trim()}>
                  Send Invitation
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manage Permissions Modal */}
      {selectedRolePerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-foreground">Manage Permissions: {selectedRolePerms}</h3>
                <p className="text-xs text-muted-foreground">Adjust functional authorization scopes</p>
              </div>
              <Button variant="ghost" size="icon" className="size-8" onClick={() => setSelectedRolePerms(null)}>
                <X className="size-4" />
              </Button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              {[
                "View student records & personal data",
                "Authorize attendance registers & enter grades",
                "Create tuition invoices & reconcile Bakong payments",
                "Manage bus fleet routes, drivers & trip logs",
                "Publish school announcements & emergency alerts",
                "Access administrative settings & audit trail",
              ].map((perm, idx) => (
                <div key={perm} className="flex items-center justify-between rounded-md border border-border p-2.5">
                  <span className="font-medium text-foreground">{perm}</span>
                  <input
                    type="checkbox"
                    defaultChecked={selectedRolePerms === "Super Admin" || idx < 3}
                    className="size-4 rounded text-primary focus:ring-primary"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t pt-3">
              <Button variant="outline" size="sm" onClick={() => setSelectedRolePerms(null)}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setToastMsg(`Permissions saved for ${selectedRolePerms}!`);
                  setSelectedRolePerms(null);
                }}
              >
                Save Permissions
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ClassesPage() {
  const [classesList, setClassesList] = useState([
    {
      id: "CLS-6A",
      name: "Grade 6A",
      level: "Primary",
      teacher: "Mrs. Chan Sophorn",
      room: "Room A-101",
      activeRecords: 28,
      capacity: 30,
      roster: [
        { id: "STU-2401", name: "Sokha Chan", attendance: "96%", status: "Active" },
        { id: "STU-2404", name: "Bopha Heng", attendance: "98%", status: "Active" },
        { id: "STU-2412", name: "Kiri Vann", attendance: "92%", status: "Active" },
        { id: "STU-2415", name: "Dara Som", attendance: "94%", status: "Active" },
      ],
    },
    {
      id: "CLS-7B",
      name: "Grade 7B",
      level: "Lower Secondary",
      teacher: "Mr. Kem Vuthy",
      room: "Room B-203",
      activeRecords: 32,
      capacity: 32,
      roster: [
        { id: "STU-2402", name: "Sreyneang Lim", attendance: "92%", status: "Active" },
        { id: "STU-2408", name: "Rithy Chem", attendance: "95%", status: "Active" },
        { id: "STU-2410", name: "Phalla Seng", attendance: "90%", status: "Active" },
      ],
    },
    {
      id: "CLS-8A",
      name: "Grade 8A",
      level: "Lower Secondary",
      teacher: "Ms. Keo Linda",
      room: "Room B-204",
      activeRecords: 30,
      capacity: 32,
      roster: [
        { id: "STU-2405", name: "Makara Pen", attendance: "89%", status: "Active" },
        { id: "STU-2418", name: "Vanna Long", attendance: "97%", status: "Active" },
      ],
    },
    {
      id: "CLS-9A",
      name: "Grade 9A",
      level: "Lower Secondary (MoEYS Bac)",
      teacher: "Mr. Heng Sengly",
      room: "Room C-301",
      activeRecords: 26,
      capacity: 30,
      roster: [
        { id: "STU-2403", name: "Vannak Chea", attendance: "84%", status: "Review" },
        { id: "STU-2420", name: "Sokunthea Pich", attendance: "96%", status: "Active" },
      ],
    },
  ]);

  const [createClassOpen, setCreateClassOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<typeof classesList[0] | null>(null);
  const [toastMsg, setToastMsg] = useState("");

  // Create form state
  const [newClassName, setNewClassName] = useState("");
  const [newTeacher, setNewTeacher] = useState("");
  const [newRoom, setNewRoom] = useState("Room C-305");
  const [newCapacity, setNewCapacity] = useState("30");

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;
    const newClass = {
      id: `CLS-${newClassName.trim().replace(/\s+/g, "")}`,
      name: newClassName.trim(),
      level: "Secondary",
      teacher: newTeacher.trim() || "Unassigned",
      room: newRoom.trim(),
      activeRecords: 0,
      capacity: parseInt(newCapacity, 10) || 30,
      roster: [],
    };
    setClassesList((prev) => [newClass, ...prev]);
    setToastMsg(`Class ${newClassName.trim()} created successfully!`);
    setNewClassName("");
    setNewTeacher("");
    setCreateClassOpen(false);
  };

  return (
    <div className="mx-auto max-w-[1440px] p-5 lg:p-7">
      {toastMsg && (
        <div className="mb-4 flex items-center justify-between rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-800 dark:text-emerald-300 animate-in fade-in">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="size-4" />
            <span>{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg("")} className="text-muted-foreground hover:text-foreground">
            <X className="size-3.5" />
          </button>
        </div>
      )}

      <PageHeader
        eyebrow="School operations"
        title="Classes & Programs"
        description="Manage academic programs, subjects, schedules, and class assignments."
        action={
          <Button size="sm" className="h-9 gap-1 text-xs cursor-pointer" onClick={() => setCreateClassOpen(true)}>
            <Plus className="size-4" />
            <span>Create new</span>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {classesList.map((cls) => (
          <button
            key={cls.id}
            onClick={() => setSelectedClass(cls)}
            className="rounded-lg border border-border bg-card p-4 text-left shadow-card transition-colors hover:border-primary cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex size-9 items-center justify-center rounded-md bg-accent text-primary">
                <BookOpen className="size-4" />
              </div>
              <span className="text-[11px] font-semibold text-muted-foreground">{cls.room}</span>
            </div>
            <h2 className="mt-3 font-bold text-sm text-foreground">{cls.name}</h2>
            <p className="text-[11px] text-muted-foreground">Homeroom: {cls.teacher}</p>
            <p className="mt-1 text-[10px] text-muted-foreground">{cls.activeRecords} active records · {cls.capacity} seats</p>

            <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${Math.min(100, Math.round((cls.activeRecords / cls.capacity) * 100))}%` }}
              />
            </div>

            <div className="mt-4 flex items-center text-[11px] font-semibold text-primary">
              Open details <ChevronRight className="ml-1 size-3.5" />
            </div>
          </button>
        ))}
      </div>

      {/* Class Detail Modal */}
      {selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-foreground">{selectedClass.name}</h3>
                  <span className="rounded bg-accent px-2 py-0.5 text-[10px] font-semibold text-primary">
                    {selectedClass.level}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Homeroom Teacher: {selectedClass.teacher} · {selectedClass.room}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="size-8" onClick={() => setSelectedClass(null)}>
                <X className="size-4" />
              </Button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Weekly Schedule Highlights</h4>
                <div className="rounded-lg border border-border divide-y divide-border overflow-hidden">
                  {[
                    { time: "07:30 – 08:30", subject: "Khmer Literature", room: selectedClass.room },
                    { time: "08:30 – 09:30", subject: "Mathematics & Algebra", room: selectedClass.room },
                    { time: "09:45 – 10:45", subject: "General Science & Labs", room: "Lab B-02" },
                    { time: "10:45 – 11:30", subject: "English Language (ESL)", room: selectedClass.room },
                  ].map((p) => (
                    <div key={p.time} className="flex items-center justify-between p-2.5">
                      <div>
                        <p className="font-semibold">{p.subject}</p>
                        <p className="text-[10px] text-muted-foreground">{p.room}</p>
                      </div>
                      <span className="font-mono text-muted-foreground">{p.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">Enrolled Students ({selectedClass.activeRecords})</h4>
                  <span className="text-[10px] text-muted-foreground">Capacity: {selectedClass.capacity} max</span>
                </div>
                <div className="rounded-lg border border-border divide-y divide-border max-h-40 overflow-y-auto">
                  {selectedClass.roster.length > 0 ? (
                    selectedClass.roster.map((s) => (
                      <div key={s.id} className="flex items-center justify-between p-2.5">
                        <div className="flex items-center gap-2">
                          <Avatar className="size-6">
                            <AvatarFallback className="text-[9px] font-semibold">{initials(s.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{s.name}</p>
                            <p className="text-[10px] text-muted-foreground font-mono">{s.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-medium text-muted-foreground">{s.attendance}</span>
                          <StatusChip status={s.status} />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="p-3 text-center text-muted-foreground">No students assigned yet</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t pt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setToastMsg(`Downloaded roster PDF for ${selectedClass.name}`);
                  setSelectedClass(null);
                }}
              >
                <Download className="size-3.5 mr-1" />
                Download Roster
              </Button>
              <Button size="sm" onClick={() => setSelectedClass(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Class Modal */}
      {createClassOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-foreground">Create New Class</h3>
                <p className="text-xs text-muted-foreground">Register new homeroom or program</p>
              </div>
              <Button variant="ghost" size="icon" className="size-8" onClick={() => setCreateClassOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>

            <form onSubmit={handleCreateClass} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-foreground">Class Name *</label>
                <Input
                  required
                  placeholder="e.g. Grade 10A"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="mt-1 h-9 text-xs"
                />
              </div>
              <div>
                <label className="font-semibold text-foreground">Homeroom Teacher</label>
                <Input
                  placeholder="e.g. Mr. Vichea Seng"
                  value={newTeacher}
                  onChange={(e) => setNewTeacher(e.target.value)}
                  className="mt-1 h-9 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-foreground">Assigned Room</label>
                  <Input
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-foreground">Max Capacity</label>
                  <Input
                    type="number"
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(e.target.value)}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t pt-3">
                <Button type="button" variant="outline" size="sm" onClick={() => setCreateClassOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={!newClassName.trim()}>
                  Create Class
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function AdmissionsPage() {
  const [categories, setCategories] = useState([
    { key: "New applications", title: "New applications · 12", count: 12, records: 28, desc: "Pending initial document verification" },
    { key: "Under review", title: "Under review · 8", count: 8, records: 32, desc: "Placement assessment & family interview" },
    { key: "Accepted", title: "Accepted · 24", count: 24, records: 30, desc: "Enrollment offer issued" },
    { key: "Waitlisted", title: "Waitlisted · 3", count: 3, records: 26, desc: "Awaiting campus seat availability" },
  ]);

  const [applicants, setApplicants] = useState([
    { id: "APP-091", name: "Sokunthea Pich", khmer: "ពេជ្រ សុគន្ធា", grade: "Grade 7", parent: "Pich Sovan", phone: "+855 12 345 991", date: "19 Sep 2026", stage: "New applications", docs: "Birth cert, MoEYS book" },
    { id: "APP-088", name: "Rithy Kem", khmer: "ខែម រិទ្ធី", grade: "Grade 6", parent: "Kem Sreynich", phone: "+855 17 889 002", date: "18 Sep 2026", stage: "New applications", docs: "Transcripts verified" },
    { id: "APP-082", name: "Channary Mom", khmer: "ម៉ុម ចាន់ណារី", grade: "Grade 8", parent: "Mom Sovann", phone: "+855 89 223 344", date: "15 Sep 2026", stage: "Under review", docs: "Entrance exam: 86%" },
    { id: "APP-079", name: "Vireak Chea", khmer: "ជា វិរៈ", grade: "Grade 9", parent: "Chea Dara", phone: "+855 92 112 233", date: "12 Sep 2026", stage: "Under review", docs: "Interview scheduled" },
    { id: "APP-065", name: "Mony Oung", khmer: "អ៊ុង មុនី", grade: "Grade 7", parent: "Oung Piseth", phone: "+855 12 776 655", date: "10 Sep 2026", stage: "Accepted", docs: "Deposit invoice issued" },
    { id: "APP-054", name: "Nita Seng", khmer: "សេង នីតា", grade: "Grade 6", parent: "Seng Borey", phone: "+855 16 998 877", date: "08 Sep 2026", stage: "Waitlisted", docs: "Awaiting vacancy" },
  ]);

  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [createApplicantOpen, setCreateApplicantOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Create form state
  const [applicantName, setApplicantName] = useState("");
  const [applicantGrade, setApplicantGrade] = useState("Grade 7");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");

  const handleCreateApplicant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !parentName.trim()) return;
    const nextId = `APP-0${String(applicants.length + 95).padStart(2, "0")}`;
    const newApp = {
      id: nextId,
      name: applicantName.trim(),
      khmer: "",
      grade: applicantGrade,
      parent: parentName.trim(),
      phone: parentPhone.trim() || "+855 12 000 000",
      date: "Today",
      stage: "New applications",
      docs: "Submitted online",
    };
    setApplicants((prev) => [newApp, ...prev]);
    setCategories((prev) =>
      prev.map((c) =>
        c.key === "New applications"
          ? { ...c, count: c.count + 1, title: `New applications · ${c.count + 1}` }
          : c
      )
    );
    setToastMsg(`Application ${nextId} submitted for ${applicantName.trim()}!`);
    setApplicantName("");
    setParentName("");
    setParentPhone("");
    setCreateApplicantOpen(false);
  };

  const handleAdmit = (appId: string) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, stage: "Accepted" } : a))
    );
    setToastMsg(`Student ${appId} officially accepted! Acceptance letter issued.`);
  };

  const stageApplicants = selectedStage
    ? applicants.filter((a) => a.stage === selectedStage)
    : [];

  return (
    <div className="mx-auto max-w-[1440px] p-5 lg:p-7">
      {toastMsg && (
        <div className="mb-4 flex items-center justify-between rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-800 dark:text-emerald-300 animate-in fade-in">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="size-4" />
            <span>{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg("")} className="text-muted-foreground hover:text-foreground">
            <X className="size-3.5" />
          </button>
        </div>
      )}

      <PageHeader
        eyebrow="School operations"
        title="Admissions"
        description="Review applicants and manage enrollment decisions."
        action={
          <Button size="sm" className="h-9 gap-1 text-xs cursor-pointer" onClick={() => setCreateApplicantOpen(true)}>
            <Plus className="size-4" />
            <span>Create new</span>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedStage(cat.key)}
            className="rounded-lg border border-border bg-card p-4 text-left shadow-card transition-colors hover:border-primary cursor-pointer"
          >
            <div className="flex size-9 items-center justify-center rounded-md bg-accent text-primary">
              <ClipboardList className="size-4" />
            </div>
            <h2 className="mt-3 font-semibold text-sm text-foreground">{cat.title}</h2>
            <p className="mt-0.5 text-[10px] text-muted-foreground">{cat.records} active records</p>
            <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{cat.desc}</p>
            <div className="mt-4 flex items-center text-[11px] font-semibold text-primary">
              Open details <ChevronRight className="ml-1 size-3.5" />
            </div>
          </button>
        ))}
      </div>

      {/* Stage Review Modal / Drawer */}
      {selectedStage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-foreground">Admissions: {selectedStage}</h3>
                <p className="text-xs text-muted-foreground">Review candidate documents and process decisions</p>
              </div>
              <Button variant="ghost" size="icon" className="size-8" onClick={() => setSelectedStage(null)}>
                <X className="size-4" />
              </Button>
            </div>

            <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {stageApplicants.length > 0 ? (
                stageApplicants.map((app) => (
                  <div key={app.id} className="rounded-lg border border-border p-3.5 bg-background text-xs space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-foreground">{app.name}</span>
                          <span className="font-mono text-[10px] text-primary font-semibold">{app.id}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">Applying for: <span className="font-medium text-foreground">{app.grade}</span> · Submitted {app.date}</p>
                      </div>
                      <StatusChip status={app.stage === "Accepted" ? "Active" : "Pending"} />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground bg-muted/50 p-2 rounded">
                      <div>
                        <span>Parent: </span>
                        <span className="font-medium text-foreground">{app.parent}</span>
                      </div>
                      <div>
                        <span>Phone: </span>
                        <span className="font-medium text-foreground">{app.phone}</span>
                      </div>
                      <div className="col-span-2">
                        <span>Documents: </span>
                        <span className="font-medium text-foreground">{app.docs}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-[11px]"
                        onClick={() => setToastMsg(`Interview scheduled for ${app.name} on Monday 09:00 AM`)}
                      >
                        Schedule Interview
                      </Button>
                      {app.stage !== "Accepted" && (
                        <Button
                          size="sm"
                          className="h-7 text-[11px] cursor-pointer"
                          onClick={() => handleAdmit(app.id)}
                        >
                          Accept & Admit
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground text-xs">
                  No applicants currently in stage "{selectedStage}"
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end border-t pt-3">
              <Button size="sm" onClick={() => setSelectedStage(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* New Applicant Modal */}
      {createApplicantOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-foreground">New Student Application</h3>
                <p className="text-xs text-muted-foreground">Register prospective student file</p>
              </div>
              <Button variant="ghost" size="icon" className="size-8" onClick={() => setCreateApplicantOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>

            <form onSubmit={handleCreateApplicant} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-foreground">Applicant Full Name *</label>
                <Input
                  required
                  placeholder="e.g. Sokunthea Pich"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="mt-1 h-9 text-xs"
                />
              </div>
              <div>
                <label className="font-semibold text-foreground">Applying for Grade</label>
                <select
                  value={applicantGrade}
                  onChange={(e) => setApplicantGrade(e.target.value)}
                  className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-xs"
                >
                  <option>Grade 6</option>
                  <option>Grade 7</option>
                  <option>Grade 8</option>
                  <option>Grade 9</option>
                  <option>Grade 10</option>
                  <option>Grade 11</option>
                  <option>Grade 12</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-foreground">Parent Name *</label>
                  <Input
                    required
                    placeholder="e.g. Pich Sovan"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-foreground">Phone Number</label>
                  <Input
                    placeholder="+855 12 345 991"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t pt-3">
                <Button type="button" variant="outline" size="sm" onClick={() => setCreateApplicantOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={!applicantName.trim() || !parentName.trim()}>
                  Submit Application
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function CommunicationPage() {
  const [announcements, setAnnouncements] = useState([
    {
      id: "ANN-104",
      title: "School Closed for Pchum Ben Holiday",
      category: "School announcements",
      audience: "All School (Parents, Students, Staff)",
      date: "19 Sep 2026",
      views: 428,
      body: "Please note that campus classes will pause for the national Pchum Ben celebration from 21 Sep to 24 Sep. Regular class schedules resume on Thursday 25 Sep.",
      status: "Published",
      author: "Admin Office",
      channel: "App Push + SMS",
    },
    {
      id: "ANN-103",
      title: "Term 1 Mid-Term Assessment Schedule",
      category: "Teacher notices",
      audience: "Teachers & Academic Staff",
      date: "16 Sep 2026",
      views: 310,
      body: "Mid-term examination question sheets must be finalized and submitted to the academic office by Friday 26 Sep for MoEYS standard formatting compliance.",
      status: "Published",
      author: "Academic Director",
      channel: "Staff Portal",
    },
    {
      id: "ANN-102",
      title: "Boeng Keng Kang Bus Route R03 Detour",
      category: "Parent messages",
      audience: "Parents · Route R03 Riders",
      date: "14 Sep 2026",
      views: 89,
      body: "Due to municipal road paving along Norodom Blvd, Bus R03 will detour via Monivong Blvd. Morning pickup times will occur 10 minutes earlier.",
      status: "Published",
      author: "Transport Operations",
      channel: "SMS + Push",
    },
    {
      id: "ANN-101",
      title: "Severe Weather Precaution Notice",
      category: "Emergency alerts",
      audience: "All Parents & Staff",
      date: "10 Sep 2026",
      views: 512,
      body: "Heavy seasonal rainfall is forecasted this afternoon. School bus drivers have been instructed to proceed via high-elevation corridors. Parents picking up children may arrive from 14:30.",
      status: "Sent",
      author: "Safety Office",
      channel: "Priority Broadcast",
    },
  ]);

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [createAnnounceOpen, setCreateAnnounceOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<typeof announcements[0] | null>(null);
  const [toastMsg, setToastMsg] = useState("");

  // Create form state
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("School announcements");
  const [newAudience, setNewAudience] = useState("All School (Parents, Students, Staff)");
  const [newBody, setNewBody] = useState("");

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim()) return;
    const nextId = `ANN-1${String(announcements.length + 5).padStart(2, "0")}`;
    const newAnn = {
      id: nextId,
      title: newTitle.trim(),
      category: newCategory,
      audience: newAudience,
      date: "Today",
      views: 0,
      body: newBody.trim(),
      status: "Published",
      author: "Admin Office",
      channel: "App Push + SMS",
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
    setToastMsg(`Announcement "${newTitle.trim()}" broadcasted!`);
    setNewTitle("");
    setNewBody("");
    setCreateAnnounceOpen(false);
  };

  const filtered = activeCategory === "All"
    ? announcements
    : announcements.filter((a) => a.category === activeCategory);

  return (
    <div className="mx-auto max-w-[1440px] p-5 lg:p-7">
      {toastMsg && (
        <div className="mb-4 flex items-center justify-between rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-800 dark:text-emerald-300 animate-in fade-in">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="size-4" />
            <span>{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg("")} className="text-muted-foreground hover:text-foreground">
            <X className="size-3.5" />
          </button>
        </div>
      )}

      <PageHeader
        eyebrow="School operations"
        title="Communication"
        description="Send announcements and manage school-wide messages."
        action={
          <Button size="sm" className="h-9 gap-1 text-xs cursor-pointer" onClick={() => setCreateAnnounceOpen(true)}>
            <Plus className="size-4" />
            <span>Create new</span>
          </Button>
        }
      />

      {/* Categories summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "School announcements", records: 28 },
          { title: "Parent messages", records: 32 },
          { title: "Teacher notices", records: 30 },
          { title: "Emergency alerts", records: 26 },
        ].map(({ title, records }) => (
          <button
            key={title}
            onClick={() => setActiveCategory(activeCategory === title ? "All" : title)}
            className={cn(
              "rounded-lg border bg-card p-4 text-left shadow-card transition-colors cursor-pointer",
              activeCategory === title ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary"
            )}
          >
            <div className="flex size-9 items-center justify-center rounded-md bg-accent text-primary">
              <MessageSquare className="size-4" />
            </div>
            <h2 className="mt-3 font-semibold text-xs text-foreground">{title}</h2>
            <p className="mt-0.5 text-[10px] text-muted-foreground">{records} active records</p>
            <div className="mt-4 flex items-center text-[11px] font-semibold text-primary">
              {activeCategory === title ? "Showing filtered" : "Open details"} <ChevronRight className="ml-1 size-3.5" />
            </div>
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div className="mt-6 rounded-lg border border-border bg-card shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-3.5">
          <div>
            <h3 className="font-semibold text-sm">Published Announcements & Notices</h3>
            <p className="text-xs text-muted-foreground">Active broadcasts distributed across school mobile apps</p>
          </div>
          {activeCategory !== "All" && (
            <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setActiveCategory("All")}>
              Reset filter ({activeCategory})
            </Button>
          )}
        </div>

        <div className="divide-y divide-border">
          {filtered.map((item) => (
            <div key={item.id} className="p-4 hover:bg-muted/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-foreground">{item.title}</span>
                  <span className="rounded bg-accent px-2 py-0.5 text-[10px] font-semibold text-primary">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{item.body}</p>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground pt-1">
                  <span>Audience: <strong className="text-foreground">{item.audience}</strong></span>
                  <span>·</span>
                  <span>Date: {item.date}</span>
                  <span>·</span>
                  <span>{item.views} views</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-xs shrink-0 cursor-pointer"
                onClick={() => setSelectedNotice(item)}
              >
                Open details
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Announcement Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-foreground">{selectedNotice.title}</h3>
                  <StatusChip status="Active" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Published by {selectedNotice.author} · {selectedNotice.date}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="size-8" onClick={() => setSelectedNotice(null)}>
                <X className="size-4" />
              </Button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="rounded-lg bg-muted/60 p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Target Audience:</span>
                  <span className="font-semibold text-foreground">{selectedNotice.audience}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Delivery Channel:</span>
                  <span className="font-semibold text-foreground">{selectedNotice.channel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Read Receipts:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">96% delivered ({selectedNotice.views} reads)</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-1.5">Broadcast Message Content</h4>
                <div className="rounded-lg border border-border p-3 bg-background text-foreground leading-relaxed">
                  {selectedNotice.body}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t pt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setToastMsg(`Push reminder resent to devices for "${selectedNotice.title}"!`);
                  setSelectedNotice(null);
                }}
              >
                <Send className="size-3.5 mr-1" />
                Resend Push Notification
              </Button>
              <Button size="sm" onClick={() => setSelectedNotice(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Announcement Modal */}
      {createAnnounceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-foreground">Publish Announcement</h3>
                <p className="text-xs text-muted-foreground">Broadcast to school mobile applications</p>
              </div>
              <Button variant="ghost" size="icon" className="size-8" onClick={() => setCreateAnnounceOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-foreground">Announcement Title *</label>
                <Input
                  required
                  placeholder="e.g. Campus Sports Day Schedule"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="mt-1 h-9 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-foreground">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-xs"
                  >
                    <option>School announcements</option>
                    <option>Parent messages</option>
                    <option>Teacher notices</option>
                    <option>Emergency alerts</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-foreground">Audience</label>
                  <select
                    value={newAudience}
                    onChange={(e) => setNewAudience(e.target.value)}
                    className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-xs"
                  >
                    <option>All School (Parents, Students, Staff)</option>
                    <option>Parents Only</option>
                    <option>Teachers Only</option>
                    <option>Bus Riders Only</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-semibold text-foreground">Message Body *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Type broadcast message..."
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  className="mt-1 w-full rounded-md border border-input bg-background p-2.5 text-xs focus:outline-hidden focus:ring-1 focus:ring-ring"
                />
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t pt-3">
                <Button type="button" variant="outline" size="sm" onClick={() => setCreateAnnounceOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={!newTitle.trim() || !newBody.trim()}>
                  Publish Announcement
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Tabs({ tabs, value, onChange }: { tabs: string[]; value: string; onChange: (value: string) => void }) {
  return (
    <div className="flex overflow-x-auto border-b border-border px-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={cn(
            "min-h-11 shrink-0 border-b-2 px-3 text-xs font-semibold cursor-pointer",
            tab === value
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

function DataTable({ headers, children }: { headers: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border bg-muted/60">
            {headers.map((header, i) => (
              <th key={`${header}-${i}`} className="px-4 py-2.5 text-[10px] font-semibold uppercase text-muted-foreground">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function TableFooter({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex items-center justify-between border-t border-border px-4 py-2.5">
      <p className="text-[11px] text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{count}</span> of {total}
      </p>
      <div className="flex gap-1">
        <Button variant="outline" size="icon" className="size-7" disabled aria-label="Previous page">
          <ChevronLeft className="size-3.5" />
        </Button>
        <Button variant="outline" size="icon" className="size-7" aria-label="Next page">
          <ChevronRight className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}

function StatusChip({ status }: { status: string }) {
  const tone = ["Paid", "Active", "Completed", "Resolved", "In service"].includes(status)
    ? "success"
    : ["Pending", "Scheduled", "Invited", "Delayed", "Maintenance"].includes(status)
    ? "warning"
    : ["Overdue", "Open", "Review"].includes(status)
    ? "danger"
    : "neutral";
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold", `status-${tone}`)}>
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-md bg-muted p-2.5 text-center">
      <p className="text-base font-bold">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}

function ProfileSection({ title, items }: { title: string; items: string[][] }) {
  return (
    <section className="mt-5">
      <h3 className="mb-2 text-xs font-semibold text-foreground">{title}</h3>
      <div className="divide-y divide-border rounded-md border border-border">
        {items.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 px-3 py-2 text-xs">
            <span className="text-muted-foreground">{label}</span>
            <span className="text-right font-medium">{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// ==========================================
// REPORTS & ANALYTICS PAGE (PROMPT 12)
// ==========================================

function ReportsPage() {
  const [reportTab, setReportTab] = useState<"Transport" | "Attendance" | "Finance" | "Engagement">("Transport");
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  return (
    <div className="mx-auto max-w-[1440px] p-5 lg:p-7 space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-18 right-8 z-50 rounded-xl bg-slate-900 text-white p-3 text-xs font-semibold shadow-2xl border border-white/20 animate-in fade-in flex items-center gap-2">
          <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      <PageHeader
        eyebrow="Intelligence & Executive Reporting"
        title="Reports & Analytics"
        description="Comprehensive operational metrics across Core SIS, Finance, Transport Safety, and Family Engagement."
        action={
          <Button
            size="sm"
            variant="outline"
            className="h-9 gap-1.5 text-xs font-semibold"
            onClick={() => showToast("Exported executive PDF report for Academic Board.")}
          >
            <Download className="size-4 text-primary" />
            <span>Export Board Summary (PDF)</span>
          </Button>
        }
      />

      {/* Top Executive KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi
          icon={Users}
          label="Attendance Rate (School-wide)"
          value="96.4%"
          detail="+1.2% above MoEYS benchmark"
          tone="green"
        />
        <Kpi
          icon={CircleDollarSign}
          label="Fee Collection Efficiency"
          value="92.5%"
          detail="$184,200 collected / $199k billed"
          tone="blue"
        />
        <Kpi
          icon={Bus}
          label="Transport Fleet Occupancy"
          value="84.8%"
          detail="386 active riders / 455 seats"
          tone="amber"
        />
        <Kpi
          icon={MessageSquare}
          label="Parent App Activation"
          value="88.2%"
          detail="720 active guardian accounts"
          tone="green"
        />
      </div>

      {/* Report Section Tabs */}
      <div className="rounded-xl border border-border bg-card shadow-xs">
        <Tabs
          tabs={["Transport", "Attendance", "Finance", "Engagement"]}
          value={reportTab}
          onChange={(t) => setReportTab(t as any)}
        />

        <div className="p-5 space-y-5 text-xs">
          {/* ---------------------------------------------------- */}
          {/* TAB 1: TRANSPORT PERFORMANCE                         */}
          {/* ---------------------------------------------------- */}
          {reportTab === "Transport" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-foreground">Fleet Route Performance & Reconciliation</h3>
                  <p className="text-xs text-muted-foreground">Term 2 ridership, delay frequency, and fee reconciliation by route</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs"
                  onClick={() => showToast("Exported route transport roster CSV.")}
                >
                  <Download className="size-3.5 mr-1" /> Export Transport CSV
                </Button>
              </div>

              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-left">
                  <thead className="bg-muted/50 text-[11px] font-semibold text-muted-foreground border-b">
                    <tr>
                      <th className="p-3">Route Code</th>
                      <th className="p-3">Zone & Campus</th>
                      <th className="p-3">Capacity</th>
                      <th className="p-3">Ridership</th>
                      <th className="p-3">On-Time %</th>
                      <th className="p-3">Incidents (30d)</th>
                      <th className="p-3 text-right">Fee Reconciled</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { code: "Route 03", zone: "Toul Kork / Russian Blvd", cap: 28, riders: 24, onTime: "91.8%", inc: "2 (roadwork)", rev: "$4,320.00" },
                      { code: "Route 07", zone: "Chamkarmon / BKK1", cap: 26, riders: 22, onTime: "96.4%", inc: "0", rev: "$3,960.00" },
                      { code: "Route 01", zone: "Sen Sok / Camko City", cap: 32, riders: 29, onTime: "94.2%", inc: "1 (traffic)", rev: "$5,220.00" },
                      { code: "Route 04", zone: "Chroy Changvar / Riverside", cap: 30, riders: 26, onTime: "95.0%", inc: "1 (bridge)", rev: "$4,680.00" },
                      { code: "Ligne 12", zone: "Campus Paris 15e / Rive Gauche", cap: 24, riders: 18, onTime: "98.1%", inc: "0", rev: "€3,960.00" },
                    ].map((row) => (
                      <tr key={row.code} className="hover:bg-muted/40 transition">
                        <td className="p-3 font-bold text-foreground">{row.code}</td>
                        <td className="p-3 text-muted-foreground">{row.zone}</td>
                        <td className="p-3 font-mono">{row.cap} seats</td>
                        <td className="p-3">
                          <span className="font-bold text-foreground">{row.riders}</span>
                          <span className="text-muted-foreground ml-1">({Math.round((row.riders / row.cap) * 100)}%)</span>
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">{row.onTime}</span>
                        </td>
                        <td className="p-3 text-muted-foreground">{row.inc}</td>
                        <td className="p-3 text-right font-bold text-foreground">{row.rev}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Transport Insights Grid */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-1">
                  <h4 className="font-bold text-foreground">Top Delay Factor</h4>
                  <p className="text-xl font-extrabold text-amber-600 dark:text-amber-400">Road Drainage Works</p>
                  <p className="text-[11px] text-muted-foreground">Russian Blvd corridor accounts for 68% of delayed arrivals this month.</p>
                </div>
                <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-1">
                  <h4 className="font-bold text-foreground">Safety Record</h4>
                  <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">100% Incident Resolved</p>
                  <p className="text-[11px] text-muted-foreground">Zero injuries or vehicle breakdowns. All 4 logged events closed within 24 hours.</p>
                </div>
                <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-1">
                  <h4 className="font-bold text-foreground">Parent Route Trust</h4>
                  <p className="text-xl font-extrabold text-primary">86.4% GeoAlert Opt-In</p>
                  <p className="text-[11px] text-muted-foreground">Subscribed parents receive automated 10-minute proximity notifications.</p>
                </div>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 2: ATTENDANCE OVERVIEW                           */}
          {/* ---------------------------------------------------- */}
          {reportTab === "Attendance" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-foreground">Attendance Distribution by Grade Level</h3>
                <p className="text-xs text-muted-foreground">Aggregated physical and bus auto-synced roll calls</p>
              </div>

              <div className="space-y-3">
                {[
                  { grade: "Early Years & Kindergarten (Toul Kork Campus)", rate: 97.4, count: "120/123" },
                  { grade: "Primary Grade 1 - 5 (Main Campus)", rate: 96.8, count: "310/320" },
                  { grade: "Lower Secondary Grade 6 - 8 (Grade 6A Homeroom)", rate: 95.4, count: "212/222" },
                  { grade: "Upper Secondary Grade 9 - 12 (MoEYS Baccalaureate)", rate: 94.2, count: "188/200" },
                  { grade: "Collège & Lycée (Campus Paris 15e)", rate: 97.1, count: "172/177" },
                ].map((item) => (
                  <div key={item.grade} className="rounded-xl border border-border bg-card p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground">{item.grade}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground font-mono">{item.count}</span>
                        <span className="font-extrabold text-primary">{item.rate}%</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${item.rate}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 3: FEES & FINANCE                                */}
          {/* ---------------------------------------------------- */}
          {reportTab === "Finance" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-foreground">Revenue Collection & Aging Balances</h3>
                  <p className="text-xs text-muted-foreground">Tuition, transport subscriptions, and activity fee reconciliation</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  Term 2 Invoicing
                </Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-4 space-y-1">
                  <span className="text-muted-foreground text-xs font-semibold">Total Invoiced</span>
                  <p className="text-2xl font-extrabold text-foreground">$199,000.00</p>
                  <p className="text-[11px] text-muted-foreground">842 invoices issued</p>
                </div>
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-1">
                  <span className="text-emerald-700 dark:text-emerald-400 text-xs font-semibold">Total Collected</span>
                  <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">$184,200.00</p>
                  <p className="text-[11px] text-muted-foreground">92.5% settlement rate</p>
                </div>
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 space-y-1">
                  <span className="text-rose-700 dark:text-rose-400 text-xs font-semibold">Overdue / Outstanding</span>
                  <p className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">$14,800.00</p>
                  <p className="text-[11px] text-muted-foreground">18 accounts pending follow-up</p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-2">
                <h4 className="font-bold text-foreground">Payment Channel Breakdown</h4>
                <div className="grid grid-cols-3 gap-3 pt-1 text-center">
                  <div className="rounded-lg bg-card p-3 border">
                    <p className="text-lg font-bold text-primary">68%</p>
                    <p className="text-xs font-semibold text-foreground">Bakong KHQR</p>
                    <p className="text-[10px] text-muted-foreground">$125,256 · Direct settlement</p>
                  </div>
                  <div className="rounded-lg bg-card p-3 border">
                    <p className="text-lg font-bold text-foreground">22%</p>
                    <p className="text-xs font-semibold text-foreground">Bank Wire Transfer</p>
                    <p className="text-[10px] text-muted-foreground">$40,524 · ABA & Canadia</p>
                  </div>
                  <div className="rounded-lg bg-card p-3 border">
                    <p className="text-lg font-bold text-foreground">10%</p>
                    <p className="text-xs font-semibold text-foreground">SEPA & Card (France)</p>
                    <p className="text-[10px] text-muted-foreground">€18,420 · Campus Paris</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 4: PARENT ENGAGEMENT                            */}
          {/* ---------------------------------------------------- */}
          {reportTab === "Engagement" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-foreground">Family Adoption & Digital Engagement</h3>
                <p className="text-xs text-muted-foreground">Weekly active parents, notice read velocity, and bus alert usage</p>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-xl border border-border bg-card p-4 space-y-1 text-center">
                  <p className="text-2xl font-extrabold text-primary">88.2%</p>
                  <p className="text-xs font-bold text-foreground">App Activation</p>
                  <p className="text-[10px] text-muted-foreground">720 active accounts</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 space-y-1 text-center">
                  <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">94.1%</p>
                  <p className="text-xs font-bold text-foreground">Notice Read Rate</p>
                  <p className="text-[10px] text-muted-foreground">Read within 24 hours</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 space-y-1 text-center">
                  <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">86.4%</p>
                  <p className="text-xs font-bold text-foreground">Bus Alert Usage</p>
                  <p className="text-[10px] text-muted-foreground">GeoAlert opt-in rate</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 space-y-1 text-center">
                  <p className="text-2xl font-extrabold text-foreground">14 min</p>
                  <p className="text-xs font-bold text-foreground">Helpdesk Response</p>
                  <p className="text-[10px] text-muted-foreground">Average resolution time</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
