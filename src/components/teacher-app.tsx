import { useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Bell,
  BookOpen,
  Bus,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  FileCheck,
  FilePlus,
  FileSpreadsheet,
  FileText,
  Filter,
  GraduationCap,
  Home,
  MessageSquare,
  Plus,
  Save,
  Search,
  Send,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MobileDeviceFrame } from "@/components/mobile-device-frame";
import { StatusChip } from "@/components/shared/status-chip";
import { LanguageToggle, SupportedLanguage } from "@/components/shared/language-toggle";
import { cn } from "@/lib/utils";
import {
  MOCK_TEACHERS,
  MOCK_STUDENTS,
  MOCK_ANNOUNCEMENTS,
  Student,
} from "@/data/mock-data";

type TeacherTab = "home" | "classes" | "attendance" | "grades" | "news";

interface TeacherClass {
  id: string;
  name: string;
  subject: string;
  time: string;
  room: string;
  studentsCount: number;
  attendanceDone: boolean;
}

const todayClasses: TeacherClass[] = [
  {
    id: "cls-grade-6a",
    name: "Grade 6A · Mathematics & STEM",
    subject: "Fractions, Decimals & Geometry",
    time: "07:30 - 08:20",
    room: "Room 204",
    studentsCount: 28,
    attendanceDone: false,
  },
  {
    id: "cls-grade-7b",
    name: "Grade 7B · Advanced Algebra",
    subject: "Linear Equations & Graphing",
    time: "08:30 - 09:20",
    room: "Room 102",
    studentsCount: 30,
    attendanceDone: true,
  },
  {
    id: "cls-grade-9a",
    name: "3ème / Grade 9 · STEM Robotics",
    subject: "Sensor Logic & Microcontrollers",
    time: "10:30 - 11:20",
    room: "STEM Lab 1",
    studentsCount: 24,
    attendanceDone: false,
  },
];

interface StudentAttendanceRecord {
  id: string;
  name: string;
  grade: string;
  busInfo?: string;
  status: "P" | "A" | "L" | "E";
  score?: number;
  note?: string;
}

const initialStudents: StudentAttendanceRecord[] = [
  {
    id: "stu-dara-meas",
    name: "Dara Meas",
    grade: "Grade 6A",
    busInfo: "Bus 03 (Arrived 07:38 AM)",
    status: "P",
    score: 94,
    note: "Boarded safely at Toul Kork Circle",
  },
  {
    id: "stu-sokha-kim",
    name: "Sokha Kim",
    grade: "Grade 6A",
    busInfo: "Bus 03 (Arrived 07:38 AM)",
    status: "P",
    score: 88,
  },
  {
    id: "stu-vannak-chea",
    name: "Vannak Chea",
    grade: "Grade 6A",
    busInfo: "Bus 03 No-Show (Excused)",
    status: "E",
    score: 82,
    note: "Parent reported illness via Parent App",
  },
  {
    id: "stu-chanthou-rath",
    name: "Chanthou Rath",
    grade: "Grade 6A",
    busInfo: "Bus 03 (Arrived 07:38 AM)",
    status: "P",
    score: 91,
  },
  {
    id: "stu-david-chhay",
    name: "David Chhay",
    grade: "Grade 6A",
    status: "L",
    score: 79,
    note: "Traffic delay on Russian Blvd (+12m)",
  },
  {
    id: "stu-sophie-lim",
    name: "Sophie Lim",
    grade: "Grade 6A",
    status: "P",
    score: 95,
  },
];

