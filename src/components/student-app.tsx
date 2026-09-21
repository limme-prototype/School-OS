import { useState, type ReactNode } from "react";
import {
  ArrowLeft,
  Bell,
  BookOpen,
  Bus,
  CalendarDays,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  Clock3,
  FileText,
  GraduationCap,
  Home,
  Languages,
  MapPin,
  MoreHorizontal,
  Phone,
  QrCode,
  Settings,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  UserRound,
  Wifi,
  WifiOff,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { MobileDeviceFrame } from "@/components/mobile-device-frame";
import { LanguageToggle, SupportedLanguage } from "@/components/shared/language-toggle";
import { cn } from "@/lib/utils";

type Tab = "home" | "classes" | "homework" | "results" | "more";
type Detail = "class" | "homework" | "bus" | "profile" | "settings" | null;

export interface ScheduleItem {
  id: string;
  time: string;
  subject: string;
  kh: string;
  room: string;
  color: string;
  teacher: string;
  unit: string;
  lesson: string;
  description: string;
  nextClass: string;
}

export interface HomeworkItem {
  id: string;
  title: string;
  kh: string;
  subject: string;
  due: string;
  state: "Due soon" | "To do" | "Completed";
  tone: "warning" | "primary" | "success";
  teacher: string;
  instructions: string;
  completed: boolean;
  photoAttached?: boolean;
}

const schedulesByDay: Record<string, ScheduleItem[]> = {
  Mon: [
    {
      id: "mon-1",
      time: "8:00 - 8:50",
      subject: "Mathematics",
      kh: "គណិតវិទ្យា",
      room: "A-203",
      color: "bg-primary",
      teacher: "Mr. Sok Vannak",
      unit: "UNIT 3",
      lesson: "Linear Equations & Graphing",
      description: "Solve equations with one variable, identify slopes, and verify graphical roots.",
      nextClass: "Wednesday, 8:00 AM",
    },
    {
      id: "mon-2",
      time: "9:00 - 9:50",
      subject: "Khmer Literature",
      kh: "អក្សរសាស្ត្រខ្មែរ",
      room: "B-104",
      color: "bg-warning",
      teacher: "Mrs. Kolab Chan",
      unit: "UNIT 4",
      lesson: "Kolab Pailin Character Studies",
      description: "Examine moral themes, author intent, and traditional Khmer prose narrative structures.",
      nextClass: "Thursday, 9:00 AM",
    },
    {
      id: "mon-3",
      time: "10:15 - 11:05",
      subject: "Science",
      kh: "វិទ្យាសាស្ត្រ",
      room: "Lab 2",
      color: "bg-success",
      teacher: "Mr. Kim Heng",
      unit: "UNIT 2",
      lesson: "Plant & Animal Cells",
      description: "Observe plant cell walls under laboratory microscopes and sketch organelle structures.",
      nextClass: "Friday, 10:15 AM",
    },
  ],
  Tue: [
    {
      id: "tue-1",
      time: "8:00 - 8:50",
      subject: "English Language",
      kh: "ភាសាអង់គ្លេស",
      room: "C-101",
      color: "bg-blue-600",
      teacher: "Ms. Emily Watson",
      unit: "UNIT 3",
      lesson: "Present Perfect & Active Voice",
      description: "Practice conversational dialogues and formulate clear persuasive paragraphs.",
      nextClass: "Thursday, 8:00 AM",
    },
    {
      id: "tue-2",
      time: "9:00 - 9:50",
      subject: "Social Studies",
      kh: "សីលធម៌-ពលរដ្ឋ",
      room: "A-102",
      color: "bg-amber-600",
      teacher: "Mr. Rathana Ly",
      unit: "UNIT 2",
      lesson: "Cambodian Heritage & Geography",
      description: "Explore Tonle Sap ecosystem dynamics and ancient Angkorian irrigation architecture.",
      nextClass: "Friday, 9:00 AM",
    },
    {
      id: "tue-3",
      time: "10:15 - 11:05",
      subject: "Physical Education",
      kh: "អប់រំកាយ និងកីឡា",
      room: "Sports Complex",
      color: "bg-emerald-600",
      teacher: "Coach Somnang",
      unit: "UNIT 1",
      lesson: "Volleyball Tactics & Conditioning",
      description: "Court movement, passing drills, and team sportsmanship exercises.",
      nextClass: "Next Tuesday, 10:15 AM",
    },
  ],
  Wed: [
    {
      id: "wed-1",
      time: "8:00 - 8:50",
      subject: "Mathematics",
      kh: "គណិតវិទ្យា",
      room: "A-203",
      color: "bg-primary",
      teacher: "Mr. Sok Vannak",
      unit: "UNIT 3",
      lesson: "Systems of Linear Equations",
      description: "Solve two-variable simultaneous equations using substitution and elimination.",
      nextClass: "Friday, 8:00 AM",
    },
    {
      id: "wed-2",
      time: "9:00 - 9:50",
      subject: "Science",
      kh: "វិទ្យាសាស្ត្រ",
      room: "Lab 2",
      color: "bg-success",
      teacher: "Mr. Kim Heng",
      unit: "UNIT 3",
      lesson: "Acids, Bases & pH Scale",
      description: "Litmus indicator tests and neutralization reaction experiments.",
      nextClass: "Friday, 10:15 AM",
    },
    {
      id: "wed-3",
      time: "10:15 - 11:05",
      subject: "Art & Music",
      kh: "សិល្បៈ និងតន្ត្រី",
      room: "Studio 1",
      color: "bg-purple-600",
      teacher: "Mrs. Neary Phun",
      unit: "UNIT 1",
      lesson: "Traditional Pinpeat Instruments",
      description: "Rhythmic patterns of Roneat Ek and Kong Vong Thom in classical ensembles.",
      nextClass: "Next Wednesday, 10:15 AM",
    },
  ],
  Thu: [
    {
      id: "thu-1",
      time: "8:00 - 8:50",
      subject: "English Language",
      kh: "ភាសាអង់គ្លេស",
      room: "C-101",
      color: "bg-blue-600",
      teacher: "Ms. Emily Watson",
      unit: "UNIT 3",
      lesson: "Reading Comprehension & Debate",
      description: "Group discussions defending environmental conservation projects.",
      nextClass: "Next Tuesday, 8:00 AM",
    },
    {
      id: "thu-2",
      time: "9:00 - 9:50",
      subject: "Khmer Literature",
      kh: "អក្សរសាស្ត្រខ្មែរ",
      room: "B-104",
      color: "bg-warning",
      teacher: "Mrs. Kolab Chan",
      unit: "UNIT 4",
      lesson: "Classical Khmer Poetry Metrics",
      description: "Structure and rhyming schemes of Phumpuol and Kak-K-Tey 7-syllable poems.",
      nextClass: "Monday, 9:00 AM",
    },
    {
      id: "thu-3",
      time: "10:15 - 11:05",
      subject: "Computer Science",
      kh: "ព័ត៌មានវិទ្យា",
      room: "IT Lab 1",
      color: "bg-cyan-600",
      teacher: "Mr. Boramey Touch",
      unit: "UNIT 2",
      lesson: "Algorithmic Flowcharts & Scratch",
      description: "Building looping logic and event triggers in interactive code simulations.",
      nextClass: "Next Thursday, 10:15 AM",
    },
  ],
  Fri: [
    {
      id: "fri-1",
      time: "8:00 - 8:50",
      subject: "Mathematics",
      kh: "គណិតវិទ្យា",
      room: "A-203",
      color: "bg-primary",
      teacher: "Mr. Sok Vannak",
      unit: "UNIT 3",
      lesson: "Weekly Problem Solving Quiz",
      description: "Timed 45-minute assessment covering linear equation word problems.",
      nextClass: "Monday, 8:00 AM",
    },
    {
      id: "fri-2",
      time: "9:00 - 9:50",
      subject: "Social Studies",
      kh: "សីលធម៌-ពលរដ្ឋ",
      room: "A-102",
      color: "bg-amber-600",
      teacher: "Mr. Rathana Ly",
      unit: "UNIT 2",
      lesson: "Civic Rights and Responsibilities",
      description: "Understanding community governance, road safety, and civic harmony.",
      nextClass: "Tuesday, 9:00 AM",
    },
    {
      id: "fri-3",
      time: "10:15 - 11:05",
      subject: "Science",
      kh: "វិទ្យាសាស្ត្រ",
      room: "Lab 2",
      color: "bg-success",
      teacher: "Mr. Kim Heng",
      unit: "UNIT 2",
      lesson: "Microscope Lab Submissions",
      description: "Finalizing lab notebooks and organelle function comparative tables.",
      nextClass: "Monday, 10:15 AM",
    },
  ],
};

const initialHomework: HomeworkItem[] = [
  {
    id: "hw-1",
    title: "Algebra practice",
    kh: "លំហាត់ពិជគណិត",
    subject: "Mathematics",
    due: "Today, 6:00 PM",
    state: "Due soon",
    tone: "warning",
    teacher: "Mr. Sok Vannak",
    instructions:
      "Complete exercises 1–12 on page 48. Show each algebraic step clearly in your notebook, find the values for x and y, and bring your completed workbook to class.",
    completed: false,
    photoAttached: false,
  },
  {
    id: "hw-2",
    title: "Read chapter 4",
    kh: "អានជំពូកទី ៤",
    subject: "Khmer Literature",
    due: "Tomorrow, 5:00 PM",
    state: "To do",
    tone: "primary",
    teacher: "Mrs. Kolab Chan",
    instructions:
      "Read chapter 4 of Kolab Pailin thoroughly. Write answers to reflection questions 1 to 5 in your exercise book with proper Khmer spelling and handwriting.",
    completed: false,
    photoAttached: false,
  },
  {
    id: "hw-3",
    title: "Plant cells worksheet",
    kh: "សន្លឹកកិច្ចការកោសិការុក្ខជាតិ",
    subject: "Science",
    due: "Sep 23, 11:59 PM",
    state: "Completed",
    tone: "success",
    teacher: "Mr. Kim Heng",
    instructions:
      "Complete the diagram labeling plant cell organelles (cell wall, nucleus, chloroplast, vacuole). Contrast plant and animal cell features in the summary table.",
    completed: true,
    photoAttached: true,
  },
];

const subjectAssessmentData: Record<
  string,
  {
    average: string;
    grade: string;
    quizzes: string;
    homework: string;
    midterm: string;
    attendance: string;
    remarks: string;
  }
> = {
  Mathematics: {
    average: "92%",
    grade: "Grade A",
    quizzes: "94%",
    homework: "96%",
    midterm: "90%",
    attendance: "100%",
    remarks: "Excellent analytical problem solving in algebra. Demonstrates leadership in group exercises.",
  },
  "Khmer Literature": {
    average: "88%",
    grade: "Grade B+",
    quizzes: "86%",
    homework: "90%",
    midterm: "88%",
    attendance: "100%",
    remarks: "Good reading comprehension, deep appreciation of classic poetry, and creative essay writing.",
  },
  Science: {
    average: "85%",
    grade: "Grade B",
    quizzes: "82%",
    homework: "88%",
    midterm: "85%",
    attendance: "98%",
    remarks: "Strong lab engagement, accurate microscopy sketches, and great interest in biological systems.",
  },
  English: {
    average: "87%",
    grade: "Grade B+",
    quizzes: "85%",
    homework: "90%",
    midterm: "86%",
    attendance: "100%",
    remarks: "Active in spoken discussions, expanding vocabulary quickly, and clear presentation skills.",
  },
  "English Language": {
    average: "87%",
    grade: "Grade B+",
    quizzes: "85%",
    homework: "90%",
    midterm: "86%",
    attendance: "100%",
    remarks: "Active in spoken discussions, expanding vocabulary quickly, and clear presentation skills.",
  },
};

export function StudentApp() {
  const [tab, setTab] = useState<Tab>("home");
  const [detail, setDetail] = useState<Detail>(null);
  const [lang, setLang] = useState<SupportedLanguage>("en");
  const [resultTab, setResultTab] = useState<"attendance" | "grades">("attendance");
  const [day, setDay] = useState("Mon");
  const [filter, setFilter] = useState("All");
  const [homeworkList, setHomeworkList] = useState<HomeworkItem[]>(initialHomework);
  const [selectedClassItem, setSelectedClassItem] = useState<ScheduleItem>(schedulesByDay["Mon"]![0]!);
  const [selectedHomeworkItem, setSelectedHomeworkItem] = useState<HomeworkItem>(initialHomework[0]!);
  const [notifsOpen, setNotifsOpen] = useState(false);
  const [unreadNotifs, setUnreadNotifs] = useState(3);
  const [idCardOpen, setIdCardOpen] = useState(false);
  const [selectedSubjectModal, setSelectedSubjectModal] = useState<string | null>(null);
  const [settingModal, setSettingModal] = useState<string | null>(null);

  const go = (next: Tab) => {
    setDetail(null);
    setTab(next);
  };

  const openClass = (item: ScheduleItem) => {
    setSelectedClassItem(item);
    setDetail("class");
  };

  const openHomework = (item: HomeworkItem) => {
    setSelectedHomeworkItem(item);
    setDetail("homework");
  };

  const toggleCompleteHomework = (id: string) => {
    setHomeworkList((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const nextState = !h.completed;
          const updated: HomeworkItem = {
            ...h,
            completed: nextState,
            state: nextState ? "Completed" : "To do",
            tone: nextState ? "success" : "primary",
          };
          setSelectedHomeworkItem(updated);
          return updated;
        }
        return h;
      })
    );
  };

  const togglePhotoHomework = (id: string) => {
    setHomeworkList((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const updated: HomeworkItem = { ...h, photoAttached: !h.photoAttached };
          setSelectedHomeworkItem(updated);
          return updated;
        }
        return h;
      })
    );
  };

  return (
    <MobileDeviceFrame appName="Student App" roleBadge="Student">
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-background font-sans">
        {/* Header */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-4">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {detail ? (
              <Button
                aria-label="Go back"
                size="icon"
                variant="ghost"
                onClick={() => setDetail(null)}
                className="size-9 cursor-pointer shrink-0"
              >
                <ArrowLeft className="size-4.5" />
              </Button>
            ) : (
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="size-4.5" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                School OS
              </p>
              <p className="text-xs font-bold leading-tight text-foreground truncate">
                {detail ? detailTitle(detail, selectedClassItem, selectedHomeworkItem) : titleFor(tab)}
              </p>
            </div>
          </div>
          {!detail && (
            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <LanguageToggle
                currentLanguage={lang}
                onLanguageChange={(l) => setLang(l)}
                size="sm"
              />
              <Button
                aria-label="Notifications"
                size="icon"
                variant="ghost"
                onClick={() => setNotifsOpen(true)}
                className="relative size-8 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <Bell className="size-4" />
                {unreadNotifs > 0 && (
                  <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive ring-2 ring-card" />
                )}
              </Button>
            </div>
          )}
        </header>

        {/* Scrollable View Content */}
        <div className="min-h-0 flex-1 overflow-y-auto pb-2 scrollbar-none">
          <div key={`${tab}-${detail ?? "main"}-${selectedClassItem?.id}-${selectedHomeworkItem?.id}`} className="animate-screen">
            {detail ? (
              renderDetail(
                detail,
                selectedClassItem,
                selectedHomeworkItem,
                toggleCompleteHomework,
                togglePhotoHomework,
                () => setIdCardOpen(true),
                (s) => setSettingModal(s)
              )
            ) : (
              <>
                {tab === "home" && (
                  <HomeScreen
                    onClass={(item) => openClass(item)}
                    onHomework={(item) => openHomework(item)}
                    onBus={() => setDetail("bus")}
                    onAllHomework={() => go("homework")}
                    onAllClasses={() => go("classes")}
                    onResults={() => go("results")}
                    homeworkList={homeworkList}
                  />
                )}
                {tab === "classes" && (
                  <ClassesScreen
                    day={day}
                    setDay={setDay}
                    onClass={(item) => openClass(item)}
                    onSelectSubject={(s) => setSelectedSubjectModal(s)}
                    schedule={schedulesByDay[day] ?? schedulesByDay["Mon"] ?? []}
                  />
                )}
                {tab === "homework" && (
                  <HomeworkScreen
                    filter={filter}
                    setFilter={setFilter}
                    onOpen={(item) => openHomework(item)}
                    homeworkList={homeworkList}
                  />
                )}
                {tab === "results" && (
                  <ResultsScreen
                    active={resultTab}
                    setActive={setResultTab}
                    onSubjectClick={(s) => setSelectedSubjectModal(s)}
                  />
                )}
                {tab === "more" && (
                  <MoreScreen
                    open={(d) => setDetail(d)}
                    onOpenId={() => setIdCardOpen(true)}
                  />
                )}
              </>
            )}
          </div>
        </div>

        {/* Bottom Tab Bar */}
        {!detail && <BottomNav active={tab} onChange={go} />}

        {/* Notifications Sheet Modal */}
        {notifsOpen && (
          <div className="absolute inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-sm font-bold text-foreground">Notifications · ដំណឹង</h3>
                <p className="text-[10px] text-muted-foreground">Recent academic and bus announcements</p>
              </div>
              <Button variant="ghost" size="icon" className="size-7" onClick={() => setNotifsOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>

            <div className="mt-3 space-y-2.5 flex-1 overflow-y-auto text-xs">
              <div className="rounded-lg border border-border p-3 bg-card">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">Algebra Homework Due Soon</span>
                  <span className="text-[10px] text-primary font-medium">10 min ago</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">Due today at 6:00 PM. Complete exercises 1–12 on page 48.</p>
              </div>
              <div className="rounded-lg border border-border p-3 bg-card">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">Bus 07 Approaching Stop</span>
                  <span className="text-[10px] text-primary font-medium">35 min ago</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">Bus 07 is 5 minutes from Toul Kork Market stop.</p>
              </div>
              <div className="rounded-lg border border-border p-3 bg-card">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">Mid-Term Results Posted</span>
                  <span className="text-[10px] text-muted-foreground">Yesterday</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">Mr. Vannak published mathematics quiz results.</p>
              </div>
            </div>

            <div className="mt-auto pt-3 border-t flex gap-2">
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

        {/* Digital Student ID Card Modal */}
        {idCardOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
            <div className="w-full max-w-[320px] rounded-2xl border border-border bg-card p-5 shadow-2xl text-center">
              <div className="flex items-center justify-between pb-2 border-b">
                <span className="text-[10px] font-bold text-primary tracking-wider uppercase">Kingdom of Cambodia</span>
                <Button variant="ghost" size="icon" className="size-7" onClick={() => setIdCardOpen(false)}>
                  <X className="size-4" />
                </Button>
              </div>
              <div className="mt-4 flex flex-col items-center">
                <div className="flex size-18 items-center justify-center rounded-full bg-primary text-primary-foreground font-black text-2xl shadow-md">
                  SD
                </div>
                <h3 className="mt-2 text-base font-bold text-foreground">Sovann Dara</h3>
                <p className="text-xs text-muted-foreground">សុវណ្ណ ដារ៉ា · Grade 9A</p>
                <div className="mt-3 flex gap-2 text-[10px]">
                  <span className="rounded bg-accent px-2 py-0.5 font-bold text-primary">ID: 09284</span>
                  <span className="rounded bg-muted px-2 py-0.5 font-bold text-muted-foreground">Blood: O+</span>
                </div>
              </div>

              {/* Simulated barcode / QR */}
              <div className="my-4 rounded-xl border border-dashed border-border p-3 bg-muted/40">
                <div className="flex justify-center">
                  <QrCode className="size-24 text-foreground" />
                </div>
                <p className="mt-1 font-mono text-[10px] text-muted-foreground tracking-widest">09284-KH-2026</p>
              </div>

              <p className="text-[10px] text-muted-foreground">Valid for campus entry, library access, and school cafeteria.</p>
              <Button size="sm" className="mt-3 w-full text-xs" onClick={() => setIdCardOpen(false)}>
                Done
              </Button>
            </div>
          </div>
        )}

        {/* Subject Detail Modal */}
        {selectedSubjectModal && (() => {
          const subjectData =
            (selectedSubjectModal && subjectAssessmentData[selectedSubjectModal]) ||
            subjectAssessmentData["Mathematics"]!;
          return (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
              <div className="w-full max-w-[320px] rounded-2xl border border-border bg-card p-5 shadow-2xl text-left">
                <div className="flex items-start justify-between border-b pb-3">
                  <div>
                    <h3 className="text-base font-bold text-foreground">{selectedSubjectModal}</h3>
                    <p className="text-[11px] text-muted-foreground">Subject assessment breakdown · Term 1</p>
                  </div>
                  <Button variant="ghost" size="icon" className="size-7" onClick={() => setSelectedSubjectModal(null)}>
                    <X className="size-4" />
                  </Button>
                </div>

                <div className="mt-3 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between rounded-lg bg-muted/60 p-2.5">
                    <span className="font-semibold text-foreground">Overall Term Average</span>
                    <span className="text-base font-bold text-primary">
                      {subjectData.average} ({subjectData.grade})
                    </span>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between py-1 border-b border-border/70 text-[11px]">
                      <span className="text-muted-foreground">Weekly Quizzes (30%)</span>
                      <span className="font-bold">{subjectData.quizzes}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border/70 text-[11px]">
                      <span className="text-muted-foreground">Homework & Workbook (25%)</span>
                      <span className="font-bold">{subjectData.homework}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border/70 text-[11px]">
                      <span className="text-muted-foreground">Mid-Term Assessment (35%)</span>
                      <span className="font-bold">{subjectData.midterm}</span>
                    </div>
                    <div className="flex justify-between py-1 text-[11px]">
                      <span className="text-muted-foreground">Class Attendance (10%)</span>
                      <span className="font-bold text-success">{subjectData.attendance}</span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-blue-50 dark:bg-blue-950/50 p-2.5 mt-2">
                    <p className="font-bold text-[10px] text-primary">TEACHER REMARKS</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                      "{subjectData.remarks}"
                    </p>
                  </div>
                </div>

                <Button size="sm" className="mt-4 w-full text-xs" onClick={() => setSelectedSubjectModal(null)}>
                  Close
                </Button>
              </div>
            </div>
          );
        })()}

        {/* Setting Dialogs */}
        {settingModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
            <div className="w-full max-w-[300px] rounded-2xl border border-border bg-card p-4 shadow-2xl text-left text-xs">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-bold text-sm text-foreground">{settingModal}</h3>
                <Button variant="ghost" size="icon" className="size-6" onClick={() => setSettingModal(null)}>
                  <X className="size-3.5" />
                </Button>
              </div>

              {settingModal === "Language" && (
                <div className="mt-3 space-y-2">
                  <button className="flex w-full items-center justify-between p-2 rounded-lg bg-primary/10 border border-primary text-primary font-bold">
                    <span>English (EN)</span>
                    <Check className="size-4" />
                  </button>
                  <button className="flex w-full items-center justify-between p-2 rounded-lg hover:bg-muted font-medium">
                    <span>ភាសាខ្មែរ (Khmer)</span>
                  </button>
                </div>
              )}

              {settingModal === "Accessibility" && (
                <div className="mt-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <span>High Contrast UI</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Large Text Font</span>
                    <Switch />
                  </div>
                </div>
              )}

              {settingModal === "About" && (
                <div className="mt-3 space-y-2 text-muted-foreground">
                  <p><strong className="text-foreground">School OS</strong></p>
                  <p>Version: 1.2.0 (MoEYS Standard Edition)</p>
                  <p>Campus: New Sunrise School · Phnom Penh</p>
                  <p>Emergency Hotline: +855 23 888 777</p>
                </div>
              )}

              <Button size="sm" className="mt-4 w-full text-xs" onClick={() => setSettingModal(null)}>
                Done
              </Button>
            </div>
          </div>
        )}
      </div>
    </MobileDeviceFrame>
  );
}

function HomeScreen({
  onClass,
  onHomework,
  onBus,
  onAllHomework,
  onAllClasses,
  onResults,
  homeworkList,
}: {
  onClass: (item: ScheduleItem) => void;
  onHomework: (item: HomeworkItem) => void;
  onBus: () => void;
  onAllHomework: () => void;
  onAllClasses: () => void;
  onResults: () => void;
  homeworkList: HomeworkItem[];
}) {
  const schedule = schedulesByDay["Mon"] ?? [];
  const dueHomework = homeworkList.find((h) => !h.completed) || homeworkList[0];

  return (
    <div className="space-y-3.5 p-3.5">
      <div className="pt-0.5">
        <p className="text-xs text-muted-foreground">Good morning · អរុណសួស្តី</p>
        <h1 className="text-xl font-bold text-foreground">Dara Meas · ដារ៉ា មាស</h1>
        <p className="text-[11px] text-muted-foreground">Monday, 21 September · Grade 6A</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onResults}
          className="min-h-16 rounded-lg border border-border bg-card p-2.5 text-left shadow-xs cursor-pointer transition hover:border-primary/50"
        >
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="size-3.5 text-success" /> Attendance
          </span>
          <strong className="mt-1 block text-sm font-bold text-foreground">
            98% <span className="font-normal text-[10px] text-muted-foreground">this term</span>
          </strong>
        </button>

        <button
          onClick={onBus}
          className="min-h-16 rounded-lg border border-warning/40 bg-warning-soft p-2.5 text-left cursor-pointer transition hover:border-warning"
        >
          <span className="flex items-center gap-1.5 text-xs text-warning-strong">
            <Bus className="size-3.5 text-warning" /> Bus 03 (AM)
          </span>
          <strong className="mt-1 flex items-center justify-between text-xs font-bold text-foreground">
            <span>+12m Delay</span> <ChevronRight className="size-3.5 text-muted-foreground" />
          </strong>
        </button>
      </div>

      <SectionHeader title="Today’s timetable" kh="កាលវិភាគថ្ងៃនេះ" action="View all" onClick={onAllClasses} />
      <Card>
        {schedule.map((item, i) => (
          <button
            key={item.subject}
            onClick={() => onClass(item)}
            className={cn(
              "flex min-h-14 w-full items-center gap-2.5 px-3 text-left cursor-pointer transition hover:bg-muted/40",
              i > 0 && "border-t border-border"
            )}
          >
            <span className={cn("h-7 w-1 rounded-full", item.color)} />
            <span className="w-12 text-xs font-mono font-semibold text-foreground">{item.time.split(" ")[0]}</span>
            <span className="min-w-0 flex-1">
              <strong className="block truncate text-xs font-bold text-foreground">{item.subject}</strong>
              <small className="block truncate text-[10px] text-muted-foreground">
                {item.kh} · {item.room}
              </small>
            </span>
            <ChevronRight className="size-3.5 text-muted-foreground" />
          </button>
        ))}
      </Card>

      <SectionHeader title="Homework" kh="កិច្ចការផ្ទះ" action="View all" onClick={onAllHomework} />
      {dueHomework && (
        <button
          onClick={() => onHomework(dueHomework)}
          className={cn(
            "flex min-h-16 w-full items-center gap-2.5 rounded-lg border bg-card p-3 text-left shadow-xs cursor-pointer transition",
            dueHomework.completed ? "border-success/50 hover:border-success" : "border-warning/50 hover:border-warning"
          )}
        >
          <div
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-lg",
              dueHomework.completed ? "bg-success-soft text-success" : "bg-warning-soft text-warning"
            )}
          >
            <FileText className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <strong className="block text-xs font-bold text-foreground">{dueHomework.title}</strong>
            <span className="text-[10px] text-muted-foreground">
              {dueHomework.subject} · Due {dueHomework.due}
            </span>
          </div>
          <Chip tone={dueHomework.completed ? "success" : dueHomework.tone}>
            {dueHomework.completed ? "Completed" : dueHomework.state}
          </Chip>
        </button>
      )}
    </div>
  );
}

