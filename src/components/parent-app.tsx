import { useState, type ReactNode } from "react";
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  BusFront,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Download,
  GraduationCap,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  QrCode,
  ReceiptText,
  Send,
  TrendingUp,
  UserRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MobileDeviceFrame } from "@/components/mobile-device-frame";

type Tab = "home" | "progress" | "fees" | "bus" | "messages";
type Detail = "invoice" | "thread" | null;

const childrenData = {
  dara: { name: "Dara Sok", khmer: "សុខ ដារា", grade: "Grade 6A", attendance: "96%", average: "87%" },
  mali: { name: "Mali Sok", khmer: "សុខ ម៉ាលី", grade: "Grade 3B", attendance: "98%", average: "91%" },
};

const navItems = [
  { id: "home", label: "Home", khmer: "ទំព័រដើម", icon: Home },
  { id: "progress", label: "Progress", khmer: "ការសិក្សា", icon: TrendingUp },
  { id: "fees", label: "Fees", khmer: "ថ្លៃសិក្សា", icon: CircleDollarSign },
  { id: "bus", label: "Bus", khmer: "ឡានក្រុង", icon: BusFront },
  { id: "messages", label: "Messages", khmer: "សារ", icon: MessageCircle },
] as const;

export function ParentApp() {
  const [tab, setTab] = useState<Tab>("home");
  const [detail, setDetail] = useState<Detail>(null);
  const [childKey, setChildKey] = useState<keyof typeof childrenData>("dara");
  const [childMenu, setChildMenu] = useState(false);
  const [progressTab, setProgressTab] = useState<"attendance" | "grades">("attendance");
  const [notifsOpen, setNotifsOpen] = useState(false);
  const [unreadNotifs, setUnreadNotifs] = useState(2);
  const [selectedInvoice, setSelectedInvoice] = useState<{
    name: string;
    id: string;
    amount: string;
    date: string;
    status: "due" | "paid";
  } | null>(null);
  const [selectedSubjectModal, setSelectedSubjectModal] = useState<string | null>(null);
  const [absenceModal, setAbsenceModal] = useState(false);
  const [callDriverModal, setCallDriverModal] = useState(false);
  const [parentToast, setParentToast] = useState("");
  const [absenceReported, setAbsenceReported] = useState(false);

  const child = childrenData[childKey];

  const go = (next: Tab) => {
    setTab(next);
    setDetail(null);
  };

  const handleOpenInvoice = (inv: { name: string; id: string; amount: string; date: string; status: "due" | "paid" }) => {
    setSelectedInvoice(inv);
    setDetail("invoice");
  };

  return (
    <MobileDeviceFrame appName="Parent App" roleBadge="Parents">
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-background">
        {/* Toast notification */}
        {parentToast && (
          <div className="absolute top-16 inset-x-4 z-50 rounded-lg bg-emerald-600 text-white p-2.5 text-xs font-semibold shadow-lg animate-in fade-in slide-in-from-top-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 shrink-0" />
              <span>{parentToast}</span>
            </div>
            <button onClick={() => setParentToast("")} className="text-white/80 hover:text-white">
              <X className="size-3.5" />
            </button>
          </div>
        )}

        {/* Header */}
        <header className="shrink-0 bg-primary px-4 pb-3.5 pt-2 text-primary-foreground">
          <div className="mb-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {detail ? (
                <Button
                  aria-label="Go back"
                  variant="header"
                  size="icon"
                  className="size-8 text-white hover:bg-white/10 cursor-pointer"
                  onClick={() => setDetail(null)}
                >
                  <ChevronLeft className="size-5" />
                </Button>
              ) : (
                <div className="grid size-8 place-items-center rounded-md bg-primary-foreground/15">
                  <GraduationCap className="size-4.5" />
                </div>
              )}
              <div>
                <p className="text-[10px] font-medium text-primary-foreground/75">School OS</p>
                <h1 className="text-base font-semibold leading-tight">
                  {detail === "invoice"
                    ? "Invoice details"
                    : detail === "thread"
                    ? "School office"
                    : navItems.find((item) => item.id === tab)?.label}
                </h1>
              </div>
            </div>
            {!detail && (
              <Button
                aria-label="Notifications"
                variant="header"
                size="icon"
                onClick={() => setNotifsOpen(true)}
                className="relative size-8 text-white hover:bg-white/10 cursor-pointer"
              >
                <Bell className="size-4.5" />
                {unreadNotifs > 0 && (
                  <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-warning ring-2 ring-primary" />
                )}
              </Button>
            )}
          </div>

          {!detail && (
            <div className="relative">
              <Button
                variant="selector"
                className="h-11 w-full justify-between px-3 bg-white/15 hover:bg-white/20 border-0 cursor-pointer"
                onClick={() => setChildMenu(!childMenu)}
                aria-expanded={childMenu}
              >
                <span className="flex items-center gap-2.5 text-left">
                  <span className="grid size-7 place-items-center rounded-full bg-primary-foreground text-[11px] font-bold text-primary">
                    {child.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <span>
                    <span className="block text-xs font-semibold leading-tight">
                      {child.khmer} · {child.name}
                    </span>
                    <span className="block text-[10px] text-primary-foreground/75 leading-tight">
                      {child.grade}
                    </span>
                  </span>
                </span>
                <ChevronDown className={cn("size-4 transition-transform", childMenu && "rotate-180")} />
              </Button>

              {childMenu && (
                <div className="absolute inset-x-0 top-[48px] z-30 rounded-lg border bg-popover p-1 text-popover-foreground shadow-lg">
                  {Object.entries(childrenData).map(([key, item]) => (
                    <Button
                      key={key}
                      variant="ghost"
                      className="h-11 w-full justify-start px-2.5 text-left cursor-pointer"
                      onClick={() => {
                        setChildKey(key as keyof typeof childrenData);
                        setChildMenu(false);
                      }}
                    >
                      <UserRound className="size-4 text-muted-foreground mr-2" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold">{item.khmer} · {item.name}</span>
                        <span className="block text-[10px] text-muted-foreground">{item.grade}</span>
                      </span>
                      {key === childKey && <Check className="ml-auto size-4 text-success" />}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}
        </header>

        {/* Body content */}
        <div className="min-h-0 flex-1 overflow-y-auto bg-background scrollbar-none">
          <div className="animate-screen px-3.5 py-3" key={`${tab}-${detail}-${progressTab}-${childKey}`}>
            {detail === "invoice" ? (
              <InvoiceDetail
                invoice={
                  selectedInvoice ?? {
                    name: "September tuition",
                    id: "INV-2026-0904",
                    amount: "$120.00",
                    date: "Due 25 Sep 2026",
                    status: "due",
                  }
                }
                onDownloadPdf={() => {
                  setParentToast(`Downloaded receipt PDF for ${selectedInvoice?.id ?? "INV-2026-0904"}`);
                }}
              />
            ) : detail === "thread" ? (
              <MessageThread />
            ) : (
              <>
                {tab === "home" && <HomeScreen child={child} go={go} />}
                {tab === "progress" && (
                  <ProgressScreen
                    current={progressTab}
                    setCurrent={setProgressTab}
                    child={child}
                    onSubjectClick={(s) => setSelectedSubjectModal(s)}
                  />
                )}
                {tab === "fees" && <FeesScreen onSelectInvoice={handleOpenInvoice} />}
                {tab === "bus" && (
                  <BusScreen
                    absenceReported={absenceReported}
                    onOpenAbsence={() => setAbsenceModal(true)}
                    onOpenCallDriver={() => setCallDriverModal(true)}
                  />
                )}
                {tab === "messages" && <MessagesScreen openThread={() => setDetail("thread")} />}
              </>
            )}
          </div>
        </div>

        {/* Notifications Sheet Modal */}
        {notifsOpen && (
          <div className="absolute inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-sm font-bold text-foreground">Parent Alerts · ការជូនដំណឹង</h3>
                <p className="text-[10px] text-muted-foreground">Live updates regarding your children</p>
              </div>
              <Button variant="ghost" size="icon" className="size-7" onClick={() => setNotifsOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>

            <div className="mt-3 space-y-2.5 flex-1 overflow-y-auto text-xs">
              <div className="rounded-lg border border-border p-3 bg-card">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">Safe Bus Arrival Confirmed</span>
                  <span className="text-[10px] text-primary font-medium">07:38 AM</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">Dara arrived at campus safely on Bus B-12 and checked in through the gate.</p>
              </div>
              <div className="rounded-lg border border-border p-3 bg-card">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">September Tuition Due</span>
                  <span className="text-[10px] text-warning-strong font-medium">5 days left</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">Invoice INV-2026-0904 for $120.00 is due on 25 September.</p>
              </div>
              <div className="rounded-lg border border-border p-3 bg-card">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">Teacher Meeting Tomorrow</span>
                  <span className="text-[10px] text-muted-foreground">Yesterday</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">Parent consultation at 2:00 PM with Mrs. Sophorn in Room 6A.</p>
              </div>
            </div>

            <div className="mt-auto pt-3 border-t">
              <Button
                variant="outline"
                className="w-full text-xs h-9"
                onClick={() => {
                  setUnreadNotifs(0);
                  setNotifsOpen(false);
                }}
              >
                Mark all as read
              </Button>
            </div>
          </div>
        )}

        {/* Subject Assessment Modal */}
        {selectedSubjectModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
            <div className="w-full max-w-[320px] rounded-2xl border border-border bg-card p-5 shadow-2xl text-left">
              <div className="flex items-start justify-between border-b pb-3">
                <div>
                  <h3 className="text-base font-bold text-foreground">{selectedSubjectModal}</h3>
                  <p className="text-[11px] text-muted-foreground">Continuous assessment breakdown · Term 1</p>
                </div>
                <Button variant="ghost" size="icon" className="size-7" onClick={() => setSelectedSubjectModal(null)}>
                  <X className="size-4" />
                </Button>
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div className="flex items-center justify-between rounded-lg bg-muted/60 p-2.5">
                  <span className="font-semibold text-foreground">Term Average</span>
                  <span className="text-base font-bold text-primary">92% (Grade A)</span>
                </div>
                <div className="space-y-1.5 pt-1 text-[11px]">
                  <div className="flex justify-between py-1 border-b border-border/70">
                    <span className="text-muted-foreground">Homework Submissions (20%)</span>
                    <span className="font-bold">95%</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/70">
                    <span className="text-muted-foreground">Classroom Quizzes (30%)</span>
                    <span className="font-bold">90%</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/70">
                    <span className="text-muted-foreground">Mid-Term MoEYS Exam (40%)</span>
                    <span className="font-bold">92%</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Class Participation (10%)</span>
                    <span className="font-bold text-success">100%</span>
                  </div>
                </div>

                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/50 p-2.5 mt-2">
                  <p className="font-bold text-[10px] text-primary">TEACHER FEEDBACK</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                    "Dara is attentive, completes mathematics assignments promptly, and helps classmates during peer exercises."
                  </p>
                </div>
              </div>

              <Button size="sm" className="mt-4 w-full text-xs" onClick={() => setSelectedSubjectModal(null)}>
                Done
              </Button>
            </div>
          </div>
        )}

        {/* Report Absence Modal */}
        {absenceModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
            <div className="w-full max-w-[320px] rounded-2xl border border-border bg-card p-5 shadow-2xl text-left text-xs">
              <div className="flex items-start justify-between border-b pb-2">
                <div>
                  <h3 className="font-bold text-sm text-foreground">Report Absence / No-Show</h3>
                  <p className="text-[10px] text-muted-foreground">Notify bus driver and homeroom teacher</p>
                </div>
                <Button variant="ghost" size="icon" className="size-6" onClick={() => setAbsenceModal(false)}>
                  <X className="size-3.5" />
                </Button>
              </div>

              <div className="mt-3 space-y-2.5">
                <p className="text-muted-foreground">Select reason for {child.name} today:</p>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-border hover:bg-muted cursor-pointer">
                    <input type="radio" name="reason" defaultChecked className="text-primary" />
                    <span>Sick / Unwell (Medical leave)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-border hover:bg-muted cursor-pointer">
                    <input type="radio" name="reason" className="text-primary" />
                    <span>Family event / Travel</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-border hover:bg-muted cursor-pointer">
                    <input type="radio" name="reason" className="text-primary" />
                    <span>Self pickup (Will not take bus)</span>
                  </label>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => setAbsenceModal(false)}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => {
                    setAbsenceReported(true);
                    setAbsenceModal(false);
                    setParentToast(`Absence reported. Bus Driver & Teacher notified for ${child.name}.`);
                  }}
                >
                  Submit Notice
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Call Driver Modal */}
        {callDriverModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
            <div className="w-full max-w-[300px] rounded-2xl border border-border bg-card p-5 shadow-2xl text-left text-xs">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h3 className="font-bold text-sm text-foreground">Contact Bus Staff</h3>
                  <p className="text-[10px] text-muted-foreground">Route B-12 Crew</p>
                </div>
                <Button variant="ghost" size="icon" className="size-6" onClick={() => setCallDriverModal(false)}>
                  <X className="size-3.5" />
                </Button>
              </div>

              <div className="mt-3 space-y-2.5">
                <div className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-muted/30">
                  <div>
                    <p className="font-bold text-foreground">Mr. Vannak (Driver)</p>
                    <p className="text-[10px] text-muted-foreground">+855 12 778 899</p>
                  </div>
                  <Button
                    size="sm"
                    className="h-7 px-2 text-[11px] gap-1 cursor-pointer"
                    onClick={() => {
                      setCallDriverModal(false);
                      setParentToast("Calling Mr. Vannak (+855 12 778 899)...");
                    }}
                  >
                    <Phone className="size-3" /> Call
                  </Button>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-muted/30">
                  <div>
                    <p className="font-bold text-foreground">Sreyneang (Assistant)</p>
                    <p className="text-[10px] text-muted-foreground">+855 17 445 221</p>
                  </div>
                  <Button
                    size="sm"
                    className="h-7 px-2 text-[11px] gap-1 cursor-pointer"
                    onClick={() => {
                      setCallDriverModal(false);
                      setParentToast("Calling Sreyneang (+855 17 445 221)...");
                    }}
                  >
                    <Phone className="size-3" /> Call
                  </Button>
                </div>
              </div>

              <Button size="sm" variant="outline" className="mt-3 w-full text-xs" onClick={() => setCallDriverModal(false)}>
                Close
              </Button>
            </div>
          </div>
        )}

        {/* Bottom Tab Bar */}
        {!detail && (
          <nav
            className="grid h-14 shrink-0 grid-cols-5 border-t bg-card px-1 pb-1 shadow-sm"
            aria-label="Main navigation"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  className={cn(
                    "flex flex-col items-center justify-center gap-0.5 h-full min-w-0 transition-colors cursor-pointer",
                    active ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => go(item.id)}
                >
                  <Icon className={cn("size-4.5", active && "stroke-[2.5]")} />
                  <span className="text-[10px] font-semibold leading-none">{item.label}</span>
                  <span className="text-[8px] leading-none opacity-70">{item.khmer}</span>
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </MobileDeviceFrame>
  );
}

function SectionTitle({ title, khmer, action }: { title: string; khmer: string; action?: ReactNode }) {
  return (
    <div className="mb-2 flex items-end justify-between">
      <div>
        <h2 className="text-sm font-bold text-foreground">{title}</h2>
        <p className="text-[10px] text-muted-foreground">{khmer}</p>
      </div>
      {action}
    </div>
  );
}

function HomeScreen({
  child,
  go,
}: {
  child: (typeof childrenData)[keyof typeof childrenData];
  go: (tab: Tab) => void;
}) {
  return (
    <div className="space-y-3.5">
      <div>
        <p className="text-xs text-muted-foreground">Good morning · អរុណសួស្តី</p>
        <h2 className="text-lg font-bold">Here’s {child.name.split(" ")[0]}’s day</h2>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <button onClick={() => go("progress")} className="card-focus text-left cursor-pointer p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="icon-box bg-success-soft text-success">
              <CalendarDays className="size-4" />
            </span>
            <ChevronRight className="size-3.5 text-muted-foreground" />
          </div>
          <p className="text-xl font-bold">{child.attendance}</p>
          <p className="text-xs font-semibold">Attendance</p>
          <p className="text-[9px] text-muted-foreground">វត្តមាន · This term</p>
        </button>

        <button onClick={() => go("progress")} className="card-focus text-left cursor-pointer p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="icon-box bg-progress-soft text-progress">
              <TrendingUp className="size-4" />
            </span>
            <ChevronRight className="size-3.5 text-muted-foreground" />
          </div>
          <p className="text-xl font-bold">{child.average}</p>
          <p className="text-xs font-semibold">Grade average</p>
          <p className="text-[9px] text-muted-foreground">ពិន្ទុ · +3% this term</p>
        </button>
      </div>

      {/* Fees alert card */}
      <button
        onClick={() => go("fees")}
        className="w-full rounded-lg border border-progress-border bg-progress-soft p-3 text-left transition active:scale-[.99] cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <span className="icon-box bg-warning text-warning-foreground">
            <ReceiptText className="size-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-bold">School fee due soon</span>
            <span className="block text-[10px] text-muted-foreground">ថ្លៃសិក្សា · Due 25 Sep</span>
          </span>
          <span className="text-right">
            <span className="block text-xs font-bold">$120.00</span>
            <span className="block text-[9px] font-semibold text-warning-strong">5 days left</span>
          </span>
          <ChevronRight className="size-4 text-muted-foreground" />
        </div>
      </button>

      {/* Bus status card */}
      <div>
        <SectionTitle
          title="Bus update"
          khmer="ព័ត៌មានឡានក្រុង"
          action={
            <Button variant="link" size="sm" className="h-6 p-0 text-xs" onClick={() => go("bus")}>
              View all
            </Button>
          }
        />
        <button
          onClick={() => go("bus")}
          className="w-full rounded-lg border bg-card p-3 text-left shadow-card cursor-pointer"
        >
          <div className="flex gap-2.5">
            <span className="icon-box bg-bus-soft text-bus">
              <BusFront className="size-4" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold truncate">Morning route B-12</p>
                <span className="status-bus">On time</span>
              </div>
              <p className="mt-0.5 text-[11px] text-muted-foreground truncate">
                Picked up at Toul Kork stop
              </p>
              <div className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-success">
                <Check className="size-3" /> 7:12 AM · Confirmed by driver
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

function ProgressScreen({
  current,
  setCurrent,
  child,
  onSubjectClick,
}: {
  current: "attendance" | "grades";
  setCurrent: (v: "attendance" | "grades") => void;
  child: (typeof childrenData)[keyof typeof childrenData];
  onSubjectClick?: (subject: string) => void;
}) {
  const months = ["August 2026", "September 2026", "October 2026"];
  const [monthIdx, setMonthIdx] = useState(1);
  const [selectedDay, setSelectedDay] = useState<number | null>(17);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div>
      <div className="segmented mb-3">
        <Button
          variant={current === "attendance" ? "segmentActive" : "segment"}
          onClick={() => setCurrent("attendance")}
          className="text-xs"
        >
          Attendance · វត្តមាន
        </Button>
        <Button
          variant={current === "grades" ? "segmentActive" : "segment"}
          onClick={() => setCurrent("grades")}
          className="text-xs"
        >
          Grades · ពិន្ទុ
        </Button>
      </div>

      {current === "attendance" ? (
        <>
          <div className="mb-2 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="size-7 cursor-pointer"
              onClick={() => setMonthIdx((m) => Math.max(0, m - 1))}
              disabled={monthIdx === 0}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <div className="text-center">
              <h2 className="text-sm font-bold">{months[monthIdx]}</h2>
              <p className="text-[10px] text-muted-foreground">19 school days recorded</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 cursor-pointer"
              onClick={() => setMonthIdx((m) => Math.min(months.length - 1, m + 1))}
              disabled={monthIdx === months.length - 1}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <div className="rounded-lg border bg-card p-2.5 shadow-card">
            <div className="grid grid-cols-7 pb-1 text-center text-[9px] font-bold text-muted-foreground">
              {"SMTWTFS".split("").map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-1 text-center text-xs">
              {[null, ...days].map((day, i) => {
                const isSelected = selectedDay === day;
                return (
                  <div key={i} className="grid h-7 place-items-center">
                    {day && (
                      <button
                        onClick={() => setSelectedDay(day)}
                        className={cn(
                          "grid size-6 place-items-center rounded-full text-[11px] transition-transform active:scale-95 cursor-pointer",
                          day === 8 && "bg-danger-soft text-danger ring-1 ring-danger font-bold",
                          day === 17 && "bg-warning-soft text-warning-strong ring-1 ring-warning font-bold",
                          ![8, 17].includes(day) && day < 21 && "bg-success-soft text-success font-semibold",
                          isSelected && "ring-2 ring-primary ring-offset-1 font-extrabold"
                        )}
                      >
                        {day}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Day Status Inspector */}
          {selectedDay && (
            <div className="mt-2.5 rounded-lg border border-primary/20 bg-primary/5 p-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">
                  {(months[monthIdx] ?? months[0])?.split(" ")[0]} {selectedDay} Summary
                </span>
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded font-bold",
                    selectedDay === 8
                      ? "bg-danger-soft text-danger"
                      : selectedDay === 17
                      ? "bg-warning-soft text-warning-strong"
                      : selectedDay < 21
                      ? "bg-success-soft text-success"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {selectedDay === 8
                    ? "Absent"
                    : selectedDay === 17
                    ? "Late Arrival"
                    : selectedDay < 21
                    ? "Present"
                    : "Scheduled"}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {selectedDay === 8
                  ? "Excused absence recorded. Reason: Family appointment."
                  : selectedDay === 17
                  ? "Arrived at 08:12 AM due to heavy traffic on Russian Blvd. Verified by Homeroom Teacher."
                  : selectedDay < 21
                  ? "Checked in on time at 07:35 AM via RFID Student Gate."
                  : "Upcoming academic calendar day."}
              </p>
            </div>
          )}

          <div className="mt-2.5 flex justify-center gap-3 text-[9px]">
            <Legend color="bg-success" text="Present 18" />
            <Legend color="bg-danger" text="Absent 1" />
            <Legend color="bg-warning" text="Late 1" />
          </div>

          <div className="mt-3.5 rounded-lg bg-primary p-3 text-primary-foreground">
            <p className="text-[11px] opacity-80">Term attendance · វត្តមានសរុប</p>
            <div className="mt-1 flex items-end justify-between">
              <strong className="text-xl">{child.attendance}</strong>
              <span className="text-[11px] font-medium">Excellent standing</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mb-3 rounded-lg bg-primary p-3 text-primary-foreground">
            <p className="text-[11px] opacity-75">Term 1 average · មធ្យមភាគ</p>
            <div className="mt-1 flex items-end justify-between">
              <strong className="text-2xl">{child.average}</strong>
              <span className="rounded-full bg-primary-foreground/15 px-2 py-0.5 text-[9px] font-bold">
                ↑ 3% improvement
              </span>
            </div>
          </div>

          <SectionTitle title="Subjects" khmer="មុខវិជ្ជា (ចុចដើម្បីមើលលម្អិត)" />
          {([
            ["Mathematics", "គណិតវិទ្យា", "92", "A"],
            ["Khmer Language", "ភាសាខ្មែរ", "88", "B+"],
            ["Science", "វិទ្យាសាស្ត្រ", "85", "B"],
            ["English", "ភាសាអង់គ្លេស", "83", "B"],
          ] as const).map(([name, kh, score, grade]) => (
            <button
              key={name}
              onClick={() => onSubjectClick?.(name)}
              className="mb-2 flex w-full items-center gap-2.5 rounded-lg border bg-card p-2.5 text-left shadow-xs hover:border-primary transition cursor-pointer"
            >
              <span className="grid size-9 place-items-center rounded-md bg-secondary text-xs font-bold text-primary">
                {grade}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-xs font-semibold truncate">{name}</span>
                <span className="block text-[10px] text-muted-foreground truncate">
                  {kh} · Tap for continuous assessment
                </span>
              </span>
              <strong className="text-sm">{score}%</strong>
              <ChevronRight className="size-3.5 text-muted-foreground" />
            </button>
          ))}
        </>
      )}
    </div>
  );
}

function Legend({ color, text }: { color: string; text: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <i className={cn("size-2 rounded-full", color)} />
      {text}
    </span>
  );
}

function FeesScreen({
  onSelectInvoice,
}: {
  onSelectInvoice: (invoice: {
    name: string;
    id: string;
    amount: string;
    date: string;
    status: "due" | "paid";
  }) => void;
}) {
  const invoices: Array<{
    name: string;
    id: string;
    amount: string;
    date: string;
    status: "due" | "paid";
  }> = [
    { name: "September tuition", id: "INV-2026-0904", amount: "$120.00", date: "Due 25 Sep 2026", status: "due" },
    { name: "School transport · Term 1", id: "INV-2026-0812", amount: "$45.00", date: "Paid 30 Aug 2026", status: "paid" },
    { name: "August tuition", id: "INV-2026-0741", amount: "$120.00", date: "Paid 22 Aug 2026", status: "paid" },
  ];

  return (
    <div>
      <div className="mb-3 rounded-lg bg-primary p-3.5 text-primary-foreground">
        <p className="text-[11px] opacity-75">Outstanding balance · ប្រាក់នៅសល់</p>
        <div className="mt-1 flex items-end justify-between">
          <strong className="text-2xl font-bold">$120.00</strong>
          <span className="text-[11px]">1 invoice due</span>
        </div>
      </div>

      <SectionTitle title="Invoices" khmer="វិក្កយបត្រ (ចុចដើម្បីមើល ឬបង់ប្រាក់)" />
      {invoices.map((inv) => (
        <button
          key={inv.id}
          onClick={() => onSelectInvoice(inv)}
          className="mb-2.5 w-full rounded-lg border bg-card p-3 text-left shadow-card transition active:scale-[.99] cursor-pointer hover:border-primary/50"
        >
          <div className="flex items-start">
            <span
              className={cn(
                "icon-box",
                inv.status === "due" ? "bg-warning-soft text-warning-strong" : "bg-success-soft text-success"
              )}
            >
              <ReceiptText className="size-4" />
            </span>
            <span className="ml-2.5 min-w-0 flex-1">
              <span className="block text-xs font-bold">{inv.name}</span>
              <span className="block text-[10px] text-muted-foreground">{inv.id}</span>
              <span className="mt-1 block text-[11px] text-muted-foreground">{inv.date}</span>
            </span>
            <span className="text-right">
              <strong className="block text-xs font-bold">{inv.amount}</strong>
              <span className={inv.status === "due" ? "status-due" : "status-paid"}>
                {inv.status === "due" ? "Payment due" : "Paid"}
              </span>
            </span>
            <ChevronRight className="ml-1 size-3.5 text-muted-foreground self-center" />
          </div>
        </button>
      ))}
    </div>
  );
}

function InvoiceDetail({
  invoice,
  onDownloadPdf,
}: {
  invoice: {
    name: string;
    id: string;
    amount: string;
    date: string;
    status: "due" | "paid";
  };
  onDownloadPdf: () => void;
}) {
  const [paid, setPaid] = useState(invoice.status === "paid");

  return (
    <div>
      <div className="mb-3 text-center">
        <span className={paid ? "status-paid" : "status-due"}>
          {paid ? "Payment confirmed" : "Payment due"}
        </span>
        <h2 className="mt-1.5 text-2xl font-bold">{invoice.amount}</h2>
        <p className="text-[11px] text-muted-foreground">
          {invoice.name} · {invoice.id}
        </p>
      </div>

      {paid ? (
        <div className="rounded-xl border bg-card p-4 shadow-card text-left space-y-3">
          <div className="flex items-center gap-2 border-b pb-2 text-success">
            <Check className="size-5" />
            <div>
              <p className="text-xs font-bold text-foreground">Official Payment Receipt</p>
              <p className="text-[10px] text-muted-foreground">Bakong transaction verified</p>
            </div>
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-muted-foreground">Payment Date</span>
              <span className="font-semibold">Today · 08:30 AM</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-semibold">Bakong KHQR (USD)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-muted-foreground">Transaction Ref</span>
              <span className="font-mono text-[11px] font-bold text-primary">#BK-2026-9048</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Payer Account</span>
              <span className="font-semibold">Sokha Meas (Wing Bank)</span>
            </div>
          </div>

          <Button
            className="w-full text-xs font-semibold gap-1.5 cursor-pointer"
            variant="outline"
            onClick={onDownloadPdf}
          >
            <Download className="size-3.5" /> Download Official Receipt PDF
          </Button>
        </div>
      ) : (
        <>
          <div className="rounded-lg border bg-card p-3.5 text-center shadow-card">
            <p className="text-xs font-bold">Scan with Bakong / Any Bank KHQR</p>
            <p className="text-[10px] text-muted-foreground">ស្កេនដើម្បីបង់ប្រាក់ជាមួយកម្មវិធីបាគង ឬធនាគារ</p>
            <div
              className="mx-auto my-2.5 grid size-32 grid-cols-11 gap-px border-4 border-card bg-card p-1 shadow-inner"
              aria-label="Representative KHQR payment code"
            >
              {Array.from({ length: 121 }, (_, i) => (
                <i
                  key={i}
                  className={cn(
                    (i * 7 + (i % 5)) % 3 === 0 ||
                      [0, 1, 2, 11, 22, 8, 9, 10, 19, 20, 21, 88, 99, 110].includes(i)
                      ? "bg-foreground"
                      : "bg-card"
                  )}
                />
              ))}
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-md bg-destructive px-2.5 py-1 text-[11px] font-bold text-destructive-foreground shadow-xs">
              <span className="text-xs font-extrabold">KHQR</span> Bakong Accepted
            </div>
            <p className="mt-2 text-[9px] text-muted-foreground">Merchant: School OS · USD</p>
          </div>

          <Button
            className="mt-3 h-10 w-full text-xs font-semibold cursor-pointer"
            onClick={() => setPaid(true)}
          >
            I’ve completed payment via Bakong
          </Button>
        </>
      )}

      <div className="mt-3.5">
        <SectionTitle title="Payment records" khmer="ប្រវត្តិការបង់ប្រាក់" />
        <div className="rounded-lg border bg-card p-2.5">
          <div className="flex gap-2.5 items-center">
            <span className="icon-box bg-success-soft text-success">
              <Check className="size-4" />
            </span>
            <div className="text-xs">
              <p className="font-semibold">August tuition · $120.00</p>
              <p className="text-[10px] text-muted-foreground">22 Aug 2026 · Bakong Txn #BK-8102 · Verified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BusScreen({
  absenceReported,
  onOpenAbsence,
  onOpenCallDriver,
}: {
  absenceReported?: boolean;
  onOpenAbsence?: () => void;
  onOpenCallDriver?: () => void;
}) {
  return (
    <div>
      {/* Bus status active badge */}
      <div className="mb-2.5 rounded-lg border border-bus-border bg-bus-soft p-2.5">
        <div className="flex items-center gap-2.5">
          <span className="icon-box bg-bus text-bus-foreground">
            <BusFront className="size-4" />
          </span>
          <div className="flex-1">
            <p className="text-xs font-bold">Transport service active</p>
            <p className="text-[10px] text-muted-foreground">សេវាដឹកជញ្ជូន · Term 1</p>
          </div>
          <span className="status-paid">Active</span>
        </div>
      </div>

      {/* If absence reported today */}
      {absenceReported && (
        <div className="mb-2.5 rounded-lg border border-warning/40 bg-warning-soft p-2.5 text-xs text-warning-strong">
          <div className="flex items-center gap-1.5 font-bold">
            <AlertCircle className="size-3.5" /> Notice Active
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Student marked absent for bus pickup today. Driver Mr. Vannak has been notified.
          </p>
        </div>
      )}

      {/* Quick Bus Actions */}
      <div className="mb-3 grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-1.5 text-xs font-semibold cursor-pointer border-border hover:border-primary"
          onClick={onOpenCallDriver}
        >
          <Phone className="size-3.5 text-primary" /> Call Driver
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-1.5 text-xs font-semibold cursor-pointer border-border hover:border-destructive text-destructive hover:bg-destructive/5"
          onClick={onOpenAbsence}
        >
          <AlertCircle className="size-3.5" /> Report Absence
        </Button>
      </div>

      <div className="mb-3 rounded-lg border bg-card p-3 shadow-card">
        <SectionTitle title="Route B-12" khmer="ផ្លូវទួលគោក" />
        <div className="space-y-2">
          <div className="flex gap-2.5">
            <MapPin className="size-4 text-bus shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold">Toul Kork Market stop</p>
              <p className="text-[10px] text-muted-foreground">Pickup 7:10 AM · Drop-off 4:05 PM</p>
            </div>
          </div>
          <div className="flex gap-2.5">
            <Clock3 className="size-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold">Bus B-12 · Plate 2AB-4301</p>
              <p className="text-[10px] text-muted-foreground">Driver: Mr. Vannak · Assistant: Sreyneang</p>
            </div>
          </div>
        </div>
      </div>

      <SectionTitle title="Today’s journey" khmer="ដំណើរថ្ងៃនេះ" />
      {[
        ["Picked up", "បានឡើងឡាន", "7:12 AM", "success"],
        ["Arrived at school", "បានដល់សាលា", "7:38 AM", "success"],
        ["Afternoon trip", "ដំណើរពេលល្ងាច", "3:45 PM", "pending"],
      ].map(([title, kh, time, status], i) => (
        <div key={title} className="relative flex gap-2.5 pb-4">
          <div className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full border-2 border-background bg-card">
            <span
              className={cn(
                "size-2.5 rounded-full",
                status === "success" ? "bg-success" : "bg-warning"
              )}
            />
          </div>
          {i < 2 && <i className="absolute left-[15px] top-7 h-7 w-px bg-border" />}
          <div className="flex-1 pt-0.5">
            <div className="flex justify-between items-center">
              <p className="text-xs font-bold">{title}</p>
              <span className="text-[11px] font-semibold">{time}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">
              {kh} · {status === "success" ? "Confirmed by bus staff" : "Scheduled"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function MessagesScreen({ openThread }: { openThread: () => void }) {
  return (
    <div>
      <SectionTitle title="Announcements" khmer="សេចក្តីជូនដំណឹង" />
      {[
        ["School office", "Parent–teacher meeting", "Tomorrow · 2:00 PM", "unread"],
        ["Grade 6A teacher", "Science field trip permission", "18 Sep · 4:30 PM", "read"],
        ["Finance office", "September fee reminder", "17 Sep · 9:15 AM", "read"],
      ].map(([from, title, time, status], i) => (
        <button
          key={title}
          onClick={openThread}
          className="mb-2 flex w-full gap-2.5 rounded-lg border bg-card p-2.5 text-left shadow-card cursor-pointer hover:border-primary/60 transition"
        >
          <span
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-full",
              i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            )}
          >
            <MessageCircle className="size-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex justify-between items-center">
              <span className="text-[10px] font-semibold text-muted-foreground">{from}</span>
              <span className="text-[9px] text-muted-foreground">{time}</span>
            </span>
            <span className="mt-0.5 block truncate text-xs font-bold">{title}</span>
            <span className="mt-0.5 block truncate text-[10px] text-muted-foreground">
              Tap to read and reply to school office…
            </span>
          </span>
          {status === "unread" && <span className="mt-1 size-2 rounded-full bg-primary" />}
        </button>
      ))}
    </div>
  );
}

function MessageThread() {
  const [messages, setMessages] = useState<string[]>([
    "Thank you, I will attend the meeting on time.",
  ]);
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, text.trim()]);
    setText("");
  };

  return (
    <div className="flex flex-col h-full">
      <p className="mb-3 text-center text-[10px] font-semibold uppercase text-muted-foreground">
        Today · ថ្ងៃនេះ
      </p>
      <div className="mb-2.5 max-w-[88%] rounded-lg rounded-tl-sm bg-secondary p-2.5">
        <p className="text-xs leading-relaxed">
          Hello! A reminder that the parent–teacher meeting is tomorrow at 2:00 PM in Room 6A.
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground">
          សូមរំលឹកថា ការប្រជុំមាតាបិតា និងគ្រូបង្រៀន គឺនៅថ្ងៃស្អែក។
        </p>
        <p className="mt-1.5 text-[9px] text-muted-foreground">School office · 10:24 AM</p>
      </div>

      {messages.map((msg, i) => (
        <div key={i} className="ml-auto max-w-[80%] rounded-lg rounded-tr-sm bg-primary p-2.5 text-primary-foreground mb-2">
          <p className="text-xs">{msg}</p>
          <p className="mt-1 text-[9px] opacity-70">Just now · Sent</p>
        </div>
      ))}

      <div className="mt-auto pt-3 flex gap-2 border-t bg-card">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Write a message… · សរសេរសារ"
          className="flex h-10 flex-1 items-center rounded-md border border-input bg-background px-3 text-xs focus:outline-primary"
        />
        <Button
          size="icon"
          className="size-10 shrink-0"
          onClick={handleSend}
          aria-label="Send message"
        >
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
}
