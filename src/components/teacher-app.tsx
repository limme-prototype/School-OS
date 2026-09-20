import { useState, type ReactNode } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Bell,
  BookOpen,
  Bus,
  Calendar,
  Check,
  CheckCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Edit3,
  FileCheck,
  FilePlus,
  FileSpreadsheet,
  FileText,
  Filter,
  GraduationCap,
  Home,
  MessageSquare,
  Phone,
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
import { cn } from "@/lib/utils";

type TeacherTab = "home" | "classes" | "attendance" | "grades" | "news";

interface TeacherClass {
  id: string;
  name: string;
  khmer: string;
  subject: string;
  time: string;
  room: string;
  studentsCount: number;
  attendanceDone: boolean;
}

const todayClasses: TeacherClass[] = [
  {
    id: "G8A-MATH",
    name: "Grade 8A · Mathematics",
    khmer: "ថ្នាក់ទី ៨A · គណិតវិទ្យា",
    subject: "Algebra & Linear Equations",
    time: "07:30 - 08:20",
    room: "Room 204",
    studentsCount: 32,
    attendanceDone: true,
  },
  {
    id: "G7B-MATH",
    name: "Grade 7B · Mathematics",
    khmer: "ថ្នាក់ទី ៧B · គណិតវិទ្យា",
    subject: "Fractions & Decimals",
    time: "08:25 - 09:15",
    room: "Room 102",
    studentsCount: 28,
    attendanceDone: false,
  },
  {
    id: "G9A-MATH",
    name: "Grade 9A · Advanced Geometry",
    khmer: "ថ្នាក់ទី ៩A · ធរណីមាត្រកម្រិតខ្ពស់",
    subject: "Pythagorean Theorem",
    time: "10:30 - 11:20",
    room: "Room 206",
    studentsCount: 30,
    attendanceDone: false,
  },
];

interface StudentAttendance {
  id: string;
  name: string;
  khmer: string;
  busInfo?: string;
  status: "P" | "A" | "L";
  score?: number;
  note?: string;
}

const initialStudents: StudentAttendance[] = [
  { id: "S01", name: "Dara Sok", khmer: "សុខ ដារា", busInfo: "Bus B-12 (Arrived 7:38 AM)", status: "P", score: 92 },
  { id: "S02", name: "Sreyneang Lim", khmer: "លឹម ស្រីនាង", busInfo: "Bus B-12 (Arrived 7:38 AM)", status: "P", score: 88 },
  { id: "S03", name: "Vannak Chea", khmer: "ជា វណ្ណៈ", busInfo: "Bus B-03 (Arrived 7:42 AM)", status: "P", score: 79 },
  { id: "S04", name: "Bopha Heng", khmer: "ហេង បុប្ផា", status: "P", score: 95 },
  { id: "S05", name: "Makara Pen", khmer: "ប៉ែន មករា", status: "L", score: 81, note: "Traffic on Russian Blvd" },
  { id: "S06", name: "Chanthy Sam", khmer: "សំ ចន្ធី", status: "A", score: 70, note: "Medical leave - Parent notified" },
  { id: "S07", name: "Rithy Kao", khmer: "កៅ រិទ្ធី", busInfo: "Bus B-07 (Arrived 7:35 AM)", status: "P", score: 86 },
  { id: "S08", name: "Sopheap Ouk", khmer: "អ៊ុក សុភាព", status: "P", score: 90 },
];