function ClassesScreen({
  day,
  setDay,
  onClass,
  onSelectSubject,
  schedule,
}: {
  day: string;
  setDay: (d: string) => void;
  onClass: (item: ScheduleItem) => void;
  onSelectSubject?: (s: string) => void;
  schedule: ScheduleItem[];
}) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  return (
    <div className="space-y-3 p-3.5">
      <div>
        <h1 className="text-lg font-bold text-foreground">My classes</h1>
        <p className="text-xs text-muted-foreground">ថ្នាក់រៀនរបស់ខ្ញុំ · Grade 9A</p>
      </div>

      <div className="grid grid-cols-5 rounded-lg bg-secondary p-1">
        {days.map((d) => (
          <Button
            key={d}
            variant={day === d ? "default" : "ghost"}
            onClick={() => setDay(d)}
            className="h-8 px-1 text-xs font-semibold cursor-pointer"
          >
            {d}
          </Button>
        ))}
      </div>

      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="font-bold text-xs">
            {day === "Mon"
              ? "Monday, Sep 21"
              : day === "Tue"
              ? "Tuesday, Sep 22"
              : day === "Wed"
              ? "Wednesday, Sep 23"
              : day === "Thu"
              ? "Thursday, Sep 24"
              : "Friday, Sep 25"}
          </h2>
          <p className="text-[10px] text-muted-foreground">{schedule.length} classes scheduled</p>
        </div>
        <CalendarDays className="size-4 text-primary" />
      </div>

      <Card>
        {schedule.map((item, i) => (
          <button
            key={item.id || item.subject}
            onClick={() => onClass(item)}
            className={cn(
              "flex min-h-[60px] w-full gap-2.5 p-2.5 text-left cursor-pointer transition hover:bg-muted/40",
              i > 0 && "border-t border-border"
            )}
          >
            <div className="w-14 pt-0.5">
              <strong className="text-xs font-bold font-mono">{item.time.split(" ")[0]}</strong>
              <small className="block text-[9px] text-muted-foreground">50 min</small>
            </div>
            <span className={cn("w-1 self-stretch rounded-full", item.color)} />
            <div className="flex-1 min-w-0">
              <strong className="text-xs font-bold block truncate">{item.subject}</strong>
              <p className="text-[10px] text-muted-foreground truncate">{item.kh}</p>
              <p className="mt-0.5 text-[10px] text-primary font-medium">{item.room} · {item.teacher}</p>
            </div>
            <ChevronRight className="mt-2 size-3.5 text-muted-foreground" />
          </button>
        ))}
      </Card>

      <SectionHeader title="My subjects" kh="មុខវិជ្ជារបស់ខ្ញុំ" />
      <div className="grid grid-cols-2 gap-2">
        {([
          ["Mathematics", "5 lessons"],
          ["Khmer Literature", "4 lessons"],
          ["Science", "3 lessons"],
          ["English", "4 lessons"],
        ] as const).map(([s, n]) => (
          <button
            key={s}
            onClick={() => onSelectSubject?.(s)}
            className="min-h-16 rounded-lg border border-border bg-card p-2.5 text-left shadow-xs cursor-pointer transition hover:border-primary"
          >
            <BookOpen className="mb-1.5 size-3.5 text-primary" />
            <strong className="block text-xs font-bold text-foreground truncate">{s}</strong>
            <small className="text-[10px] text-muted-foreground">{n} / week · Tap details</small>
          </button>
        ))}
      </div>
    </div>
  );
}

