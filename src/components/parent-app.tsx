import { useState, useMemo } from "react";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Bell,
  Bus,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  CircleDollarSign,
  Clock,
  Clock3,
  CreditCard,
  Download,
  GraduationCap,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  QrCode,
  ReceiptText,
  Send,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  UserRound,
  UserX,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { MobileDeviceFrame } from "@/components/mobile-device-frame";
import { StatusChip } from "@/components/shared/status-chip";
import { LanguageToggle, SupportedLanguage } from "@/components/shared/language-toggle";
import { EmptyState } from "@/components/shared/empty-state";
import {
  MOCK_PARENTS,
  MOCK_STUDENTS,
  MOCK_INVOICES,
  MOCK_ANNOUNCEMENTS,
  Student,
  Invoice,
} from "@/data/mock-data";

type Tab = "home" | "progress" | "fees" | "bus" | "messages";
type Detail = "invoice" | "thread" | null;

export type BusStateVariation =
  | "not-subscribed"
  | "upcoming"
  | "boarded"
  | "delayed"
  | "arrived-campus"
  | "pm-pending"
  | "dropped-off"
  | "no-show"
  | "incident";

export function ParentApp() {
  const [tab, setTab] = useState<Tab>("home");
  const [detail, setDetail] = useState<Detail>(null);
  const [lang, setLang] = useState<SupportedLanguage>("en");
  const [selectedStudentId, setSelectedStudentId] = useState<string>("stu-dara-meas");
  const [childMenu, setChildMenu] = useState(false);
  const [progressTab, setProgressTab] = useState<"attendance" | "grades">("attendance");
  const [notifsOpen, setNotifsOpen] = useState(false);
  const [unreadNotifs, setUnreadNotifs] = useState(2);
  const [parentToast, setParentToast] = useState("");

  // Modals
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [selectedSubjectModal, setSelectedSubjectModal] = useState<string | null>(null);
  const [absenceModal, setAbsenceModal] = useState(false);
  const [callDriverModal, setCallDriverModal] = useState(false);
  const [khqrOpen, setKhqrOpen] = useState(false);

  // Bus tab state demo simulation
  const [busDemoState, setBusDemoState] = useState<BusStateVariation>("delayed");
  const [geoAlertMinutes, setGeoAlertMinutes] = useState<number>(10);
  const [absenceReported, setAbsenceReported] = useState(false);

  // Active student
  const activeStudent: Student =
    MOCK_STUDENTS.find((s) => s.id === selectedStudentId) ?? MOCK_STUDENTS[0]!;

  const activeInvoices = useMemo(
    () => MOCK_INVOICES.filter((inv) => inv.studentId === activeStudent.id),
    [activeStudent.id],
  );

  const unpaidInvoices = activeInvoices.filter((inv) => inv.status !== "Paid");

  const showToast = (msg: string) => {
    setParentToast(msg);
    setTimeout(() => setParentToast(""), 3500);
  };

  const go = (next: Tab) => {
    setTab(next);
    setDetail(null);
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "progress", label: "Progress", icon: TrendingUp },
    { id: "fees", label: "Fees", icon: CircleDollarSign },
    { id: "bus", label: "Bus", icon: Bus },
    { id: "messages", label: "Messages", icon: MessageCircle },
  ] as const;

  return (
    <MobileDeviceFrame appName="Parent App" roleBadge="Family">
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-background select-none">
        {/* Toast notification */}
        {parentToast && (
          <div className="absolute top-16 inset-x-4 z-50 rounded-xl bg-slate-900 text-white p-3 text-xs font-semibold shadow-2xl border border-white/20 animate-in fade-in slide-in-from-top-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
              <span>{parentToast}</span>
            </div>
            <button onClick={() => setParentToast("")} className="text-white/80 hover:text-white">
              <X className="size-3.5" />
            </button>
          </div>
        )}

        {/* Header */}
        <header className="shrink-0 bg-primary px-4 pb-3 pt-2.5 text-primary-foreground shadow-xs">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {detail ? (
                <Button
                  aria-label="Go back"
                  variant="ghost"
                  size="icon"
                  className="size-8 text-white hover:bg-white/15 cursor-pointer"
                  onClick={() => setDetail(null)}
                >
                  <ChevronLeft className="size-5" />
                </Button>
              ) : (
                <div className="grid size-7 place-items-center rounded-lg bg-white/20 text-white font-bold text-xs">
                  OS
                </div>
              )}
              <div>
                <p className="text-[10px] font-medium opacity-80">School OS · Family Portal</p>
                <h1 className="text-sm font-bold leading-tight">
                  {detail === "invoice"
                    ? "Invoice & Receipt"
                    : detail === "thread"
                    ? "School & Transport Office"
                    : navItems.find((item) => item.id === tab)?.label}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <LanguageToggle
                currentLanguage={lang}
                onLanguageChange={(l) => {
                  setLang(l);
                  showToast(
                    l === "kh"
                      ? "បានប្តូរទៅជាភាសាខ្មែរ"
                      : l === "fr"
                      ? "Langue changée en français"
                      : "Language switched to English",
                  );
                }}
              />

              {!detail && (
                <Button
                  aria-label="Notifications"
                  variant="ghost"
                  size="icon"
                  onClick={() => setNotifsOpen(true)}
                  className="relative size-8 text-white hover:bg-white/15 cursor-pointer"
                >
                  <Bell className="size-4" />
                  {unreadNotifs > 0 && (
                    <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-amber-400 ring-2 ring-primary" />
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Child Switcher Dropdown */}
          {!detail && (
            <div className="relative mt-1">
              <Button
                variant="ghost"
                className="h-11 w-full justify-between px-3 bg-white/15 hover:bg-white/25 text-white border border-white/20 cursor-pointer rounded-xl"
                onClick={() => setChildMenu(!childMenu)}
                aria-expanded={childMenu}
              >
                <span className="flex items-center gap-2.5 text-left">
                  <img
                    src={activeStudent.avatar}
                    alt={activeStudent.fullName}
                    className="size-7 rounded-full object-cover border border-white/40"
                  />
                  <span>
                    <span className="block text-xs font-bold leading-tight">
                      {activeStudent.fullName}
                    </span>
                    <span className="block text-[10px] opacity-80 leading-tight">
                      {activeStudent.className} · {activeStudent.studentId}
                    </span>
                  </span>
                </span>
                <ChevronDown className={cn("size-4 transition-transform", childMenu && "rotate-180")} />
              </Button>

              {childMenu && (
                <div className="absolute inset-x-0 top-[48px] z-30 rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-2xl animate-in fade-in">
                  <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Switch Child Profile
                  </p>
                  {MOCK_STUDENTS.map((item) => {
                    const isSelected = item.id === selectedStudentId;
                    return (
                      <Button
                        key={item.id}
                        variant="ghost"
                        className={cn(
                          "h-11 w-full justify-start px-2.5 text-left cursor-pointer rounded-lg",
                          isSelected && "bg-muted font-bold",
                        )}
                        onClick={() => {
                          setSelectedStudentId(item.id);
                          setChildMenu(false);
                          showToast(`Switched view to ${item.fullName}`);
                        }}
                      >
                        <img
                          src={item.avatar}
                          alt={item.fullName}
                          className="size-7 rounded-full object-cover mr-2.5 border"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="block text-xs font-bold text-foreground">
                            {item.fullName}
                          </span>
                          <span className="block text-[10px] text-muted-foreground">
                            {item.className} · {item.grade}
                          </span>
                        </div>
                        {isSelected && <Check className="ml-auto size-4 text-primary" />}
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </header>

        {/* Scrollable Body Content */}
        <div className="min-h-0 flex-1 overflow-y-auto bg-background scrollbar-none">
          <div className="px-3.5 py-3.5 space-y-3.5">
            {detail === "invoice" && selectedInvoice ? (
              <InvoiceDetail
                invoice={selectedInvoice}
                student={activeStudent}
                onDownloadPdf={() =>
                  showToast(`Downloaded receipt PDF for ${selectedInvoice.invoiceNumber}`)
                }
                onPayBakong={() => setKhqrOpen(true)}
              />
            ) : detail === "thread" ? (
              <MessageThread onSend={() => showToast("Message delivered to School Office")} />
            ) : (
              <>
                {/* ---------------------------------------------------- */}
                {/* TAB 1: HOME                                          */}
                {/* ---------------------------------------------------- */}
                {tab === "home" && (
                  <div className="space-y-3.5">
                    {/* Live Bus Banner on Home */}
                    {activeStudent.busSubscription?.subscribed && (
                      <div
                        onClick={() => go("bus")}
                        className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 shadow-xs cursor-pointer hover:border-amber-500 transition-all flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="grid size-9 place-items-center rounded-lg bg-amber-500 text-slate-950 font-bold shadow-xs">
                            <Bus className="size-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <StatusChip status="delayed" label="Route 03 Delayed (+12m)" size="sm" />
                            </div>
                            <p className="text-xs font-bold text-foreground mt-1">
                              Boarded safely · Approaching Santhormok
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                              Driver: Seng Vibol · Estimated Campus Arrival: 07:47 AM
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="size-4 text-amber-700 dark:text-amber-400 shrink-0" />
                      </div>
                    )}

                    {/* Child Quick Snapshot Cards */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div
                        onClick={() => {
                          setProgressTab("attendance");
                          go("progress");
                        }}
                        className="rounded-xl border border-border bg-card p-3 shadow-xs cursor-pointer hover:border-primary/50 transition"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">
                            Attendance
                          </span>
                          <CalendarDays className="size-3.5 text-primary" />
                        </div>
                        <p className="text-xl font-extrabold text-foreground mt-1.5">
                          {activeStudent.attendanceRate}%
                        </p>
                        <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                          ✓ On track (0 unexcused)
                        </p>
                      </div>

                      <div
                        onClick={() => {
                          setProgressTab("grades");
                          go("progress");
                        }}
                        className="rounded-xl border border-border bg-card p-3 shadow-xs cursor-pointer hover:border-primary/50 transition"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">
                            Academic GPA
                          </span>
                          <TrendingUp className="size-3.5 text-sky-600" />
                        </div>
                        <p className="text-xl font-extrabold text-foreground mt-1.5">
                          {activeStudent.gpa.toFixed(2)}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-semibold mt-0.5">
                          Term 2 Honor Roll
                        </p>
                      </div>
                    </div>

                    {/* Unpaid Fees Alert */}
                    {unpaidInvoices.length > 0 && unpaidInvoices[0] && (
                      <div
                        onClick={() => go("fees")}
                        className="rounded-xl border border-amber-500/30 bg-card p-3 shadow-xs cursor-pointer hover:border-amber-500 transition flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="grid size-8 place-items-center rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-400">
                            <CircleDollarSign className="size-4.5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-foreground">
                              {unpaidInvoices[0].items[0]?.description}
                            </h4>
                            <p className="text-[10px] text-muted-foreground">
                              Due {unpaidInvoices[0].dueDate} · Balance:{" "}
                              <span className="font-bold text-foreground">
                                ${unpaidInvoices[0].balanceDue}.00
                              </span>
                            </p>
                          </div>
                        </div>
                        <Button size="sm" className="h-7 text-[11px] font-bold bg-primary text-white">
                          Pay
                        </Button>
                      </div>
                    )}

                    {/* Latest School Announcements */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                          School Circulars & News
                        </h3>
                        <button
                          onClick={() => go("messages")}
                          className="text-[11px] font-bold text-primary hover:underline cursor-pointer"
                        >
                          View all
                        </button>
                      </div>

                      <div className="space-y-2">
                        {MOCK_ANNOUNCEMENTS.slice(0, 2).map((ann) => (
                          <div
                            key={ann.id}
                            className="rounded-xl border border-border bg-card p-3 shadow-xs space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-[9px] px-1.5 py-0">
                                {ann.category}
                              </Badge>
                              <span className="text-[10px] text-muted-foreground">
                                {ann.publishedAt}
                              </span>
                            </div>
                            <h4 className="text-xs font-bold text-foreground">{ann.title}</h4>
                            <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                              {ann.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* TAB 2: PROGRESS (ATTENDANCE & GRADES)                 */}
                {/* ---------------------------------------------------- */}
                {tab === "progress" && (
                  <div className="space-y-3.5">
                    {/* Switcher: Attendance vs Grades */}
                    <div className="grid grid-cols-2 rounded-xl bg-muted p-1 text-xs font-bold">
                      <button
                        onClick={() => setProgressTab("attendance")}
                        className={cn(
                          "rounded-lg py-1.5 transition cursor-pointer text-center",
                          progressTab === "attendance"
                            ? "bg-card text-foreground shadow-xs"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        Attendance Calendar
                      </button>
                      <button
                        onClick={() => setProgressTab("grades")}
                        className={cn(
                          "rounded-lg py-1.5 transition cursor-pointer text-center",
                          progressTab === "grades"
                            ? "bg-card text-foreground shadow-xs"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        Subject Grades
                      </button>
                    </div>

                    {progressTab === "attendance" ? (
                      <div className="space-y-3">
                        <div className="rounded-xl border border-border bg-card p-3.5 shadow-xs text-center space-y-2">
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span>September 2026</span>
                            <span className="text-emerald-600 dark:text-emerald-400">
                              98% Present
                            </span>
                          </div>
                          {/* Simulated 5-day school week grid */}
                          <div className="grid grid-cols-5 gap-1.5 text-center text-[10px] pt-1">
                            {["Mon 15", "Tue 16", "Wed 17", "Thu 18", "Fri 19"].map((day, i) => (
                              <div key={day} className="rounded-lg border border-border/80 bg-muted/40 p-2">
                                <span className="font-semibold text-muted-foreground block">
                                  {day}
                                </span>
                                <span className="inline-block mt-1 size-2 rounded-full bg-emerald-500" />
                                <span className="block text-[9px] font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
                                  Present
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-xl border border-border bg-card p-3 text-xs space-y-2">
                          <h4 className="font-bold text-foreground">Attendance Policy Notice</h4>
                          <p className="text-[11px] text-muted-foreground leading-relaxed">
                            Absences must be reported via Parent App before 06:30 AM to allow bus routing adjustments and teacher attendance verification.
                          </p>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setAbsenceModal(true)}
                            className="w-full text-xs font-bold text-rose-600 border-rose-500/30 hover:bg-rose-500/10 cursor-pointer"
                          >
                            <AlertCircle className="size-3.5 mr-1" /> Report Absence for Tomorrow
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {[
                          { subject: "Mathematics 6", grade: "94%", letter: "A", teacher: "Mr. Chhay Meng" },
                          { subject: "Science & Robotics", grade: "89%", letter: "B+", teacher: "Mr. David Seng" },
                          { subject: "English Literature", grade: "91%", letter: "A-", teacher: "Ms. Rachel Green" },
                          { subject: "Khmer History & Culture", grade: "96%", letter: "A", teacher: "Mrs. Kolab Srey" },
                        ].map((sub) => (
                          <div
                            key={sub.subject}
                            onClick={() => setSelectedSubjectModal(sub.subject)}
                            className="rounded-xl border border-border bg-card p-3 shadow-xs cursor-pointer hover:border-primary/50 transition flex items-center justify-between"
                          >
                            <div>
                              <h4 className="text-xs font-bold text-foreground">{sub.subject}</h4>
                              <p className="text-[10px] text-muted-foreground">
                                Teacher: {sub.teacher}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-extrabold text-primary">
                                {sub.grade}
                              </span>
                              <span className="ml-1 text-xs font-bold text-muted-foreground">
                                ({sub.letter})
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* TAB 3: FEES & INVOICES                               */}
                {/* ---------------------------------------------------- */}
                {tab === "fees" && (
                  <div className="space-y-3.5">
                    <div className="rounded-xl bg-gradient-to-r from-primary to-primary/80 p-4 text-white shadow-md">
                      <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                        Total Balance Outstanding
                      </p>
                      <h3 className="text-2xl font-extrabold mt-1">
                        ${unpaidInvoices.reduce((acc, i) => acc + i.balanceDue, 0)}.00
                      </h3>
                      <p className="text-[11px] opacity-90 mt-0.5">
                        Academic Year 2026-2027 · Cambodia & France Billing
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Invoices & Receipts
                      </h4>
                      <Badge variant="outline" className="text-[10px]">
                        {activeInvoices.length} Records
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      {activeInvoices.map((inv) => (
                        <div
                          key={inv.id}
                          onClick={() => {
                            setSelectedInvoice(inv);
                            setDetail("invoice");
                          }}
                          className="rounded-xl border border-border bg-card p-3.5 shadow-xs cursor-pointer hover:border-primary/60 transition space-y-2"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h5 className="text-xs font-bold text-foreground">{inv.term}</h5>
                              <p className="text-[10px] text-muted-foreground font-mono">
                                {inv.invoiceNumber}
                              </p>
                            </div>
                            <StatusChip status={inv.status} size="sm" />
                          </div>

                          <div className="flex items-center justify-between text-xs pt-1 border-t border-border/60">
                            <span className="text-[11px] text-muted-foreground">
                              Due {inv.dueDate}
                            </span>
                            <span className="font-extrabold text-foreground">
                              ${inv.totalAmount}.00
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* TAB 4: BUS & TRANSPORT TRANSPARENCY (PROMPT 6)       */}
                {/* ---------------------------------------------------- */}
                {tab === "bus" && (
                  <div className="space-y-3.5">
                    {/* Demo State Switcher */}
                    <div className="rounded-xl border border-border bg-muted/60 p-2.5 text-xs">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          Simulate Bus Journey State:
                        </span>
                        <span className="text-[10px] font-mono text-primary font-bold">9 States</span>
                      </div>
                      <Select
                        value={busDemoState}
                        onValueChange={(val: string) => setBusDemoState(val as BusStateVariation)}
                      >
                        <SelectTrigger className="h-8 text-xs bg-card">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="upcoming">1. Upcoming Morning Pickup (06:40 AM)</SelectItem>
                          <SelectItem value="boarded">2. Student Boarded Safely (06:42 AM)</SelectItem>
                          <SelectItem value="delayed">3. Route Delayed (+12m Roadwork)</SelectItem>
                          <SelectItem value="arrived-campus">4. Arrived at Campus (07:38 AM)</SelectItem>
                          <SelectItem value="pm-pending">5. Afternoon Trip Pending (03:45 PM)</SelectItem>
                          <SelectItem value="dropped-off">6. Student Dropped Off (04:12 PM)</SelectItem>
                          <SelectItem value="no-show">7. No-Show / Excused Absence</SelectItem>
                          <SelectItem value="incident">8. Incident Advisory Broadcast</SelectItem>
                          <SelectItem value="not-subscribed">9. Not Subscribed to Bus</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {busDemoState === "not-subscribed" ? (
                      <EmptyState
                        icon={<Bus className="size-6" />}
                        title="No Active Bus Subscription"
                        description="Dara is currently registered as a self-drop/carpool student. You can enroll in Route 03 or Route 07 anytime."
                        actionLabel="Subscribe to School Bus Route"
                        onAction={() =>
                          showToast("Transport office request submitted. You will be contacted shortly.")
                        }
                      />
                    ) : (
                      <>
                        {/* Live Status Banner */}
                        <div
                          className={cn(
                            "rounded-xl border p-3.5 shadow-xs space-y-1.5",
                            busDemoState === "delayed"
                              ? "border-amber-500 bg-amber-500/15"
                              : busDemoState === "no-show"
                              ? "border-rose-500 bg-rose-500/10"
                              : "border-emerald-500 bg-emerald-500/10",
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              Live Transport Status
                            </span>
                            <StatusChip
                              status={
                                busDemoState === "delayed"
                                  ? "delayed"
                                  : busDemoState === "no-show"
                                  ? "no-show"
                                  : "on-schedule"
                              }
                              size="sm"
                            />
                          </div>

                          <h3 className="text-sm font-extrabold text-foreground">
                            {busDemoState === "upcoming" && "Bus en route to your stop (ETA 06:40 AM)"}
                            {busDemoState === "boarded" && "Dara boarded safely at Toul Kork Circle"}
                            {busDemoState === "delayed" && "Route 03 Delayed by ~12 mins (Russian Blvd)"}
                            {busDemoState === "arrived-campus" && "Arrived safely at Phnom Penh Main Campus Gate 2"}
                            {busDemoState === "pm-pending" && "Afternoon departure scheduled at 03:45 PM"}
                            {busDemoState === "dropped-off" && "Dropped off at Toul Kork Circle · Guardian Verified"}
                            {busDemoState === "no-show" && "Marked Excused Absence for Today's Trip"}
                            {busDemoState === "incident" && "Traffic Alert: Drainage Roadwork Obstruction"}
                          </h3>

                          <p className="text-[11px] text-muted-foreground">
                            {busDemoState === "delayed"
                              ? "Bus KH 2A-9412 is currently safe and moving slowly near 7 Makara flyover."
                              : "All students are verified by Assistant Chea Sreyneang."}
                          </p>
                        </div>

                        {/* Direct Driver Contact & Absence Report Action Buttons */}
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setCallDriverModal(true)}
                            className="h-9 gap-1.5 text-xs font-bold border-border hover:border-primary cursor-pointer"
                          >
                            <Phone className="size-3.5 text-primary" /> Call Bus Driver
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setAbsenceModal(true)}
                            className="h-9 gap-1.5 text-xs font-bold text-rose-600 border-rose-500/30 hover:bg-rose-500/10 cursor-pointer"
                          >
                            <AlertCircle className="size-3.5" /> Report Absence
                          </Button>
                        </div>

                        {/* Route & Stop Summary Card */}
                        <div className="rounded-xl border border-border bg-card p-3.5 shadow-xs space-y-2.5">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-foreground">
                              Route 03 · Toul Kork & Russian Blvd
                            </h4>
                            <Badge variant="secondary" className="text-[10px]">
                              Bus KH 2A-9412
                            </Badge>
                          </div>

                          <div className="space-y-1.5 text-xs">
                            <div className="flex items-start gap-2">
                              <MapPin className="size-4 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <p className="font-bold text-foreground">Toul Kork Circle Stop</p>
                                <p className="text-[10px] text-muted-foreground">
                                  Pickup: 06:40 AM · Drop-off: 04:10 PM
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <UserCheck className="size-4 text-primary shrink-0 mt-0.5" />
                              <div>
                                <p className="font-bold text-foreground">Crew Onboard</p>
                                <p className="text-[10px] text-muted-foreground">
                                  Driver: Seng Vibol (+855 12 998 123) · Assistant: Chea Sreyneang
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Transport Event Timeline */}
                        <div className="rounded-xl border border-border bg-card p-3.5 shadow-xs space-y-3">
                          <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                            Today's Journey Timeline
                          </h4>

                          <div className="relative pl-5 space-y-4">
                            {/* Vertical line */}
                            <div className="absolute left-[7px] top-1.5 bottom-1.5 w-0.5 bg-border" />

                            <div className="relative">
                              <div className="absolute -left-5 top-0.5 size-3.5 rounded-full bg-emerald-500 border-2 border-background" />
                              <p className="text-xs font-bold text-foreground">Picked Up at Stop</p>
                              <p className="text-[10px] text-muted-foreground">
                                06:42 AM · Toul Kork Circle · Verified by Assistant
                              </p>
                            </div>

                            <div className="relative">
                              <div
                                className={cn(
                                  "absolute -left-5 top-0.5 size-3.5 rounded-full border-2 border-background",
                                  busDemoState === "delayed"
                                    ? "bg-amber-500 animate-pulse"
                                    : "bg-emerald-500",
                                )}
                              />
                              <p className="text-xs font-bold text-foreground">
                                {busDemoState === "delayed" ? "Traffic Advisory" : "En Route"}
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                07:15 AM · Russian Blvd congestion · Revised ETA active
                              </p>
                            </div>

                            <div className="relative">
                              <div
                                className={cn(
                                  "absolute -left-5 top-0.5 size-3.5 rounded-full border-2 border-background",
                                  busDemoState === "arrived-campus"
                                    ? "bg-emerald-500"
                                    : "bg-muted-foreground/30",
                                )}
                              />
                              <p className="text-xs font-bold text-foreground">Arrived at Campus Gate 2</p>
                              <p className="text-[10px] text-muted-foreground">
                                Scheduled: 07:35 AM · Auto-synced with homeroom teacher
                              </p>
                            </div>

                            <div className="relative">
                              <div
                                className={cn(
                                  "absolute -left-5 top-0.5 size-3.5 rounded-full border-2 border-background",
                                  busDemoState === "dropped-off"
                                    ? "bg-emerald-500"
                                    : "bg-muted-foreground/30",
                                )}
                              />
                              <p className="text-xs font-bold text-foreground">Afternoon Drop-Off</p>
                              <p className="text-[10px] text-muted-foreground">
                                Scheduled: 04:10 PM · Receiving Guardian check enabled
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* GeoAlert / ETA Preferences Card */}
                        <div className="rounded-xl border border-border bg-card p-3.5 shadow-xs space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-foreground">GeoAlert & ETA Warning</h4>
                            <Badge variant="outline" className="text-[10px]">
                              Push Alert
                            </Badge>
                          </div>
                          <p className="text-[11px] text-muted-foreground">
                            Receive proactive notifications before bus reaches Toul Kork Circle:
                          </p>
                          <div className="grid grid-cols-4 gap-1.5 pt-1">
                            {[5, 10, 15, 20].map((mins) => (
                              <button
                                key={mins}
                                onClick={() => {
                                  setGeoAlertMinutes(mins);
                                  showToast(`GeoAlert set: You will be notified ${mins} mins prior to bus arrival.`);
                                }}
                                className={cn(
                                  "rounded-lg py-1.5 text-xs font-bold border transition cursor-pointer text-center",
                                  geoAlertMinutes === mins
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "border-border bg-muted/40 text-muted-foreground hover:bg-muted",
                                )}
                              >
                                {mins} min
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* TAB 5: MESSAGES & COMMUNICATIONS                     */}
                {/* ---------------------------------------------------- */}
                {tab === "messages" && (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Direct Inboxes
                      </h4>
                      <Button
                        size="sm"
                        onClick={() => setDetail("thread")}
                        className="h-7 text-[11px] font-bold bg-primary text-white cursor-pointer"
                      >
                        New Message
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div
                        onClick={() => setDetail("thread")}
                        className="rounded-xl border border-border bg-card p-3 shadow-xs cursor-pointer hover:border-primary/60 transition flex items-start gap-3"
                      >
                        <div className="grid size-9 place-items-center rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-400 shrink-0">
                          <Bus className="size-4.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold text-foreground">
                              Transport Operations Desk
                            </h5>
                            <span className="text-[10px] text-muted-foreground">07:16 AM</span>
                          </div>
                          <p className="text-[11px] font-semibold text-foreground truncate mt-0.5">
                            Route 03 Traffic Advisory: +12m delay
                          </p>
                          <p className="text-[10px] text-muted-foreground truncate">
                            All students are comfortable and safe onboard...
                          </p>
                        </div>
                      </div>

                      <div
                        onClick={() => setDetail("thread")}
                        className="rounded-xl border border-border bg-card p-3 shadow-xs cursor-pointer hover:border-primary/60 transition flex items-start gap-3"
                      >
                        <div className="grid size-9 place-items-center rounded-lg bg-primary/15 text-primary shrink-0">
                          <GraduationCap className="size-4.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold text-foreground">
                              Mr. Chhay Meng (Homeroom)
                            </h5>
                            <span className="text-[10px] text-muted-foreground">Yesterday</span>
                          </div>
                          <p className="text-[11px] font-semibold text-foreground truncate mt-0.5">
                            Grade 6A STEM Project Materials
                          </p>
                          <p className="text-[10px] text-muted-foreground truncate">
                            Thank you for submitting Dara's consent slip...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        {!detail && (
          <nav className="shrink-0 border-t border-border bg-card px-2 py-1.5 shadow-lg">
            <div className="grid grid-cols-5 gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = tab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => go(item.id)}
                    className={cn(
                      "flex flex-col items-center justify-center rounded-xl py-1 text-[10px] font-bold transition cursor-pointer",
                      active
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Icon className={cn("size-4.5", active && "stroke-[2.5px]")} />
                    <span className="mt-0.5">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        )}

        {/* ============================================================ */}
        {/* MODAL: CALL DRIVER & ASSISTANT                               */}
        {/* ============================================================ */}
        {callDriverModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
            <div className="w-full max-w-[310px] rounded-2xl border border-border bg-card p-4 shadow-2xl text-left text-xs">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h3 className="font-bold text-sm text-foreground">Contact Route Crew</h3>
                  <p className="text-[10px] text-muted-foreground">Route 03 · Bus KH 2A-9412</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6"
                  onClick={() => setCallDriverModal(false)}
                >
                  <X className="size-3.5" />
                </Button>
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl border border-border bg-muted/30">
                  <div>
                    <p className="font-bold text-foreground">Seng Vibol (Driver)</p>
                    <p className="text-[10px] text-muted-foreground">+855 12 998 123</p>
                  </div>
                  <Button
                    size="sm"
                    className="h-8 px-2.5 text-xs gap-1 cursor-pointer bg-primary text-white"
                    onClick={() => {
                      setCallDriverModal(false);
                      showToast("Initiating call to Driver Seng Vibol (+855 12 998 123)...");
                    }}
                  >
                    <Phone className="size-3.5" /> Call
                  </Button>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl border border-border bg-muted/30">
                  <div>
                    <p className="font-bold text-foreground">Chea Sreyneang (Assistant)</p>
                    <p className="text-[10px] text-muted-foreground">+855 12 998 124</p>
                  </div>
                  <Button
                    size="sm"
                    className="h-8 px-2.5 text-xs gap-1 cursor-pointer bg-primary text-white"
                    onClick={() => {
                      setCallDriverModal(false);
                      showToast("Initiating call to Assistant Chea Sreyneang (+855 12 998 124)...");
                    }}
                  >
                    <Phone className="size-3.5" /> Call
                  </Button>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCallDriverModal(false)}
                className="mt-3 w-full text-xs font-bold"
              >
                Close
              </Button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* MODAL: REPORT ABSENCE / NO-SHOW                               */}
        {/* ============================================================ */}
        {absenceModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
            <div className="w-full max-w-[310px] rounded-2xl border border-border bg-card p-4 shadow-2xl text-left text-xs">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h3 className="font-bold text-sm text-foreground">Report Student Absence</h3>
                  <p className="text-[10px] text-muted-foreground">
                    Auto-alerts Route Driver and Homeroom Teacher
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6"
                  onClick={() => setAbsenceModal(false)}
                >
                  <X className="size-3.5" />
                </Button>
              </div>

              <div className="mt-3 space-y-2">
                <p className="text-muted-foreground">Select absence reason for {activeStudent.fullName}:</p>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-border hover:bg-muted cursor-pointer">
                    <input type="radio" name="absence_reason" defaultChecked className="text-primary" />
                    <span>Medical / Sick leave</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-border hover:bg-muted cursor-pointer">
                    <input type="radio" name="absence_reason" className="text-primary" />
                    <span>Family event / Personal</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-border hover:bg-muted cursor-pointer">
                    <input type="radio" name="absence_reason" className="text-primary" />
                    <span>Parent will transport (No bus pickup)</span>
                  </label>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAbsenceModal(false)}
                  className="flex-1 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setAbsenceModal(false);
                    setBusDemoState("no-show");
                    showToast(`Absence notice sent: Driver & Homeroom notified for ${activeStudent.fullName}.`);
                  }}
                  className="flex-1 text-xs font-bold bg-primary text-white"
                >
                  Submit Notice
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* MODAL: BAKONG KHQR & SEPA PAYMENT                            */}
        {/* ============================================================ */}
        {khqrOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
            <div className="w-full max-w-[320px] rounded-2xl border border-border bg-card p-4 shadow-2xl text-center text-xs">
              <div className="flex items-center justify-between border-b pb-2 text-left">
                <div>
                  <h3 className="font-bold text-sm text-foreground">Bakong KHQR Payment</h3>
                  <p className="text-[10px] text-muted-foreground">National Bank of Cambodia</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6"
                  onClick={() => setKhqrOpen(false)}
                >
                  <X className="size-3.5" />
                </Button>
              </div>

              <div className="mt-3 space-y-3">
                <div className="mx-auto grid size-44 place-items-center rounded-xl border-2 border-red-500 bg-white p-2 shadow-inner">
                  <div className="flex flex-col items-center">
                    <div className="w-full bg-red-600 text-white font-extrabold text-[10px] py-0.5 rounded tracking-widest mb-1">
                      KHQR
                    </div>
                    <QrCode className="size-28 text-slate-900" />
                    <span className="text-[9px] font-bold text-slate-800">
                      SCHOOL OS MAIN CAMPUS
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-extrabold text-foreground">
                    ${selectedInvoice?.balanceDue || 900}.00 USD
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Scan with ABA, Wing, ACLEDA, or any Bakong App
                  </p>
                </div>

                <Button
                  onClick={() => {
                    setKhqrOpen(false);
                    showToast("Payment verified via Bakong! Receipt generated.");
                  }}
                  className="w-full h-10 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
                >
                  I've Completed Payment
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Sheet Modal */}
        {notifsOpen && (
          <div className="absolute inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm p-4 animate-in fade-in text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-sm font-bold text-foreground">Family Alerts & Circulars</h3>
                <p className="text-[10px] text-muted-foreground">Real-time notifications</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={() => setNotifsOpen(false)}
              >
                <X className="size-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-2">
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 space-y-1">
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400">
                  Transport Alert · 07:16 AM
                </span>
                <p className="font-bold text-foreground">Route 03 Delayed by 12 Minutes</p>
                <p className="text-[11px] text-muted-foreground">
                  Traffic roadwork on Russian Blvd. Bus is safely moving toward Santhormok.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-3 space-y-1">
                <span className="text-[10px] font-bold text-primary">Academic · Yesterday</span>
                <p className="font-bold text-foreground">Progress Reports Published</p>
                <p className="text-[11px] text-muted-foreground">
                  Term 2 mid-term report cards are now ready for download in Progress tab.
                </p>
              </div>
            </div>

            <Button
              onClick={() => {
                setUnreadNotifs(0);
                setNotifsOpen(false);
              }}
              className="w-full font-bold text-xs"
            >
              Mark All Read
            </Button>
          </div>
        )}
      </div>
    </MobileDeviceFrame>
  );
}

// Subcomponents
function InvoiceDetail({
  invoice,
  student,
  onDownloadPdf,
  onPayBakong,
}: {
  invoice: Invoice;
  student: Student;
  onDownloadPdf: () => void;
  onPayBakong: () => void;
}) {
  return (
    <div className="space-y-3.5 text-xs">
      <div className="rounded-xl border border-border bg-card p-4 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-muted-foreground">{invoice.invoiceNumber}</span>
          <StatusChip status={invoice.status} size="sm" />
        </div>
        <h3 className="text-base font-bold text-foreground">{invoice.term}</h3>
        <p className="text-[11px] text-muted-foreground">
          Student: {student.fullName} ({student.className})
        </p>
      </div>

      {/* Breakdown */}
      <div className="rounded-xl border border-border bg-card p-3.5 shadow-xs space-y-2">
        <h4 className="font-bold text-foreground uppercase text-[10px] tracking-wider text-muted-foreground">
          Itemized Charges
        </h4>
        <div className="space-y-1.5 text-xs">
          {invoice.items.map((item, idx) => (
            <div key={idx} className="flex justify-between py-1 border-b border-border/50 last:border-0">
              <span className="text-muted-foreground">{item.description}</span>
              <span className="font-bold text-foreground">${item.amount}.00</span>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t flex justify-between text-sm font-extrabold text-foreground">
          <span>Total Amount</span>
          <span>${invoice.totalAmount}.00</span>
        </div>
      </div>

      {invoice.status !== "Paid" && (
        <Button
          onClick={onPayBakong}
          className="h-11 w-full bg-primary hover:bg-primary/90 text-white font-bold text-xs cursor-pointer shadow-md gap-2"
        >
          <QrCode className="size-4" /> Pay with Bakong KHQR / Card
        </Button>
      )}

      <Button
        variant="outline"
        onClick={onDownloadPdf}
        className="h-10 w-full text-xs font-bold gap-2 cursor-pointer"
      >
        <Download className="size-4" /> Download Official Receipt PDF
      </Button>
    </div>
  );
}

function MessageThread({ onSend }: { onSend: () => void }) {
  const [messages, setMessages] = useState<string[]>([
    "Hello! Kosal Meas here. Has Bus 03 cleared the Russian Blvd intersection?",
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, input.trim()]);
    setInput("");
    onSend();
  };

  return (
    <div className="flex flex-col h-[480px]">
      <div className="flex-1 overflow-y-auto space-y-2.5 p-1 text-xs">
        <div className="max-w-[85%] rounded-2xl rounded-tl-xs bg-muted p-3 text-foreground">
          <p className="font-bold text-[10px] text-primary">Transport Coordinator Desk</p>
          <p className="text-xs mt-0.5">
            Good morning Mr. Meas! Yes, Bus 03 is past the flyover and moving smoothly toward Santhormok. ETA at campus is approximately 07:47 AM.
          </p>
          <span className="block text-[9px] text-muted-foreground mt-1">07:22 AM</span>
        </div>

        {messages.map((msg, i) => (
          <div key={i} className="ml-auto max-w-[85%] rounded-2xl rounded-tr-xs bg-primary p-3 text-primary-foreground">
            <p className="text-xs">{msg}</p>
            <span className="block text-[9px] opacity-75 mt-1 text-right">Delivered</span>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Message transport desk..."
          className="flex-1 rounded-xl border border-input bg-card px-3 text-xs focus:outline-primary h-10"
        />
        <Button onClick={handleSend} size="icon" className="size-10 shrink-0">
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
}