export function TeacherApp() {
  const [tab, setTab] = useState<TeacherTab>("home");
  const [selectedClass, setSelectedClass] = useState<TeacherClass>(todayClasses[1]!);
  const [studentsRoster, setStudentsRoster] = useState<StudentAttendance[]>(initialStudents);
  const [classDetailView, setClassDetailView] = useState(false);
  const [createHwOpen, setCreateHwOpen] = useState(false);
  const [newHwTitle, setNewHwTitle] = useState("");
  const [gradeSavedToast, setGradeSavedToast] = useState(false);
  const [attendanceSavedToast, setAttendanceSavedToast] = useState(false);
  const [notifsOpen, setNotifsOpen] = useState(false);
  const [unreadNotifs, setUnreadNotifs] = useState(3);
  const [attendanceFilter, setAttendanceFilter] = useState<"ALL" | "P" | "L" | "A">("ALL");
  const [selectedStudentForNote, setSelectedStudentForNote] = useState<StudentAttendance | null>(null);
  const [studentNoteText, setStudentNoteText] = useState("");
  const [exportToast, setExportToast] = useState<string | null>(null);
  const [selectedAssessment, setSelectedAssessment] = useState<"Quiz 1" | "Mid-Term Exam" | "Homework Total">("Quiz 1");

  const [newPostOpen, setNewPostOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [hwPostedToast, setHwPostedToast] = useState(false);
  const [notices, setNotices] = useState([
    {
      title: "Mid-Term Exam Topics Released",
      kh: "ប្រធានបទប្រឡងឆមាស",
      target: "Grade 8A & 7B",
      date: "Yesterday · 3:30 PM",
      body: "Chapters 1 through 4 will be covered on the exam next Friday. Please bring protractors.",
    },
    {
      title: "Parent-Teacher Consultation Schedule",
      kh: "កាលវិភាគជួបមាតាបិតា",
      target: "All Classes",
      date: "18 Sep",
      body: "Meeting slots will open on Monday for individual 15-minute academic reviews.",
    },
  ]);

  const markStatus = (id: string, status: "P" | "A" | "L") => {
    setStudentsRoster((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  const markAllPresent = () => {
    setStudentsRoster((prev) => prev.map((s) => ({ ...s, status: "P" })));
  };

  const updateScore = (id: string, score: number) => {
    setStudentsRoster((prev) => prev.map((s) => (s.id === id ? { ...s, score } : s)));
  };

  const handleSaveAttendance = () => {
    setAttendanceSavedToast(true);
    setTimeout(() => {
      setAttendanceSavedToast(false);
      setTab("home");
    }, 1200);
  };

  const handleSaveGrades = () => {
    setGradeSavedToast(true);
    setTimeout(() => setGradeSavedToast(false), 1500);
  };

  const handleCreatePost = () => {
    if (!postTitle.trim()) return;
    setNotices((prev) => [
      {
        title: postTitle.trim(),
        kh: "សេចក្តីជូនដំណឹងថ្មី",
        target: selectedClass.name,
        date: "Just now",
        body: postBody.trim() || "Important update for all students and guardians.",
      },
      ...prev,
    ]);
    setPostTitle("");
    setPostBody("");
    setNewPostOpen(false);
  };

  return (
    <MobileDeviceFrame appName="Teacher App" roleBadge="Teacher">
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-background">
        {/* Header */}
        <header className="shrink-0 bg-primary px-4 pb-3 pt-2 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-full bg-white/20 text-white font-bold text-xs">
                TC
              </div>
              <div>
                <p className="text-[10px] font-medium text-primary-foreground/75">School OS</p>
                <h1 className="text-sm font-bold leading-tight">Mr. Sovann · Mathematics</h1>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="header"
                size="icon"
                className="size-8 text-white hover:bg-white/10 relative cursor-pointer"
                onClick={() => setNotifsOpen(true)}
              >
                <Bell className="size-4" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1 right-1 size-2 rounded-full bg-destructive ring-1 ring-white" />
                )}
              </Button>
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between rounded-lg bg-white/15 px-3 py-1.5 text-[11px]">
            <span className="font-semibold">Today: 3 classes · 88 students</span>
            <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-bold">Term 1</span>
          </div>
        </header>

        {/* Scrollable View Area */}
        <div className="min-h-0 flex-1 overflow-y-auto bg-background scrollbar-none">
          <div className="animate-screen px-3.5 py-3">
            {/* 1. HOME SCREEN */}
            {tab === "home" && (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold">Today’s Schedule · ថ្ងៃនេះ</h2>
                    <p className="text-[10px] text-muted-foreground">Sunday, 20 September 2026</p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    3 Periods
                  </Badge>
                </div>

                <div className="space-y-2.5">
                  {todayClasses.map((cls, idx) => (
                    <div
                      key={cls.id}
                      className={cn(
                        "rounded-xl border p-3 shadow-xs transition bg-card",
                        idx === 1 ? "border-primary/60 ring-1 ring-primary/40" : "border-border"
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-foreground">{cls.name}</span>
                            {idx === 1 && (
                              <span className="rounded bg-amber-500/20 px-1.5 py-0.2 text-[9px] font-bold text-amber-600">
                                NEXT
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-muted-foreground">{cls.khmer}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] font-semibold text-primary">{cls.time}</span>
                          <p className="text-[9px] text-muted-foreground">{cls.room}</p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-border/70 pt-2.5">
                        <span className="text-[11px] text-muted-foreground">
                          {cls.studentsCount} Students registered
                        </span>
                        <div className="flex gap-1.5">
                          <Button
                            variant={cls.attendanceDone ? "outline" : "default"}
                            size="sm"
                            className="h-7 px-2.5 text-[11px] cursor-pointer"
                            onClick={() => {
                              setSelectedClass(cls);
                              setTab("attendance");
                            }}
                          >
                            {cls.attendanceDone ? (
                              <>
                                <Check className="size-3 text-success mr-1" /> Attendance Done
                              </>
                            ) : (
                              "Take Attendance"
                            )}
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="h-7 px-2.5 text-[11px] cursor-pointer"
                            onClick={() => {
                              setSelectedClass(cls);
                              setTab("classes");
                              setClassDetailView(true);
                            }}
                          >
                            Class Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Action Button */}
                <div className="pt-1">
                  <Button
                    variant="outline"
                    className="w-full h-10 gap-2 border-dashed border-primary/40 text-primary hover:bg-primary/5 text-xs font-semibold cursor-pointer"
                    onClick={() => setCreateHwOpen(true)}
                  >
                    <Plus className="size-4" /> Post New Homework Assignment
                  </Button>
                </div>
              </div>
            )}

            {/* 2. CLASSES & CLASS DETAIL SCREEN */}
            {tab === "classes" && (
              classDetailView ? (
                <div className="space-y-3 animate-screen">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 cursor-pointer"
                      onClick={() => setClassDetailView(false)}
                    >
                      <ArrowLeft className="size-4" />
                    </Button>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-sm font-bold truncate">{selectedClass.name}</h2>
                      <p className="text-[10px] text-muted-foreground">{selectedClass.room} · {selectedClass.time}</p>
                    </div>
                    <Button
                      size="sm"
                      className="h-7 text-[11px] gap-1 cursor-pointer"
                      onClick={() => setCreateHwOpen(true)}
                    >
                      <Plus className="size-3.5" /> Task
                    </Button>
                  </div>

                  {/* Overview Cards */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-xl border bg-card p-2.5 shadow-xs">
                      <p className="text-[10px] text-muted-foreground font-medium">Curriculum Progress</p>
                      <p className="text-xs font-bold text-primary mt-0.5">Unit 4: Linear Eq</p>
                      <div className="w-full bg-muted rounded-full h-1.5 mt-1.5 overflow-hidden">
                        <div className="bg-primary h-full w-[65%]" />
                      </div>
                    </div>
                    <div className="rounded-xl border bg-card p-2.5 shadow-xs">
                      <p className="text-[10px] text-muted-foreground font-medium">Attendance Rate</p>
                      <p className="text-xs font-bold text-success mt-0.5">94.8% Standing</p>
                      <p className="text-[9px] text-muted-foreground mt-0.5">{selectedClass.studentsCount} enrolled</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-8 text-xs cursor-pointer border-border hover:border-primary"
                      onClick={() => setTab("attendance")}
                    >
                      <CheckCircle2 className="size-3.5 mr-1 text-success" /> Roll Call
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-8 text-xs cursor-pointer border-border hover:border-primary"
                      onClick={() => setTab("grades")}
                    >
                      <FileText className="size-3.5 mr-1 text-primary" /> Enter Grades
                    </Button>
                  </div>

                  {/* Full Class Roster */}
                  <div className="rounded-xl border bg-card p-3 shadow-xs">
                    <h4 className="text-xs font-bold mb-2">Student Enrolled Roster ({studentsRoster.length})</h4>
                    <div className="divide-y divide-border text-xs">
                      {studentsRoster.map((student) => (
                        <div key={student.id} className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-2">
                            <div className="grid size-7 place-items-center rounded-full bg-secondary text-[11px] font-bold text-primary">
                              {student.name[0]}
                            </div>
                            <div>
                              <p className="font-semibold text-xs leading-tight">{student.name}</p>
                              <p className="text-[10px] text-muted-foreground">{student.khmer}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "rounded-full px-2 py-0.5 text-[9px] font-bold",
                                student.status === "P"
                                  ? "bg-success-soft text-success"
                                  : student.status === "L"
                                  ? "bg-warning-soft text-warning-strong"
                                  : "bg-danger-soft text-danger"
                              )}
                            >
                              {student.status === "P" ? "Present" : student.status === "L" ? "Late" : "Absent"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold">My Classes · បញ្ជីថ្នាក់</h2>
                      <p className="text-[10px] text-muted-foreground">Tap any class to view roster & syllabus</p>
                    </div>
                    <Button
                      size="sm"
                      className="h-7 text-[11px] gap-1 cursor-pointer"
                      onClick={() => setCreateHwOpen(true)}
                    >
                      <FilePlus className="size-3.5" /> New Task
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {todayClasses.map((cls) => (
                      <div
                        key={cls.id}
                        onClick={() => {
                          setSelectedClass(cls);
                          setClassDetailView(true);
                        }}
                        className={cn(
                          "rounded-xl border bg-card p-3 shadow-xs cursor-pointer transition hover:border-primary",
                          selectedClass.id === cls.id && "border-primary"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xs font-bold">{cls.name}</h3>
                            <p className="text-[10px] text-muted-foreground">{cls.khmer}</p>
                          </div>
                          <ChevronRight className="size-4 text-muted-foreground" />
                        </div>
                        <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground border-t border-border/50 pt-1.5">
                          <span>{cls.subject}</span>
                          <span className="font-semibold text-primary">{cls.studentsCount} Students</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Class roster preview */}
                  <div className="rounded-xl border bg-card p-3 shadow-xs mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-bold">Class Roster · {selectedClass.name}</h4>
                      <Button
                        variant="link"
                        size="sm"
                        className="h-6 p-0 text-xs cursor-pointer"
                        onClick={() => setTab("attendance")}
                      >
                        Take Attendance →
                      </Button>
                    </div>
                    <div className="divide-y divide-border text-xs">
                      {studentsRoster.slice(0, 5).map((student) => (
                        <div key={student.id} className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-2">
                            <div className="grid size-7 place-items-center rounded-full bg-secondary text-[11px] font-bold text-primary">
                              {student.name[0]}
                            </div>
                            <div>
                              <p className="font-semibold text-xs leading-tight">{student.name}</p>
                              <p className="text-[10px] text-muted-foreground">{student.khmer}</p>
                            </div>
                          </div>
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-[9px] font-bold",
                              student.status === "P"
                                ? "bg-success-soft text-success"
                                : student.status === "L"
                                ? "bg-warning-soft text-warning-strong"
                                : "bg-danger-soft text-danger"
                            )}
                          >
                            {student.status === "P" ? "Present" : student.status === "L" ? "Late" : "Absent"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}

            {/* 3. FAST ATTENDANCE SCREEN */}
            {tab === "attendance" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold">Fast Attendance · វត្តមាន</h2>
                    <p className="text-[10px] text-muted-foreground">{selectedClass.name}</p>
                  </div>
                  <Button variant="outline" size="sm" className="h-7 text-[11px] cursor-pointer" onClick={markAllPresent}>
                    Mark All Present
                  </Button>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  {(["ALL", "P", "L", "A"] as const).map((filter) => {
                    const count =
                      filter === "ALL"
                        ? studentsRoster.length
                        : studentsRoster.filter((s) => s.status === filter).length;
                    const label =
                      filter === "ALL"
                        ? `All (${count})`
                        : filter === "P"
                        ? `Present (${count})`
                        : filter === "L"
                        ? `Late (${count})`
                        : `Absent (${count})`;
                    const active = attendanceFilter === filter;
                    return (
                      <button
                        key={filter}
                        onClick={() => setAttendanceFilter(filter)}
                        className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-bold transition cursor-pointer shrink-0",
                          active
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : "bg-muted text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

                {/* Bus drop suggestion strip */}
                <div className="flex items-center gap-2 rounded-lg border border-bus-border bg-bus-soft p-2 text-[11px]">
                  <Bus className="size-4 text-bus shrink-0" />
                  <span className="flex-1 text-muted-foreground">
                    <strong className="text-foreground">Bus integration:</strong> 3 riders arrived on Bus B-12
                  </span>
                  <Badge variant="outline" className="bg-white text-[9px] font-bold text-bus-foreground">
                    Auto-synced
                  </Badge>
                </div>

                {/* Student list with status toggles */}
                <div className="space-y-2">
                  {studentsRoster
                    .filter((s) => attendanceFilter === "ALL" || s.status === attendanceFilter)
                    .map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between rounded-lg border bg-card p-2.5 shadow-xs"
                      >
                        <button
                          onClick={() => setSelectedStudentForNote(student)}
                          className="min-w-0 flex-1 text-left cursor-pointer hover:opacity-80"
                        >
                          <div className="flex items-center gap-1.5">
                            <p className="text-xs font-bold text-foreground truncate">{student.name}</p>
                            {student.note && (
                              <span className="rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 px-1 text-[9px] font-semibold">
                                Note
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-muted-foreground">{student.khmer}</p>
                          {student.busInfo && (
                            <span className="mt-0.5 inline-flex items-center gap-1 text-[9px] font-medium text-amber-700 dark:text-amber-300">
                              <Bus className="size-2.5" /> {student.busInfo}
                            </span>
                          )}
                          {student.note && (
                            <p className="text-[9px] text-muted-foreground italic mt-0.5 truncate">
                              "{student.note}"
                            </p>
                          )}
                        </button>

                        {/* P / A / L Segmented Buttons */}
                        <div className="flex gap-1 shrink-0 ml-2">
                          {(["P", "L", "A"] as const).map((code) => {
                            const active = student.status === code;
                            return (
                              <button
                                key={code}
                                onClick={() => markStatus(student.id, code)}
                                className={cn(
                                  "grid size-8 place-items-center rounded-md text-xs font-bold transition cursor-pointer",
                                  active && code === "P" && "bg-success text-white shadow-xs",
                                  active && code === "L" && "bg-warning text-warning-foreground shadow-xs",
                                  active && code === "A" && "bg-destructive text-white shadow-xs",
                                  !active && "bg-muted text-muted-foreground hover:bg-muted/80"
                                )}
                              >
                                {code}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                </div>

                <div className="pt-2">
                  {attendanceSavedToast ? (
                    <div className="flex items-center justify-center gap-2 rounded-lg bg-success-soft py-2.5 text-xs font-bold text-success">
                      <Check className="size-4" /> Attendance saved and submitted to Admin!
                    </div>
                  ) : (
                    <Button className="w-full h-10 text-xs font-bold cursor-pointer" onClick={handleSaveAttendance}>
                      <Save className="size-4 mr-1.5" /> Submit Attendance (
                      {studentsRoster.filter((s) => s.status === "P").length} Present)
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* 4. GRADES / GRADEBOOK SCREEN */}
            {tab === "grades" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold">Gradebook · តារាងពិន្ទុ</h2>
                    <p className="text-[10px] text-muted-foreground">{selectedClass.name}</p>
                  </div>
                  <div className="flex gap-1.5">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-[11px] gap-1 cursor-pointer"
                      onClick={() => {
                        setExportToast(`Exported ${selectedClass.name} scores as MoEYS XLSX format`);
                        setTimeout(() => setExportToast(null), 3000);
                      }}
                    >
                      <Download className="size-3" /> Export
                    </Button>
                    <Button size="sm" className="h-7 text-[11px] gap-1 cursor-pointer" onClick={handleSaveGrades}>
                      <Save className="size-3.5" /> Save
                    </Button>
                  </div>
                </div>

                {/* Assessment Type Selector */}
                <div className="flex gap-1 p-1 bg-muted/60 rounded-lg">
                  {(["Quiz 1", "Mid-Term Exam", "Homework Total"] as const).map((asmt) => (
                    <button
                      key={asmt}
                      onClick={() => setSelectedAssessment(asmt)}
                      className={cn(
                        "flex-1 py-1 text-center text-[10px] font-bold rounded transition cursor-pointer",
                        selectedAssessment === asmt
                          ? "bg-card text-primary shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {asmt}
                    </button>
                  ))}
                </div>

                {gradeSavedToast && (
                  <div className="rounded-md bg-success-soft p-2 text-center text-xs font-bold text-success">
                    <Check className="size-3.5 inline mr-1" /> Scores recorded to database
                  </div>
                )}

                {exportToast && (
                  <div className="rounded-md bg-primary-soft p-2 text-center text-xs font-bold text-primary">
                    <FileSpreadsheet className="size-3.5 inline mr-1" /> {exportToast}
                  </div>
                )}

                <div className="rounded-xl border bg-card shadow-xs overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-muted/60 text-left text-[10px] uppercase font-bold text-muted-foreground border-b">
                      <tr>
                        <th className="p-2.5">Student</th>
                        <th className="p-2.5 text-center">Max 100</th>
                        <th className="p-2.5 text-right">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {studentsRoster.map((student) => (
                        <tr key={student.id} className="hover:bg-muted/40">
                          <td className="p-2.5 font-medium">
                            <p className="text-xs font-bold leading-tight">{student.name}</p>
                            <p className="text-[10px] text-muted-foreground">{student.khmer}</p>
                          </td>
                          <td className="p-2.5 text-center">
                            <input
                              type="number"
                              defaultValue={student.score ?? 85}
                              onChange={(e) => updateScore(student.id, parseInt(e.target.value) || 0)}
                              className="w-14 rounded border border-input bg-background p-1 text-center text-xs font-bold focus:outline-primary"
                            />
                          </td>
                          <td className="p-2.5 text-right">
                            <span className="font-bold text-primary">
                              {(student.score ?? 85) >= 90
                                ? "A"
                                : (student.score ?? 85) >= 80
                                ? "B"
                                : (student.score ?? 85) >= 70
                                ? "C"
                                : "D"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 5. NEWS / ANNOUNCEMENTS SCREEN */}
            {tab === "news" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold">Class Notices · ដំណឹង</h2>
                    <p className="text-[10px] text-muted-foreground">Broadcast to parents and students</p>
                  </div>
                  <Button size="sm" className="h-7 text-[11px] gap-1" onClick={() => setNewPostOpen(true)}>
                    <Plus className="size-3.5" /> New Post
                  </Button>
                </div>

                <div className="space-y-2.5">
                  {notices.map((notice) => (
                    <div key={notice.title} className="rounded-xl border bg-card p-3 shadow-xs">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xs font-bold">{notice.title}</h3>
                          <p className="text-[10px] text-muted-foreground">{notice.kh}</p>
                        </div>
                        <span className="rounded bg-secondary px-1.5 py-0.5 text-[9px] font-bold text-muted-foreground">
                          {notice.target}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-foreground/80">{notice.body}</p>
                      <p className="mt-2 text-[10px] text-muted-foreground">{notice.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Create Homework Modal */}
        {createHwOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 p-2 sm:p-4 animate-screen">
            <div className="rounded-2xl border border-border bg-card p-4 shadow-2xl max-w-[360px] mx-auto w-full">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-foreground">Create Homework</h3>
                  <p className="text-xs text-muted-foreground">Assign to {selectedClass.name}</p>
                </div>
                <Button variant="ghost" size="icon" className="size-7" onClick={() => setCreateHwOpen(false)}>
                  <X className="size-4" />
                </Button>
              </div>

              <div className="mt-3 space-y-2.5">
                <div>
                  <label className="text-[11px] font-bold text-foreground">Assignment Title *</label>
                  <Input
                    placeholder="e.g. Chapter 5 Exercises..."
                    className="h-8 text-xs mt-1"
                    value={newHwTitle}
                    onChange={(e) => setNewHwTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-foreground">Due Date</label>
                  <Input defaultValue="Tomorrow, 5:00 PM" className="h-8 text-xs mt-1" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-foreground">Instructions</label>
                  <textarea
                    placeholder="Provide details for students..."
                    className="w-full rounded-md border border-input bg-background p-2 text-xs focus:outline-primary min-h-[60px]"
                  />
                </div>
              </div>

              <Button
                className="mt-3 w-full h-9 text-xs"
                onClick={() => {
                  setCreateHwOpen(false);
                  setHwPostedToast(true);
                  setTimeout(() => setHwPostedToast(false), 2000);
                  setTab("home");
                }}
              >
                Post Assignment to Class
              </Button>
            </div>
          </div>
        )}

        {/* New Post Announcement Modal */}
        {newPostOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 p-2 sm:p-4 animate-screen">
            <div className="rounded-2xl border border-border bg-card p-4 shadow-2xl max-w-[360px] mx-auto w-full">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-foreground">Post Class Notice</h3>
                  <p className="text-xs text-muted-foreground">Broadcast to parents & students</p>
                </div>
                <Button variant="ghost" size="icon" className="size-7" onClick={() => setNewPostOpen(false)}>
                  <X className="size-4" />
                </Button>
              </div>

              <div className="mt-3 space-y-2.5">
                <div>
                  <label className="text-[11px] font-bold text-foreground">Notice Title *</label>
                  <Input
                    placeholder="e.g. Science Fair Preparation..."
                    className="h-8 text-xs mt-1"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-foreground">Message Body *</label>
                  <textarea
                    placeholder="Write announcement details..."
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                    className="w-full rounded-md border border-input bg-background p-2 text-xs focus:outline-primary min-h-[70px]"
                  />
                </div>
              </div>

              <Button
                className="mt-3 w-full h-9 text-xs"
                disabled={!postTitle.trim()}
                onClick={handleCreatePost}
              >
                Broadcast Announcement
              </Button>
            </div>
          </div>
        )}

        {/* Toast for homework created */}
        {hwPostedToast && (
          <div className="absolute top-16 inset-x-4 z-40 rounded-lg bg-success text-white p-2.5 text-center text-xs font-semibold shadow-lg animate-in fade-in slide-in-from-top-2">
            ✓ New assignment posted to {selectedClass.name}!
          </div>
        )}

        {/* Notifications Sheet Modal */}
        {notifsOpen && (
          <div className="absolute inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-sm font-bold text-foreground">Teacher Alerts · ការជូនដំណឹង</h3>
                <p className="text-[10px] text-muted-foreground">Class announcements & student arrival alerts</p>
              </div>
              <Button variant="ghost" size="icon" className="size-7 cursor-pointer" onClick={() => setNotifsOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>

            <div className="mt-3 space-y-2.5 flex-1 overflow-y-auto text-xs">
              <div className="rounded-lg border border-border p-3 bg-card shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">Morning Bus B-12 Arrived</span>
                  <span className="text-[10px] text-primary font-medium">07:38 AM</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Dara Sok and Sreyneang Lim checked in from Tuol Kork route.
                </p>
              </div>
              <div className="rounded-lg border border-border p-3 bg-card shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">Parent Leave Notice</span>
                  <span className="text-[10px] text-warning-strong font-medium">07:15 AM</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Parent of Chanthy Sam submitted medical leave note for today.
                </p>
              </div>
              <div className="rounded-lg border border-border p-3 bg-card shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">MoEYS Term 1 Deadline</span>
                  <span className="text-[10px] text-muted-foreground">Yesterday</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Academic administration requires quiz & midterm submissions by Friday 25 Sep.
                </p>
              </div>
            </div>

            <div className="mt-auto pt-3 border-t">
              <Button
                variant="outline"
                className="w-full text-xs h-9 cursor-pointer"
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

        {/* Student Attendance Note Dialog */}
        {selectedStudentForNote && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
            <div className="w-full max-w-[310px] rounded-2xl border border-border bg-card p-4 shadow-2xl text-left text-xs">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h3 className="font-bold text-foreground text-sm">Attendance Note</h3>
                  <p className="text-[10px] text-muted-foreground">
                    {selectedStudentForNote.name} · {selectedStudentForNote.khmer}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="size-6 cursor-pointer" onClick={() => setSelectedStudentForNote(null)}>
                  <X className="size-3.5" />
                </Button>
              </div>
              <div className="mt-3 space-y-2">
                <label className="text-[11px] font-semibold text-foreground">Note / Excuse Reason</label>
                <textarea
                  defaultValue={selectedStudentForNote.note || (selectedStudentForNote.status === "A" ? "Medical leave reported by parent." : "")}
                  placeholder="e.g. Excused for medical appointment..."
                  className="w-full rounded-md border border-input bg-background p-2 text-xs focus:outline-primary min-h-[60px]"
                  onChange={(e) => setStudentNoteText(e.target.value)}
                />
              </div>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 text-xs cursor-pointer" onClick={() => setSelectedStudentForNote(null)}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="flex-1 text-xs cursor-pointer"
                  onClick={() => {
                    const note = studentNoteText || selectedStudentForNote.note || "Excused note recorded";
                    setStudentsRoster((prev) =>
                      prev.map((s) => (s.id === selectedStudentForNote.id ? { ...s, note } : s))
                    );
                    setSelectedStudentForNote(null);
                    setAttendanceSavedToast(true);
                    setTimeout(() => setAttendanceSavedToast(false), 1500);
                  }}
                >
                  Save Note
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Tab Bar */}
        <nav className="grid h-14 shrink-0 grid-cols-5 border-t bg-card px-1 pb-1 shadow-sm" aria-label="Teacher Navigation">
          {[
            { id: "home", label: "Today", kh: "ថ្ងៃនេះ", icon: Home },
            { id: "classes", label: "Classes", kh: "ថ្នាក់", icon: BookOpen },
            { id: "attendance", label: "Roll Call", kh: "វត្តមាន", icon: CheckCircle2 },
            { id: "grades", label: "Grades", kh: "ពិន្ទុ", icon: FileText },
            { id: "news", label: "News", kh: "ដំណឹង", icon: MessageSquare },
          ].map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id as TeacherTab)}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 h-full min-w-0 transition-colors cursor-pointer",
                  active ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn("size-4.5", active && "stroke-[2.5]")} />
                <span className="text-[10px] font-semibold leading-none">{item.label}</span>
                <span className="text-[8px] leading-none opacity-70">{item.kh}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </MobileDeviceFrame>
  );
}