function HomeworkScreen({
  filter,
  setFilter,
  onOpen,
  homeworkList,
}: {
  filter: string;
  setFilter: (v: string) => void;
  onOpen: (item: HomeworkItem) => void;
  homeworkList: HomeworkItem[];
}) {
  return (
    <div className="space-y-3 p-3.5">
      <div>
        <h1 className="text-lg font-bold text-foreground">Homework</h1>
        <p className="text-xs text-muted-foreground">កិច្ចការផ្ទះ · {homeworkList.length} assignments</p>
      </div>

      <div className="flex gap-1.5 overflow-x-auto">
        {["All", "To do", "Completed"].map((v) => (
          <Button
            key={v}
            variant={filter === v ? "default" : "outline"}
            onClick={() => setFilter(v)}
            className="h-8 px-3 text-xs shrink-0 font-semibold cursor-pointer"
          >
            {v}
          </Button>
        ))}
      </div>

      <div className="space-y-2 pt-1">
        {homeworkList
          .filter(
            (h) =>
              filter === "All" ||
              (filter === "Completed" ? h.completed : !h.completed)
          )
          .map((h) => (
            <button
              key={h.id}
              onClick={() => onOpen(h)}
              className="w-full rounded-lg border border-border bg-card p-3 text-left shadow-xs cursor-pointer transition hover:border-primary"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] font-semibold text-primary">{h.subject}</p>
                  <h2 className="mt-0.5 font-bold text-xs text-foreground">{h.title}</h2>
                  <p className="text-[10px] text-muted-foreground">{h.kh}</p>
                </div>
                <Chip tone={h.completed ? "success" : h.tone}>
                  {h.completed ? "Completed" : h.state}
                </Chip>
              </div>
              <div className="mt-2.5 flex items-center justify-between border-t border-border/60 pt-2 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock3 className="size-3 text-warning" /> Due {h.due}
                </span>
                <span className="font-semibold text-primary flex items-center gap-0.5">
                  View instructions <ChevronRight className="size-3" />
                </span>
              </div>
            </button>
          ))}
      </div>
    </div>
  );
}