export function TeacherApp() {
  const [tab, setTab] = useState<TeacherTab>("home");
  const [lang, setLang] = useState<SupportedLanguage>("en");
  const [selectedClass, setSelectedClass] = useState<TeacherClass>(todayClasses[0]!);
  const [studentsRoster, setStudentsRoster] = useState<StudentAttendanceRecord[]>(initialStudents);
  const [busAutoAccepted, setBusAutoAccepted] = useState(false);
  const [teacherToast, setTeacherToast] = useState("");
  const [notifsOpen, setNotifsOpen] = useState(false);
  const [newHwOpen, setNewHwOpen] = useState(false);
  const [newHwTitle, setNewHwTitle] = useState("");
  const [selectedAssessment, setSelectedAssessment] = useState<string>("Quiz 2: Geometry");

  const showToast = (msg: string) => {
    setTeacherToast(msg);
    setTimeout(() => setTeacherToast(""), 3500);
  };

  const markStatus = (id: string, status: "P" | "A" | "L" | "E") => {
    setStudentsRoster((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  const markAllPresent = () => {
    setStudentsRoster((prev) => prev.map((s) => ({ ...s, status: "P" })));
    showToast("All students marked Present for Homeroom 6A");
  };

  const acceptBusSync = () => {
    setBusAutoAccepted(true);
    setStudentsRoster((prev) =>
      prev.map((s) => {
        if (s.id === "stu-vannak-chea") return { ...s, status: "E" };
        if (s.busInfo?.includes("Arrived")) return { ...s, status: "P" };
        return s;
      }),
    );
    showToast("✓ Auto-synced 3 bus arrivals from Route 03 AM manifest.");
  };

  const saveAttendance = () => {
    showToast("Attendance saved and broadcast to School OS SIS.");
    setTimeout(() => setTab("home"), 1000);
  };

  return (
    <MobileDeviceFrame appName="Teacher App" roleBadge="Teacher">
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-background select-none">
        {/* Toast */}
        {teacherToast && (
          <div className="absolute top-16 inset-x-4 z-50 rounded-xl bg-slate-900 text-white p-3 text-xs font-semibold shadow-2xl border border-white/20 animate-in fade-in slide-in-from-top-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
              <span>{teacherToast}</span>
            </div>
            <button onClick={() => setTeacherToast("")} className="text-white/80 hover:text-white">
              <X className="size-3.5" />
            </button>
          </div>
        )}

        {/* Modern Frosted Header */}
        <header className="shrink-0 border-b border-border/60 bg-card/95 px-4 pb-2.5 pt-3 text-foreground backdrop-blur-xl shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs">
                  CM
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-500 ring-2 ring-card" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  School OS · Faculty Portal
                </p>
                <h1 className="text-sm font-bold leading-tight text-foreground">
                  Mr. Chhay Meng · Grade 6A Lead
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <LanguageToggle
                currentLanguage={lang}
                onLanguageChange={(l) => {
                  setLang(l);
                  showToast(
                    l === "kh"
                      ? "ប្តូរទៅជាភាសាខ្មែរ"
                      : l === "fr"
                      ? "Passé en français"
                      : "Switched to English",
                  );
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setNotifsOpen(true)}
                className="relative size-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
              >
                <Bell className="size-4" />
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-amber-400 ring-2 ring-card" />
              </Button>
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between rounded-xl bg-muted/60 border border-border/60 px-3 py-1.5 text-xs font-semibold text-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span>Today: 3 classes · 82 students</span>
            </span>
            <span className="rounded-full bg-card border border-border/60 px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
              Term 2 · Sep 2026
            </span>
          </div>
        </header>

        {/* Body content */}
        <div className="min-h-0 flex-1 overflow-y-auto bg-background scrollbar-none p-3.5 space-y-3.5">
          {/* ---------------------------------------------------- */}
          {/* TAB 1: HOME                                          */}
          {/* ---------------------------------------------------- */}
          {tab === "home" && (
            <div className="space-y-3.5">
              {/* Smart Homeroom Roll Call Card */}
              <div
                onClick={() => setTab("attendance")}
                className="relative overflow-hidden rounded-2xl border border-blue-500/40 bg-gradient-to-br from-blue-600/10 via-card to-card p-3.5 shadow-xs cursor-pointer hover:border-blue-500 transition-all group"
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-border/40">
                  <div className="flex items-center gap-2">
                    <span className="relative flex size-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex rounded-full size-2 bg-blue-600" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      Homeroom Roll Call Ready · Period 1
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.2 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    ⚡ 3 Bus Arrivals Synced
                  </span>
                </div>

                <div className="mt-2.5 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-foreground group-hover:text-primary transition-colors">
                      Grade 6A Attendance & Roll Call
                    </h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Dara Meas, Sokha Kim & Chanthou Rath pre-verified from Route 03 AM manifest.
                    </p>
                  </div>
                  <div className="grid size-9 place-items-center rounded-xl bg-primary text-white font-bold shadow-xs shrink-0">
                    <FileCheck className="size-5" />
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between pt-1 text-[11px] font-semibold text-primary">
                  <span className="flex items-center gap-1 group-hover:underline">
                    Review & Submit Attendance (24 Present) <ChevronRight className="size-3.5" />
                  </span>
                  <span className="text-[10px] text-muted-foreground font-normal">
                    Due 08:15 AM
                  </span>
                </div>
              </div>

              {/* Today's Schedule */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Today's Teaching Schedule
                  </h3>
                  <Badge variant="outline" className="text-[10px] rounded-full">
                    3 Periods
                  </Badge>
                </div>

                <div className="space-y-2.5">
                  {todayClasses.map((cls, idx) => (
                    <div
                      key={cls.id}
                      onClick={() => {
                        setSelectedClass(cls);
                        setTab("classes");
                      }}
                      className={cn(
                        "rounded-2xl border p-3.5 shadow-xs cursor-pointer transition-all bg-card",
                        idx === 0
                          ? "border-blue-500/50 ring-1 ring-blue-500/30 bg-gradient-to-br from-blue-50/50 dark:from-blue-950/20 to-card"
                          : "border-border/70 hover:border-primary/40",
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-foreground">{cls.name}</h4>
                            {idx === 0 && (
                              <Badge className="bg-primary text-white text-[9px] px-1.5 py-0 rounded-full font-bold">
                                Current
                              </Badge>
                            )}
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {cls.subject} · Room <strong className="text-foreground">{cls.room}</strong>
                          </p>
                        </div>
                        <span className="font-mono text-xs font-bold text-foreground rounded-md bg-muted/60 px-2 py-0.5 border border-border/50">
                          {cls.time}
                        </span>
                      </div>

                      <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-border/50 text-[11px]">
                        <span className="text-muted-foreground font-medium">{cls.studentsCount} Students Enrolled</span>
                        {cls.attendanceDone ? (
                          <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="size-3.5" /> Roll Call Done
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
                            <Clock className="size-3.5" /> Pending Roll Call
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <Button
                  onClick={() => setNewHwOpen(true)}
                  variant="outline"
                  className="h-11 rounded-xl text-xs font-bold gap-2 cursor-pointer border-border/80 hover:border-primary hover:bg-primary/5 transition shadow-xs"
                >
                  <FilePlus className="size-4 text-primary" /> Post Homework
                </Button>
                <Button
                  onClick={() => setTab("grades")}
                  variant="outline"
                  className="h-11 rounded-xl text-xs font-bold gap-2 cursor-pointer border-border/80 hover:border-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/20 transition shadow-xs"
                >
                  <FileSpreadsheet className="size-4 text-sky-600" /> Enter Grades
                </Button>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 2: CLASSES & ROSTERS                             */}
          {/* ---------------------------------------------------- */}
          {tab === "classes" && (
            <div className="space-y-3.5">
              <div className="rounded-xl border border-border bg-card p-3.5 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-foreground">{selectedClass.name}</h3>
                  <Badge variant="secondary" className="text-[10px]">
                    {selectedClass.studentsCount} Students
                  </Badge>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Room: {selectedClass.room} · Daily Schedule: {selectedClass.time}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  Student Roster & Profiles
                </h4>
                <div className="space-y-2">
                  {studentsRoster.map((s) => (
                    <div
                      key={s.id}
                      className="rounded-xl border border-border bg-card p-3 shadow-xs flex items-center justify-between text-xs"
                    >
                      <div>
                        <h5 className="font-bold text-foreground">{s.name}</h5>
                        <p className="text-[10px] text-muted-foreground">
                          {s.busInfo || "Self transport"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-primary">{s.score}%</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => showToast(`Opening profile for ${s.name}...`)}
                          className="h-7 px-2 text-[10px]"
                        >
                          Profile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 3: ATTENDANCE & BUS AUTO-SYNC                    */}
          {/* ---------------------------------------------------- */}
          {tab === "attendance" && (
            <div className="space-y-3.5">
              {/* Transport Suggestion Strip (Prompt 7 requirement!) */}
              <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bus className="size-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-xs font-extrabold text-foreground">
                      Route 03 AM Auto-Sync
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[9px] border-amber-500/30 text-amber-800 dark:text-amber-300"
                  >
                    At Campus Gate 2 (07:38 AM)
                  </Badge>
                </div>

                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  3 bus riders arrived on schedule. Vannak Chea marked excused absence by parent.
                </p>

                <div className="flex gap-2 pt-1">
                  <Button
                    size="sm"
                    onClick={acceptBusSync}
                    disabled={busAutoAccepted}
                    className="h-8 flex-1 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-amber-950 cursor-pointer"
                  >
                    {busAutoAccepted ? "✓ Bus Roll Accepted" : "Accept Bus Auto-Roll"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={markAllPresent}
                    className="h-8 text-xs font-bold cursor-pointer"
                  >
                    All Present
                  </Button>
                </div>
              </div>

              {/* Student Roll Call List */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Student (Grade 6A)</span>
                  <span className="font-mono text-[10px]">P = Present · L = Late · A = Absent · E = Excused</span>
                </div>

                {studentsRoster.map((s) => (
                  <div
                    key={s.id}
                    className="rounded-xl border border-border bg-card p-3 shadow-xs space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-xs text-foreground">{s.name}</h4>
                        {s.busInfo && (
                          <span className="inline-block text-[10px] text-amber-700 dark:text-amber-400 font-semibold">
                            {s.busInfo}
                          </span>
                        )}
                        {s.note && (
                          <p className="text-[10px] text-muted-foreground mt-0.5">{s.note}</p>
                        )}
                      </div>

                      <StatusChip
                        status={
                          s.status === "P"
                            ? "present"
                            : s.status === "A"
                            ? "absent"
                            : s.status === "L"
                            ? "late"
                            : "excused"
                        }
                        size="sm"
                      />
                    </div>

                    {/* Quick 4-Way Status Toggle */}
                    <div className="grid grid-cols-4 gap-1.5 pt-1 border-t border-border/60">
                      {[
                        { key: "P", label: "Present", color: "bg-emerald-600 text-white" },
                        { key: "L", label: "Late", color: "bg-amber-500 text-amber-950 font-bold" },
                        { key: "A", label: "Absent", color: "bg-rose-600 text-white" },
                        { key: "E", label: "Excused", color: "bg-blue-600 text-white" },
                      ].map((st) => (
                        <button
                          key={st.key}
                          onClick={() => markStatus(s.id, st.key as any)}
                          className={cn(
                            "rounded-lg py-1 text-xs font-bold border transition cursor-pointer text-center",
                            s.status === st.key
                              ? st.color
                              : "border-border bg-muted/40 text-muted-foreground hover:bg-muted",
                          )}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={saveAttendance}
                className="h-11 w-full bg-primary text-white font-bold text-xs shadow-md cursor-pointer gap-1.5"
              >
                <Save className="size-4" /> Save Homeroom Attendance
              </Button>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 4: GRADES                                        */}
          {/* ---------------------------------------------------- */}
          {tab === "grades" && (
            <div className="space-y-3.5">
              <div className="rounded-xl border border-border bg-card p-3 shadow-xs space-y-2">
                <label className="text-[11px] font-bold text-muted-foreground uppercase">
                  Select Assessment
                </label>
                <select
                  value={selectedAssessment}
                  onChange={(e) => setSelectedAssessment(e.target.value)}
                  className="w-full h-9 text-xs rounded-lg border border-input bg-background px-3 font-semibold"
                >
                  <option>Quiz 2: Geometry & Angles</option>
                  <option>Mid-Term Exam: Mathematics 6</option>
                  <option>Weekly Homework Portfolio</option>
                </select>
              </div>

              <div className="space-y-2">
                {studentsRoster.map((s) => (
                  <div
                    key={s.id}
                    className="rounded-xl border border-border bg-card p-3 shadow-xs flex items-center justify-between text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-foreground">{s.name}</h4>
                      <p className="text-[10px] text-muted-foreground">Grade 6A</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        defaultValue={s.score || 85}
                        className="w-16 h-8 text-center text-xs font-bold rounded border border-input bg-background"
                      />
                      <span className="text-muted-foreground font-bold">/ 100</span>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => showToast("Grades recorded and posted to Parent Portals.")}
                className="h-11 w-full bg-primary text-white font-bold text-xs cursor-pointer shadow-md"
              >
                Save & Publish Assessment Scores
              </Button>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 5: NEWS & NOTICES                                */}
          {/* ---------------------------------------------------- */}
          {tab === "news" && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  School Bulletins
                </h3>
                <Button
                  size="sm"
                  onClick={() => setNewHwOpen(true)}
                  className="h-7 text-[11px] font-bold bg-primary text-white cursor-pointer"
                >
                  Post Notice
                </Button>
              </div>

              <div className="space-y-2.5">
                {MOCK_ANNOUNCEMENTS.map((ann) => (
                  <div
                    key={ann.id}
                    className="rounded-xl border border-border bg-card p-3.5 shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-[9px]">
                        {ann.category}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {ann.publishedAt}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-foreground">{ann.title}</h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {ann.content}
                    </p>
                    <p className="text-[10px] text-primary font-semibold pt-1 border-t border-border/50">
                      Audience: {ann.audience} · {ann.readRate}% Read Rate
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <nav className="shrink-0 border-t border-border bg-card px-2 py-1.5 shadow-lg">
          <div className="grid grid-cols-5 gap-1">
            {[
              { id: "home", label: "Home", icon: Home },
              { id: "classes", label: "Classes", icon: Users },
              { id: "attendance", label: "Attendance", icon: FileCheck },
              { id: "grades", label: "Grades", icon: FileSpreadsheet },
              { id: "news", label: "News", icon: MessageSquare },
            ].map((item) => {
              const Icon = item.icon;
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id as TeacherTab)}
                  className={cn(
                    "flex flex-col items-center justify-center rounded-xl py-1 text-[10px] font-bold transition cursor-pointer",
                    active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className={cn("size-4.5", active && "stroke-[2.5px]")} />
                  <span className="mt-0.5">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Modal: Post Homework / Notice */}
        {newHwOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
            <div className="w-full max-w-[310px] rounded-2xl border border-border bg-card p-4 shadow-2xl text-left text-xs space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-bold text-sm text-foreground">Post Class Assignment</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6"
                  onClick={() => setNewHwOpen(false)}
                >
                  <X className="size-3.5" />
                </Button>
              </div>

              <div>
                <label className="text-[10px] font-bold text-muted-foreground uppercase">
                  Assignment Title *
                </label>
                <Input
                  value={newHwTitle}
                  onChange={(e) => setNewHwTitle(e.target.value)}
                  placeholder="e.g. Geometry Angles Exercise Page 42"
                  className="h-9 text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-muted-foreground uppercase">
                  Due Date
                </label>
                <Input type="date" defaultValue="2026-09-24" className="h-9 text-xs mt-1" />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setNewHwOpen(false)}
                  className="flex-1 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setNewHwOpen(false);
                    showToast(`Assignment "${newHwTitle || "Geometry Exercise"}" published.`);
                  }}
                  className="flex-1 text-xs font-bold bg-primary text-white"
                >
                  Publish
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileDeviceFrame>
  );
}