function ResultsScreen({
  active,
  setActive,
  onSubjectClick,
}: {
  active: "attendance" | "grades";
  setActive: (v: "attendance" | "grades") => void;
  onSubjectClick?: ((s: string) => void) | undefined;
}) {
  return (
    <div className="space-y-3 p-3.5">
      <div>
        <h1 className="text-lg font-bold text-foreground">Results</h1>
        <p className="text-xs text-muted-foreground">លទ្ធផលសិក្សា · Term 1</p>
      </div>
      <div className="grid grid-cols-2 rounded-lg bg-secondary p-1">
        <Button
          variant={active === "attendance" ? "default" : "ghost"}
          className="h-8 text-xs font-semibold cursor-pointer"
          onClick={() => setActive("attendance")}
        >
          Attendance
        </Button>
        <Button
          variant={active === "grades" ? "default" : "ghost"}
          className="h-8 text-xs font-semibold cursor-pointer"
          onClick={() => setActive("grades")}
        >
          Grades
        </Button>
      </div>
      {active === "attendance" ? (
        <Attendance />
      ) : (
        <Grades {...(onSubjectClick ? { onSubjectClick } : {})} />
      )}
    </div>
  );
}

function Attendance() {
  const months = [
    { name: "August 2026", present: 41, late: 1, absent: 0, daysCount: 31, lateDays: [12], absentDays: [] },
    { name: "September 2026", present: 43, late: 2, absent: 1, daysCount: 30, lateDays: [9], absentDays: [17] },
    { name: "October 2026", present: 44, late: 0, absent: 1, daysCount: 31, lateDays: [], absentDays: [8] },
  ];
  const [monthIndex, setMonthIndex] = useState(1);
  const [selectedDay, setSelectedDay] = useState<number | null>(21);

  const cur = months[monthIndex] ?? months[0]!;
  const days = Array.from({ length: cur.daysCount }, (_, i) => i + 1);

  return (
    <div className="space-y-3 pt-1">
      <div className="grid grid-cols-3 gap-2">
        <Stat label="Present" value={String(cur.present)} tone="success" />
        <Stat label="Late" value={String(cur.late)} tone="warning" />
        <Stat label="Absent" value={String(cur.absent)} tone="danger" />
      </div>

      <Card>
        <div className="flex items-center justify-between p-2.5 border-b">
          <Button
            size="icon"
            variant="ghost"
            className="size-7 cursor-pointer"
            aria-label="Previous month"
            disabled={monthIndex === 0}
            onClick={() => setMonthIndex(Math.max(0, monthIndex - 1))}
          >
            <ChevronRight className="rotate-180 size-3.5" />
          </Button>
          <strong className="text-xs font-bold">{cur.name}</strong>
          <Button
            size="icon"
            variant="ghost"
            className="size-7 cursor-pointer"
            aria-label="Next month"
            disabled={monthIndex === months.length - 1}
            onClick={() => setMonthIndex(Math.min(months.length - 1, monthIndex + 1))}
          >
            <ChevronRight className="size-3.5" />
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-y-1 p-2.5 text-center text-xs">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <span key={`${d}-${i}`} className="text-[10px] font-bold text-muted-foreground pb-1">
              {d}
            </span>
          ))}
          {days.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              className={cn(
                "mx-auto flex size-7 items-center justify-center rounded-full text-xs font-semibold cursor-pointer transition",
                cur.lateDays.includes(d) && "bg-warning-soft text-warning-strong ring-1 ring-warning",
                cur.absentDays.includes(d) && "bg-destructive/15 text-destructive ring-1 ring-destructive",
                d === 21 && monthIndex === 1 && "bg-primary text-primary-foreground font-bold",
                selectedDay === d && "ring-2 ring-primary ring-offset-1"
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </Card>

      {selectedDay && (
        <div className="rounded-lg border border-border p-2.5 bg-muted/40 text-[11px] text-muted-foreground">
          <strong className="text-foreground">
            {selectedDay} {cur.name}:
          </strong>{" "}
          {cur.absentDays.includes(selectedDay)
            ? "Absent (Recorded sick leave)"
            : cur.lateDays.includes(selectedDay)
            ? "Late (Arrived 08:15 AM via Bus 07 traffic delay)"
            : selectedDay <= 21
            ? "Present (RFID Check-in at 07:42 AM · On time)"
            : "Upcoming scheduled school day"}
        </div>
      )}

      <div className="flex justify-center gap-3 text-[10px] text-muted-foreground pt-0.5">
        <span className="flex items-center gap-1">
          <i className="size-2 rounded-full bg-success" /> Present
        </span>
        <span className="flex items-center gap-1">
          <i className="size-2 rounded-full bg-warning" /> Late
        </span>
        <span className="flex items-center gap-1">
          <i className="size-2 rounded-full bg-destructive" /> Absent
        </span>
      </div>
    </div>
  );
}

function Grades({ onSubjectClick }: { onSubjectClick?: (s: string) => void }) {
  return (
    <div className="space-y-3 pt-1">
      <div className="rounded-xl bg-primary p-3.5 text-primary-foreground">
        <p className="text-[10px] opacity-80">Term average · មធ្យមភាគ</p>
        <div className="mt-1 flex items-end justify-between">
          <strong className="text-2xl font-bold">88.5%</strong>
          <span className="rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-bold">↑ 3.2% gain</span>
        </div>
      </div>

      <Card>
        {([
          ["Mathematics", "92", "90"],
          ["Khmer Literature", "86", "84"],
          ["Science", "89", "87"],
          ["English", "87", "85"],
        ] as const).map(([s, score, avg], i) => (
          <button
            key={s}
            onClick={() => onSubjectClick?.(s)}
            className={cn(
              "flex min-h-14 w-full items-center px-3 py-2 text-left cursor-pointer hover:bg-muted/40 transition",
              i > 0 && "border-t border-border"
            )}
          >
            <div className="flex-1 min-w-0">
              <strong className="text-xs font-bold block truncate text-foreground">{s}</strong>
              <p className="text-[10px] text-muted-foreground">Term avg {avg}% · Tap for breakdown</p>
            </div>
            <div className="text-right">
              <strong className="text-sm font-bold text-primary">{score}%</strong>
              <p className="text-[9px] text-muted-foreground">Latest test</p>
            </div>
            <ChevronRight className="size-3.5 text-muted-foreground ml-2" />
          </button>
        ))}
      </Card>
    </div>
  );
}

function MoreScreen({
  open,
  onOpenId,
}: {
  open: (v: Detail) => void;
  onOpenId?: () => void;
}) {
  const items = [
    { icon: CircleUserRound, title: "Student Profile", kh: "ប្រវត្តិរូប", detail: "profile" as const },
    { icon: Bus, title: "Bus Information", kh: "ព័ត៌មានរថយន្តសាលា", detail: "bus" as const },
    { icon: Settings, title: "Settings & Language", kh: "ការកំណត់", detail: "settings" as const },
  ];

  return (
    <div className="space-y-3 p-3.5">
      <div className="flex items-center justify-between rounded-xl bg-primary p-3.5 text-primary-foreground">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-white/20 text-base font-bold">
            SD
          </div>
          <div>
            <h1 className="text-sm font-bold">Sovann Dara</h1>
            <p className="text-xs opacity-80">Grade 9A · ID 09284</p>
            <p className="text-[10px] opacity-70">Phnom Penh Main Campus</p>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="h-8 text-[11px] font-bold cursor-pointer"
          onClick={onOpenId}
        >
          <QrCode className="size-3.5 mr-1" /> ID Card
        </Button>
      </div>

      <Card>
        {items.map(({ icon: Icon, title, kh, detail }, i) => (
          <button
            key={title}
            onClick={() => open(detail)}
            className={cn(
              "flex min-h-14 w-full items-center gap-2.5 px-3 text-left cursor-pointer transition hover:bg-muted/40",
              i > 0 && "border-t border-border"
            )}
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-primary dark:bg-blue-950">
              <Icon className="size-4" />
            </span>
            <span className="flex-1">
              <strong className="block text-xs font-bold text-foreground">{title}</strong>
              <small className="text-[10px] text-muted-foreground">{kh}</small>
            </span>
            <ChevronRight className="size-3.5 text-muted-foreground" />
          </button>
        ))}
      </Card>

      <p className="pt-2 text-center text-[10px] text-muted-foreground">
        School OS · Student Prototype v1.2
      </p>
    </div>
  );
}

function renderDetail(
  detail: Exclude<Detail, null>,
  selectedClass: ScheduleItem,
  selectedHomework: HomeworkItem,
  onToggleCompleteHomework: (id: string) => void,
  onTogglePhotoHomework: (id: string) => void,
  onOpenId?: () => void,
  onOpenSetting?: (s: string) => void
): ReactNode {
  if (detail === "class") {
    return (
      <div className="space-y-3 p-3.5">
        <div className={cn("rounded-xl p-4 text-white shadow-xs", selectedClass?.color || "bg-primary")}>
          <div className="flex items-center justify-between">
            <span className="inline-block rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-bold">
              {selectedClass?.unit || "LESSON"}
            </span>
            <span className="text-[11px] font-medium opacity-90">{selectedClass?.time}</span>
          </div>
          <h1 className="mt-2 text-xl font-bold">{selectedClass?.subject}</h1>
          <p className="text-xs opacity-90">{selectedClass?.kh} · Room {selectedClass?.room}</p>
        </div>

        <Card>
          <InfoRow icon={<UserRound />} label="Teacher" value={selectedClass?.teacher || "Instructor"} />
          <InfoRow icon={<MapPin />} label="Classroom" value={`Building ${selectedClass?.room?.split("-")[0] || "A"} · Room ${selectedClass?.room}`} />
          <InfoRow icon={<Clock3 />} label="Next class" value={selectedClass?.nextClass || "Scheduled"} />
        </Card>

        <div>
          <h2 className="mb-1.5 font-bold text-xs text-foreground">Current lesson · មេរៀន</h2>
          <Card>
            <div className="p-3">
              <p className="text-[10px] font-bold text-primary">{selectedClass?.unit}</p>
              <h3 className="mt-0.5 font-bold text-xs">{selectedClass?.lesson}</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {selectedClass?.description}
              </p>
            </div>
          </Card>
        </div>

        <div>
          <h2 className="mb-1.5 font-bold text-xs text-foreground">Learning materials · សម្ភារសិក្សា</h2>
          <Card>
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="size-4" />
                </div>
                <div>
                  <strong className="text-xs font-semibold block text-foreground">Chapter textbook PDF</strong>
                  <span className="text-[10px] text-muted-foreground">MoEYS Standard Curriculum</span>
                </div>
              </div>
              <Button size="sm" variant="outline" className="h-7 text-[11px] font-semibold">
                Open
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (detail === "homework") {
    const isCompleted = selectedHomework?.completed;
    return (
      <div className="space-y-3 p-3.5">
        <div>
          <Chip tone={isCompleted ? "success" : selectedHomework?.tone}>
            {isCompleted ? "Completed" : selectedHomework?.state}
          </Chip>
          <h1 className="mt-1.5 text-xl font-bold text-foreground">{selectedHomework?.title}</h1>
          <p className="text-xs text-muted-foreground">{selectedHomework?.kh}</p>
        </div>

        <Card>
          <InfoRow icon={<BookOpen />} label="Subject" value={selectedHomework?.subject || "Subject"} />
          <InfoRow icon={<Clock3 />} label="Due date" value={selectedHomework?.due || "Upcoming"} />
          <InfoRow icon={<UserRound />} label="Teacher" value={selectedHomework?.teacher || "Teacher"} />
        </Card>

        <div>
          <h2 className="mb-1.5 font-bold text-xs text-foreground">Instructions · សេចក្តីណែនាំ</h2>
          <Card>
            <p className="p-3 text-xs leading-5 text-muted-foreground">
              {selectedHomework?.instructions}
            </p>
          </Card>
        </div>

        <div className="space-y-2 pt-1">
          <Button
            type="button"
            variant="outline"
            onClick={() => selectedHomework && onTogglePhotoHomework(selectedHomework.id)}
            className={cn(
              "h-10 w-full text-xs font-semibold cursor-pointer border-dashed",
              selectedHomework?.photoAttached && "border-success bg-success/10 text-success"
            )}
          >
            <Camera className="size-4 mr-1.5 text-primary" />
            {selectedHomework?.photoAttached
              ? "✓ Notebook photo attached (tap to remove)"
              : "Attach notebook photo (Camera / Upload)"}
          </Button>

          <Button
            onClick={() => selectedHomework && onToggleCompleteHomework(selectedHomework.id)}
            className={cn(
              "h-10 w-full text-xs font-bold cursor-pointer transition-colors",
              isCompleted
                ? "bg-success hover:bg-success/90 text-white"
                : "bg-primary hover:bg-primary/90 text-primary-foreground"
            )}
          >
            <Check className="size-4 mr-1" />
            {isCompleted ? "Marked as completed" : "Mark as completed"}
          </Button>
        </div>
      </div>
    );
  }

  if (detail === "bus") {
    return (
      <div className="space-y-3 p-3.5">
        <div className="rounded-xl bg-amber-500 p-3.5 text-slate-950">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium opacity-90">School bus · រថយន្តសាលា</p>
              <h1 className="mt-0.5 text-xl font-bold">Route 07</h1>
            </div>
            <Bus className="size-8" />
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 rounded-lg bg-white/80 p-2 text-xs font-semibold">
            <Wifi className="size-3.5 text-success" />
            <span>Live · Bus on the way</span>
          </div>
        </div>

        <Card>
          <InfoRow icon={<MapPin />} label="Your stop" value="Toul Kork Market" />
          <InfoRow icon={<Clock3 />} label="Estimated arrival" value="4:18 PM" />
          <InfoRow icon={<UserRound />} label="Driver" value="Mr. Rith · Bus 07" />
        </Card>

        <div>
          <h2 className="mb-1.5 font-bold text-xs text-foreground">Today’s journey</h2>
          <Card>
            <Timeline title="Picked up at school" time="3:42 PM" done />
            <Timeline title="Central Market" time="4:02 PM" done />
            <Timeline title="Toul Kork Market" time="Expected 4:18 PM" active />
            <Timeline title="Home route complete" time="—" />
          </Card>
        </div>
      </div>
    );
  }

  if (detail === "profile") {
    return (
      <div className="space-y-3 p-3.5">
        <div className="flex flex-col items-center py-2">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
            SD
          </div>
          <h1 className="mt-2 text-base font-bold text-foreground">Sovann Dara</h1>
          <p className="text-xs text-muted-foreground">សុវណ្ណ ដារ៉ា</p>
        </div>

        <Card>
          <InfoRow icon={<GraduationCap />} label="Class" value="Grade 9A" />
          <InfoRow icon={<UserRound />} label="Student ID" value="09284" />
          <InfoRow icon={<CalendarDays />} label="School year" value="2026–2027" />
        </Card>

        {onOpenId && (
          <Button className="w-full text-xs font-semibold cursor-pointer" onClick={onOpenId}>
            <QrCode className="size-4 mr-1.5" /> View Digital Student ID Card
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3 p-3.5">
      <div>
        <h1 className="text-lg font-bold text-foreground">Settings</h1>
        <p className="text-xs text-muted-foreground">ការកំណត់</p>
      </div>
      <Card>
        <button
          className="w-full text-left cursor-pointer"
          onClick={() => onOpenSetting?.("Language")}
        >
          <SettingRow icon={<Languages />} label="Khmer & English" />
        </button>
        <SettingRow icon={<Bell />} label="Notifications" toggle />
        <SettingRow icon={<WifiOff />} label="Offline access" toggle />
      </Card>
      <Card>
        <button
          className="w-full text-left cursor-pointer"
          onClick={() => onOpenSetting?.("Accessibility")}
        >
          <SettingRow icon={<SlidersHorizontal />} label="Accessibility" />
        </button>
        <button
          className="w-full text-left cursor-pointer"
          onClick={() => onOpenSetting?.("About")}
        >
          <SettingRow icon={<MoreHorizontal />} label="About this app" />
        </button>
      </Card>
    </div>
  );
}

function BottomNav({ active, onChange }: { active: Tab; onChange: (v: Tab) => void }) {
  const items: [Tab, typeof Home, string][] = [
    ["home", Home, "Home"],
    ["classes", BookOpen, "Classes"],
    ["homework", FileText, "Homework"],
    ["results", GraduationCap, "Results"],
    ["more", MoreHorizontal, "More"],
  ];
  return (
    <nav className="grid h-14 shrink-0 grid-cols-5 border-t border-border bg-card pb-1 shadow-sm">
      {items.map(([id, Icon, label]) => (
        <button
          key={id}
          aria-label={label}
          onClick={() => onChange(id)}
          className={cn(
            "flex min-h-12 flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors cursor-pointer",
            active === id ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon className="size-4" strokeWidth={active === id ? 2.5 : 2} />
          <span>{label}</span>
          {active === id && <span className="h-0.5 w-4 rounded-full bg-primary" />}
        </button>
      ))}
    </nav>
  );
}

function Card({ children }: { children: ReactNode }) {
  return <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs">{children}</div>;
}

function Chip({ children, tone }: { children: ReactNode; tone?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[9px] font-bold",
        tone === "success" && "bg-success-soft text-success",
        tone === "warning" && "bg-warning-soft text-warning-strong",
        tone === "danger" && "bg-destructive/15 text-destructive",
        (!tone || tone === "primary") && "bg-blue-50 text-primary dark:bg-blue-950"
      )}
    >
      {children}
    </span>
  );
}

function SectionHeader({
  title,
  kh,
  action,
  onClick,
}: {
  title: string;
  kh: string;
  action?: string;
  onClick?: () => void;
}) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h2 className="font-bold text-xs text-foreground">{title}</h2>
        <p className="text-[10px] text-muted-foreground">{kh}</p>
      </div>
      {action && (
        <Button variant="link" onClick={onClick} className="h-6 p-0 text-[11px]">
          {action} <ChevronRight className="size-3 ml-0.5" />
        </Button>
      )}
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex min-h-11 items-center gap-2.5 border-b border-border px-3 py-1.5 last:border-0">
      <span className="[&_svg]:size-4 text-primary">{icon}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
      <strong className="ml-auto text-right text-xs font-semibold text-foreground">{value}</strong>
    </div>
  );
}

function SettingRow({ icon, label, toggle }: { icon: ReactNode; label: string; toggle?: boolean }) {
  return (
    <div className="flex min-h-11 items-center gap-2.5 border-b border-border px-3 py-1.5 last:border-0">
      <span className="[&_svg]:size-4 text-primary">{icon}</span>
      <strong className="text-xs font-semibold text-foreground">{label}</strong>
      {toggle ? (
        <Switch defaultChecked className="ml-auto" />
      ) : (
        <ChevronRight className="ml-auto size-3.5 text-muted-foreground" />
      )}
    </div>
  );
}

function Timeline({ title, time, done, active }: { title: string; time: string; done?: boolean; active?: boolean }) {
  return (
    <div className="relative flex min-h-12 gap-2.5 px-3.5 py-2 before:absolute before:bottom-0 before:left-[21px] before:top-7 before:w-px before:bg-border last:before:hidden">
      <span
        className={cn(
          "z-10 mt-0.5 flex size-4 items-center justify-center rounded-full border-2 bg-card",
          done && "border-success bg-success text-primary-foreground",
          active && "border-warning"
        )}
      >
        {done && <Check className="size-2.5" />}
      </span>
      <div>
        <strong className="text-xs font-bold block leading-tight text-foreground">{title}</strong>
        <p className="text-[10px] text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div
      className={cn(
        "rounded-lg border p-2 text-center",
        tone === "success" && "border-success/30 bg-success-soft",
        tone === "warning" && "border-warning/30 bg-warning-soft",
        tone === "danger" && "border-destructive/20 bg-destructive/5"
      )}
    >
      <strong className="block text-lg font-bold text-foreground">{value}</strong>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}

function titleFor(tab: Tab) {
  return { home: "Student", classes: "Classes", homework: "Homework", results: "Results", more: "More" }[tab];
}

function detailTitle(
  detail: Exclude<Detail, null>,
  selectedClass?: ScheduleItem,
  selectedHomework?: HomeworkItem
) {
  if (detail === "class") return selectedClass ? selectedClass.subject : "Class details";
  if (detail === "homework") return selectedHomework ? selectedHomework.title : "Homework detail";
  if (detail === "bus") return "Bus info";
  if (detail === "profile") return "Profile";
  if (detail === "settings") return "Settings";
  return "Details";
}
