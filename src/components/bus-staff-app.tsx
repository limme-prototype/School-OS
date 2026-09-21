import { useMemo, useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  Bus,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  Clock3,
  CloudOff,
  Flag,
  Info,
  MapPin,
  Phone,
  QrCode,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Users,
  UserX,
  Wifi,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { MobileDeviceFrame } from "@/components/mobile-device-frame";
import { StatusChip } from "@/components/shared/status-chip";
import { LanguageToggle, SupportedLanguage } from "@/components/shared/language-toggle";
import {
  MOCK_ROUTES,
  MOCK_ROUTE_03_STOPS,
  MOCK_TRIP_03_AM,
  MOCK_INCIDENTS,
  TripRider,
  RouteStop,
} from "@/data/mock-data";

type Screen = "trips" | "trip" | "completion";
type TripTab = "stops" | "riders" | "incidents";
type DemoScenario = "normal" | "delayed-noshow" | "afternoon-guardian";

export function BusStaffApp() {
  const [screen, setScreen] = useState<Screen>("trips");
  const [tab, setTab] = useState<TripTab>("stops");
  const [lang, setLang] = useState<SupportedLanguage>("en");
  const [scenario, setScenario] = useState<DemoScenario>("delayed-noshow");

  // State from mock data
  const [arrivedStops, setArrivedStops] = useState<string[]>([
    "stop-tk-circle",
    "stop-st-315-592",
  ]);
  const [riders, setRiders] = useState<TripRider[]>(MOCK_TRIP_03_AM.riders);
  const [search, setSearch] = useState("");
  const [scanOpen, setScanOpen] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [incidentType, setIncidentType] = useState<string>("Traffic delay");
  const [incidentSeverity, setIncidentSeverity] = useState<string>("Medium");
  const [incidentNotes, setIncidentNotes] = useState(
    "Drainage works lane closure on Russian Blvd. Estimated delay +12 mins.",
  );
  const [photoAdded, setPhotoAdded] = useState(true);
  const [incidentsList, setIncidentsList] = useState(MOCK_INCIDENTS);

  const [isOnline, setIsOnline] = useState(true);
  const [driverProfileOpen, setDriverProfileOpen] = useState(false);
  const [selectedRider, setSelectedRider] = useState<TripRider | null>(null);
  const [busToast, setBusToast] = useState<string | null>(null);

  // Statistics
  const boardedCount = riders.filter((r) => r.status === "Picked").length;
  const noShowCount = riders.filter((r) => r.status === "No-show").length;
  const pendingCount = riders.filter((r) => r.status === "Not picked").length;

  const filteredRiders = useMemo(() => {
    return riders.filter((r) =>
      r.studentName.toLowerCase().includes(search.toLowerCase()) ||
      r.stopName.toLowerCase().includes(search.toLowerCase()) ||
      r.grade.toLowerCase().includes(search.toLowerCase()),
    );
  }, [riders, search]);

  const showToast = (msg: string) => {
    setBusToast(msg);
    setTimeout(() => setBusToast(null), 3200);
  };

  const startTrip = () => {
    setScreen("trip");
    setTab("stops");
    showToast("Morning Trip 03 started. GPS tracking broadcast active.");
  };

  const markArrived = (stopId: string) => {
    if (!arrivedStops.includes(stopId)) {
      setArrivedStops((prev) => [...prev, stopId]);
      const stop = MOCK_ROUTE_03_STOPS.find((s) => s.id === stopId);
      showToast(`Arrived at ${stop?.name || "stop"}. Notified waiting parents.`);
    }
  };

  const toggleRiderStatus = (studentId: string) => {
    setRiders((prev) =>
      prev.map((rider) => {
        if (rider.studentId !== studentId) return rider;
        let nextStatus: TripRider["status"] = "Not picked";
        if (rider.status === "Not picked") nextStatus = "Picked";
        else if (rider.status === "Picked") nextStatus = "Dropped";
        else if (rider.status === "Dropped") nextStatus = "Not picked";
        else if (rider.status === "No-show") nextStatus = "Picked";

        const label =
          nextStatus === "Picked"
            ? "Boarded Safely"
            : nextStatus === "Dropped"
            ? "Dropped Off"
            : "Reset to Pending";

        showToast(`${rider.studentName}: ${label}`);
        return {
          ...rider,
          status: nextStatus,
          boardedTime: nextStatus === "Picked" ? "07:12 AM" : rider.boardedTime,
        };
      }),
    );
  };

  const markRiderNoShow = (studentId: string) => {
    setRiders((prev) =>
      prev.map((rider) => {
        if (rider.studentId !== studentId) return rider;
        return {
          ...rider,
          status: "No-show",
          notes: "Parent reported illness / not at curb",
        };
      }),
    );
    showToast("Marked as Student No-Show. Homeroom & Admin updated.");
    setSelectedRider(null);
  };

  const simulateScan = () => {
    setScanComplete(true);
    setRiders((prev) =>
      prev.map((r) =>
        r.studentId === "stu-chanthou-rath"
          ? { ...r, status: "Picked", boardedTime: "07:24 AM" }
          : r,
      ),
    );
    showToast("Scanned QR: Chanthou Rath verified onboard.");
  };

  const submitIncident = () => {
    if (!incidentNotes.trim()) return;
    const newInc = {
      id: `inc-${Date.now()}`,
      tripId: MOCK_TRIP_03_AM.id,
      routeId: "route-03",
      routeName: "Route 03 · Toul Kork & Russian Blvd",
      type: incidentType as any,
      severity: incidentSeverity as any,
      timestamp: "Just now",
      loggedBy: "Driver Seng Vibol",
      notes: incidentNotes,
      photoAttached: photoAdded,
      status: "Investigating" as const,
      notifiedParentsCount: 18,
    };
    setIncidentsList([newInc, ...incidentsList]);
    setIncidentOpen(false);
    showToast("Incident logged. School Operations & Parents alerted.");
  };

  const finishTrip = () => {
    setScreen("completion");
  };

  const resetTrip = () => {
    setScreen("trips");
    setTab("stops");
  };

  const toggleSync = () => {
    setIsOnline((prev) => {
      const next = !prev;
      showToast(
        next
          ? "Network online: Synced 3 offline boarding events!"
          : "Offline mode active. Boarding events queued locally on device.",
      );
      return next;
    });
  };

  return (
    <MobileDeviceFrame appName="Bus Staff App" roleBadge="Transport">
      <div className="relative flex h-full w-full flex-col bg-background select-none">
        {/* Top Toast Banner */}
        {busToast && (
          <div className="absolute top-3 inset-x-4 z-50 rounded-xl bg-slate-900 text-white p-2.5 text-center text-xs font-semibold shadow-2xl border border-white/20 animate-in fade-in slide-in-from-top-2">
            {busToast}
          </div>
        )}

        {/* ============================================================ */}
        {/* SCREEN 1: TODAY'S TRIPS                                      */}
        {/* ============================================================ */}
        {screen === "trips" && (
          <div className="flex h-full flex-col bg-background">
            {/* Modern Cockpit Header */}
            <header className="sticky top-0 z-20 border-b border-border/60 bg-card/95 px-4 pb-3 pt-3 text-foreground backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="grid size-9 place-items-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30">
                    <Bus className="size-4.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h1 className="text-sm font-bold text-foreground">School OS</h1>
                      <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-400 border border-amber-500/25">
                        Fleet Driver
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">Bus KH 2A-9412 · Seng Vibol</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleSync}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold transition cursor-pointer border",
                      isOnline
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
                    )}
                    title="Tap to toggle online/offline simulation"
                  >
                    {isOnline ? (
                      <>
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <Wifi className="size-3 text-emerald-600 dark:text-emerald-400" /> Online
                      </>
                    ) : (
                      <>
                        <CloudOff className="size-3 text-amber-600 dark:text-amber-400" /> Offline
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setDriverProfileOpen(true)}
                    className="grid size-8 place-items-center rounded-full bg-muted text-foreground border border-border/70 cursor-pointer hover:bg-muted/80 transition"
                    title="Driver Profile"
                  >
                    <CircleUserRound className="size-4.5" />
                  </button>
                </div>
              </div>

              {/* Demo Journey Scenario Switcher */}
              <div className="mt-3 rounded-xl border border-border/70 bg-muted/40 p-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-muted-foreground">
                    Demo Journey
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">3 Scenarios</span>
                </div>
                <div className="mt-1.5 grid grid-cols-3 gap-1">
                  {[
                    { id: "normal", label: "Normal AM" },
                    { id: "delayed-noshow", label: "Delayed + No-Show" },
                    { id: "afternoon-guardian", label: "PM Drop-Off" },
                  ].map((sc) => (
                    <button
                      key={sc.id}
                      onClick={() => {
                        setScenario(sc.id as DemoScenario);
                        showToast(`Switched scenario to ${sc.label}`);
                      }}
                      className={cn(
                        "rounded-lg px-1.5 py-1 text-[10px] font-bold transition cursor-pointer text-center",
                        scenario === sc.id
                          ? "bg-foreground text-background shadow-xs"
                          : "bg-card text-muted-foreground hover:text-foreground border border-border/40",
                      )}
                    >
                      {sc.label}
                    </button>
                  ))}
                </div>
              </div>
            </header>

            {/* Trips List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold text-foreground">
                  Today's Active Trips · 21 Sep 2026
                </h2>
                <Badge variant="outline" className="text-[10px] border-amber-500/40 text-amber-700 dark:text-amber-300">
                  Bus KH 2A-9412
                </Badge>
              </div>

              {/* Active Trip Card: Route 03 AM */}
              <div className="rounded-xl border border-border/80 bg-card p-4 shadow-2xs relative">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-[10px]">
                        AM Session · Morning Inbound
                      </Badge>
                      <Badge className="text-[10px]">Active Run</Badge>
                    </div>
                    <h3 className="mt-2 text-sm font-bold text-foreground">
                      Route 03 · Toul Kork & Russian Blvd
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Campus Arrival: Gate 2 · 07:35 AM
                    </p>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 rounded-lg bg-muted/50 p-2.5 text-center text-xs">
                  <div>
                    <p className="text-[10px] text-muted-foreground">Stops</p>
                    <p className="font-bold text-foreground">5 Stops</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Riders</p>
                    <p className="font-bold text-foreground">24 Subscribed</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Status</p>
                    <p className="font-bold text-amber-700 dark:text-amber-400">
                      {scenario === "delayed-noshow" ? "+12m Delay" : "On Time"}
                    </p>
                  </div>
                </div>

                {scenario === "delayed-noshow" && (
                  <div className="mt-2.5 flex items-center gap-2 rounded-md bg-muted/60 px-2.5 py-1.5 text-[11px] font-semibold text-foreground border border-border/60">
                    <AlertTriangle className="size-3.5 text-amber-600 shrink-0" />
                    <span>Roadwork on Russian Blvd. ETA revised.</span>
                  </div>
                )}

                <Button
                  onClick={startTrip}
                  className="mt-3.5 h-11 w-full bg-amber-500 text-amber-950 font-bold hover:bg-amber-400 text-xs shadow-md cursor-pointer gap-2"
                >
                  <Bus className="size-4" /> Open Active Trip Runner
                </Button>
              </div>

              {/* Scheduled Afternoon Trip */}
              <div className="rounded-xl border border-border bg-card p-4 shadow-xs opacity-90">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block rounded bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                      PM Session · Afternoon Outbound
                    </span>
                    <h3 className="mt-1 text-sm font-bold text-foreground">
                      Route 03 · Toul Kork & Russian Blvd
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Departs Campus: 03:45 PM · 24 Riders
                    </p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    Scheduled
                  </Badge>
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  Manifest locked. Afternoon pickup notes from parents will be updated before 3:00 PM.
                </p>
              </div>

              {/* Scheduled Alternate Route */}
              <div className="rounded-xl border border-border bg-card p-4 shadow-xs opacity-75">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block rounded bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                      PM Standby
                    </span>
                    <h3 className="mt-1 text-sm font-bold text-foreground">
                      Route 07 · Chamkarmon & BKK1
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Standby Assistant assigned · 04:15 PM
                    </p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    Standby
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SCREEN 2-4: ACTIVE TRIP RUNNER (STOPS, RIDERS, INCIDENTS)    */}
        {/* ============================================================ */}
        {screen === "trip" && (
          <div className="flex h-full flex-col bg-background">
            {/* Header */}
            <header className="sticky top-0 z-20 border-b border-border/60 bg-card/95 px-4 pb-3 pt-3 text-foreground backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setScreen("trips")}
                  className="size-8 text-foreground hover:bg-muted cursor-pointer"
                >
                  <ArrowLeft className="size-5" />
                </Button>
                <div className="min-w-0 flex-1 px-2">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-xs font-extrabold text-foreground">Route 03 · Toul Kork</p>
                    <span className="rounded-full bg-amber-500/15 px-1.5 py-0.2 text-[9px] font-bold text-amber-700 dark:text-amber-400">
                      Live Trip
                    </span>
                  </div>
                  <p className="truncate text-[10px] text-muted-foreground">
                    Bus KH 2A-9412 · Driver: Seng Vibol
                  </p>
                </div>
                <button
                  onClick={toggleSync}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold transition cursor-pointer border",
                    isOnline
                      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
                  )}
                >
                  {isOnline ? <Wifi className="size-3 text-emerald-600 dark:text-emerald-400" /> : <CloudOff className="size-3 text-amber-600 dark:text-amber-400" />}
                  <span>{isOnline ? "Live" : "Offline"}</span>
                </button>
              </div>

              {/* Live Metric Banner */}
              <div className="mt-2.5 flex items-center justify-between rounded-lg bg-muted/60 px-3 py-1.5 text-xs font-semibold text-foreground border border-border/60">
                <div className="flex items-center gap-1.5">
                  <Clock3 className="size-3.5 text-muted-foreground" />
                  <span>Started 06:35 AM</span>
                  {scenario === "delayed-noshow" && (
                    <span className="rounded bg-rose-600 px-1.5 py-0.2 text-[9px] text-white font-bold">
                      +12m
                    </span>
                  )}
                </div>
                <span className="text-muted-foreground">
                  <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{boardedCount}</strong> Boarded · <strong className="text-rose-600 dark:text-rose-400 font-bold">{noShowCount}</strong> No-show
                </span>
              </div>
            </header>

            {/* Tabs */}
            <nav className="flex border-b border-border bg-card text-xs font-semibold">
              <button
                onClick={() => setTab("stops")}
                className={cn(
                  "flex-1 py-2.5 flex items-center justify-center gap-1.5 border-b-2 transition cursor-pointer",
                  tab === "stops"
                    ? "border-amber-500 text-amber-700 dark:text-amber-400 font-bold bg-amber-500/5"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <MapPin className="size-3.5" />
                <span>Stops ({arrivedStops.length}/5)</span>
              </button>
              <button
                onClick={() => setTab("riders")}
                className={cn(
                  "flex-1 py-2.5 flex items-center justify-center gap-1.5 border-b-2 transition cursor-pointer",
                  tab === "riders"
                    ? "border-amber-500 text-amber-700 dark:text-amber-400 font-bold bg-amber-500/5"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <Users className="size-3.5" />
                <span>Riders ({boardedCount})</span>
              </button>
              <button
                onClick={() => setTab("incidents")}
                className={cn(
                  "flex-1 py-2.5 flex items-center justify-center gap-1.5 border-b-2 transition cursor-pointer relative",
                  tab === "incidents"
                    ? "border-amber-500 text-amber-700 dark:text-amber-400 font-bold bg-amber-500/5"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <ShieldAlert className="size-3.5" />
                <span>Incidents ({incidentsList.length})</span>
                {incidentsList.length > 0 && (
                  <span className="size-1.5 rounded-full bg-rose-500 absolute top-2 right-4" />
                )}
              </button>
            </nav>

            {/* View Content */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
              {/* ---------------------------------------------------- */}
              {/* SUBVIEW 1: STOPS                                     */}
              {/* ---------------------------------------------------- */}
              {tab === "stops" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Ordered Route Sequence</span>
                    <span>Tap "Arrived" at each stop</span>
                  </div>

                  {MOCK_ROUTE_03_STOPS.map((stop, idx) => {
                    const hasArrived = arrivedStops.includes(stop.id);
                    const isNext = !hasArrived && idx === arrivedStops.length;

                    return (
                      <div
                        key={stop.id}
                        className={cn(
                          "rounded-xl border p-3 transition-all",
                          hasArrived
                            ? "border-emerald-500/40 bg-emerald-500/5"
                            : isNext
                            ? "border-amber-500 bg-amber-500/5 shadow-xs"
                            : "border-border bg-card opacity-70",
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2.5">
                            <div
                              className={cn(
                                "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold",
                                hasArrived
                                  ? "bg-emerald-500 text-white"
                                  : isNext
                                  ? "bg-amber-500 text-amber-950 font-bold animate-pulse"
                                  : "bg-muted text-muted-foreground",
                              )}
                            >
                              {hasArrived ? <Check className="size-3.5" /> : stop.sequence}
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-foreground">{stop.name}</h4>
                              <p className="text-[11px] text-muted-foreground">{stop.landmark}</p>
                            </div>
                          </div>

                          <span className="font-mono text-xs font-semibold text-muted-foreground">
                            {stop.scheduledPickupTime}
                          </span>
                        </div>

                        <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-border/60 text-xs">
                          <span className="text-[11px] text-muted-foreground">
                            {stop.expectedRidersCount} riders expected
                          </span>

                          {hasArrived ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="size-3.5" /> Arrived ({stop.actualArrivalTime || "06:42 AM"})
                            </span>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => markArrived(stop.id)}
                              className={cn(
                                "h-8 px-3 text-xs font-bold cursor-pointer",
                                isNext
                                  ? "bg-amber-500 text-amber-950 font-bold hover:bg-amber-400"
                                  : "bg-muted text-foreground hover:bg-muted/80",
                              )}
                            >
                              Mark Arrived
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Arrived at Campus / Finish Button */}
                  <div className="pt-2">
                    <Button
                      onClick={finishTrip}
                      className="h-11 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs gap-2 cursor-pointer shadow-md"
                    >
                      <Flag className="size-4" /> Reach Campus Gate 2 & Complete Trip
                    </Button>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* SUBVIEW 2: RIDERS                                    */}
              {/* ---------------------------------------------------- */}
              {tab === "riders" && (
                <div className="space-y-3">
                  {/* Search and QR scan buttons */}
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
                      <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search student, grade, or stop..."
                        className="h-9 pl-8 text-xs bg-card"
                      />
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        setScanComplete(false);
                        setScanOpen(true);
                      }}
                      className="h-9 gap-1.5 bg-amber-500 text-amber-950 font-bold hover:bg-amber-400 text-xs px-3 cursor-pointer shrink-0"
                    >
                      <QrCode className="size-3.5" /> Scan QR
                    </Button>
                  </div>

                  {/* Rider Boarding List */}
                  <div className="space-y-2">
                    {filteredRiders.map((rider) => {
                      const isPicked = rider.status === "Picked";
                      const isNoShow = rider.status === "No-show";
                      const isPending = rider.status === "Not picked";

                      return (
                        <div
                          key={rider.studentId}
                          className={cn(
                            "rounded-xl border p-3 transition-all",
                            isPicked
                              ? "border-emerald-500/40 bg-emerald-500/5"
                              : isNoShow
                              ? "border-rose-500/40 bg-rose-500/5"
                              : "border-border bg-card",
                          )}
                        >
                          <div className="flex items-start justify-between">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-xs text-foreground truncate">
                                  {rider.studentName}
                                </h4>
                                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                  {rider.grade}
                                </Badge>
                              </div>
                              <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                                Stop: {rider.stopName}
                              </p>
                              {rider.notes && (
                                <p className="text-[10px] text-amber-700 dark:text-amber-400 font-medium mt-1">
                                  Note: {rider.notes}
                                </p>
                              )}
                            </div>

                            <StatusChip status={rider.status} size="sm" />
                          </div>

                          {/* Large Tap Target Actions */}
                          <div className="mt-3 flex gap-2 pt-2 border-t border-border/60">
                            <Button
                              size="sm"
                              onClick={() => toggleRiderStatus(rider.studentId)}
                              className={cn(
                                "flex-1 h-9 text-xs font-bold cursor-pointer gap-1.5",
                                isPicked
                                  ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                                  : "bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900",
                              )}
                            >
                              <UserCheck className="size-3.5" />
                              {isPicked ? "Boarded (Tap to Change)" : "Mark Boarded"}
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markRiderNoShow(rider.studentId)}
                              className={cn(
                                "h-9 px-2.5 text-xs font-semibold cursor-pointer text-rose-600 border-rose-500/30 hover:bg-rose-500/10",
                                isNoShow && "bg-rose-500/20 font-bold",
                              )}
                              title="Mark No-Show"
                            >
                              <UserX className="size-3.5" />
                            </Button>

                            {rider.guardianPhone && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  showToast(
                                    `Calling Guardian ${rider.guardianName || ""} (${rider.guardianPhone})...`,
                                  )
                                }
                                className="h-9 px-2 text-xs font-semibold cursor-pointer border-border hover:border-primary"
                                title="Call Guardian"
                              >
                                <Phone className="size-3.5" />
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* SUBVIEW 3: INCIDENTS                                 */}
              {/* ---------------------------------------------------- */}
              {tab === "incidents" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">
                      Logged Route Incidents
                    </span>
                    <Button
                      size="sm"
                      onClick={() => setIncidentOpen(true)}
                      className="h-8 gap-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-3 cursor-pointer"
                    >
                      <ShieldAlert className="size-3.5" /> Log New Incident
                    </Button>
                  </div>

                  {incidentsList.map((inc) => (
                    <div
                      key={inc.id}
                      className="rounded-xl border border-rose-500/30 bg-card p-3.5 shadow-xs space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="rounded bg-rose-500/15 px-2 py-0.5 text-[10px] font-bold text-rose-700 dark:text-rose-400">
                              {inc.severity} Severity
                            </span>
                            <span className="text-xs font-bold text-foreground">
                              {inc.type}
                            </span>
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            {inc.timestamp} · Logged by {inc.loggedBy}
                          </p>
                        </div>
                        <StatusChip status={inc.status} size="sm" />
                      </div>

                      <p className="text-xs text-foreground/90 leading-relaxed">
                        {inc.notes}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-border/60 text-[10px] text-muted-foreground">
                        <span>Broadcast sent to {inc.notifiedParentsCount} parent devices</span>
                        {inc.photoAttached && (
                          <span className="flex items-center gap-1 text-primary font-semibold">
                            <Camera className="size-3" /> Photo attached
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SCREEN 5: TRIP COMPLETION SUMMARY                            */}
        {/* ============================================================ */}
        {screen === "completion" && (
          <div className="flex h-full flex-col bg-background p-4">
            <div className="my-auto space-y-4 text-center">
              <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-sm animate-in zoom-in-75">
                <Check className="size-8" />
              </div>

              <div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  Campus Arrival Confirmed
                </span>
                <h2 className="mt-2 text-lg font-bold text-foreground">
                  Trip Completed Safely
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Route 03 AM · Arrived at Phnom Penh Main Campus Gate 2 at 07:38 AM
                </p>
              </div>

              {/* Summary Stats Card */}
              <div className="grid grid-cols-3 gap-2 rounded-xl border border-border bg-card p-3 text-center">
                <div>
                  <p className="text-[10px] text-muted-foreground">Riders Boarded</p>
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {boardedCount}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">No-Shows</p>
                  <p className="text-lg font-bold text-rose-600 dark:text-rose-400">
                    {noShowCount}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Incidents</p>
                  <p className="text-lg font-bold text-amber-600 dark:text-amber-400">
                    {incidentsList.length}
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-muted/60 p-3 text-left text-xs space-y-1">
                <p className="font-bold text-foreground">Auto-Sync Confirmation:</p>
                <p className="text-muted-foreground text-[11px]">
                  • Attendance records auto-pushed to Grade 6A and Grade 2B homeroom teachers.
                </p>
                <p className="text-muted-foreground text-[11px]">
                  • Campus arrival push notification delivered to 24 family accounts.
                </p>
              </div>

              <Button
                onClick={resetTrip}
                className="h-11 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer shadow-md dark:bg-slate-100 dark:text-slate-900"
              >
                Back to Today's Trips
              </Button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* MODAL: QR CODE SCANNER SIMULATOR                             */}
        {/* ============================================================ */}
        <Dialog open={scanOpen} onOpenChange={setScanOpen}>
          <DialogContent className="w-[320px] rounded-2xl p-4 text-center">
            <DialogHeader className="text-center">
              <DialogTitle className="text-sm font-bold">QR Student Boarding</DialogTitle>
              <DialogDescription className="text-xs">
                Simulate camera scan of student digital ID badge.
              </DialogDescription>
            </DialogHeader>

            {!scanComplete ? (
              <div className="space-y-4 py-2">
                <div className="relative mx-auto grid size-44 place-items-center rounded-2xl border-2 border-dashed border-amber-500 bg-muted/30">
                  <div className="absolute inset-2 border border-amber-500/40 rounded-xl" />
                  <QrCode className="size-20 text-muted-foreground/40 animate-pulse" />
                </div>
                <Button
                  onClick={simulateScan}
                  className="h-10 w-full bg-amber-500 text-amber-950 font-bold hover:bg-amber-400 text-xs cursor-pointer"
                >
                  Simulate QR Scan (Chanthou Rath)
                </Button>
              </div>
            ) : (
              <div className="space-y-3 py-2">
                <div className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-500 text-white shadow-md">
                  <Check className="size-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground">Chanthou Rath · Grade 6A</h4>
                  <p className="text-xs text-muted-foreground">Boarding logged at 07:24 AM</p>
                </div>
                <Button
                  onClick={() => setScanOpen(false)}
                  className="h-9 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
                >
                  Done
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* ============================================================ */}
        {/* MODAL: LOG SAFETY INCIDENT                                   */}
        {/* ============================================================ */}
        <Dialog open={incidentOpen} onOpenChange={setIncidentOpen}>
          <DialogContent className="w-[320px] rounded-2xl p-4 text-left">
            <DialogHeader>
              <DialogTitle className="text-sm font-bold">Log Safety Incident</DialogTitle>
              <DialogDescription className="text-xs">
                Immediately broadcasts alert to school operations and families.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-1">
              <div>
                <label className="text-xs font-semibold text-foreground">
                  Incident Category *
                </label>
                <Select value={incidentType} onValueChange={setIncidentType}>
                  <SelectTrigger className="h-9 text-xs mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Traffic delay">Traffic delay / Congestion</SelectItem>
                    <SelectItem value="Student no-show">Student no-show at stop</SelectItem>
                    <SelectItem value="Vehicle breakdown">Vehicle mechanical issue</SelectItem>
                    <SelectItem value="Medical issue">Medical / Student illness</SelectItem>
                    <SelectItem value="Parent not at stop">Parent / Guardian absent at drop-off</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">
                  Severity Level *
                </label>
                <div className="grid grid-cols-3 gap-1.5 mt-1">
                  {["Low", "Medium", "High"].map((sev) => (
                    <button
                      key={sev}
                      onClick={() => setIncidentSeverity(sev)}
                      className={cn(
                        "rounded py-1.5 text-xs font-bold border transition cursor-pointer text-center",
                        incidentSeverity === sev
                          ? "bg-rose-600 text-white border-rose-600"
                          : "border-border bg-card text-muted-foreground hover:bg-muted",
                      )}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">
                  Situation Details *
                </label>
                <Textarea
                  value={incidentNotes}
                  onChange={(e) => setIncidentNotes(e.target.value)}
                  className="mt-1 min-h-16 text-xs"
                  placeholder="Explain delay reason, street name, and safety status..."
                />
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setPhotoAdded(!photoAdded)}
                className="w-full text-xs font-semibold gap-1.5 cursor-pointer"
              >
                <Camera className="size-3.5" />
                {photoAdded ? "Photo attached (Roadwork.jpg)" : "Attach Photo of Roadwork"}
              </Button>

              <Button
                onClick={submitIncident}
                disabled={!incidentNotes.trim()}
                className="h-10 w-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs cursor-pointer shadow-sm"
              >
                Broadcast Incident Alert
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* ============================================================ */}
        {/* MODAL: DRIVER PROFILE & VEHICLE INSPECTION                   */}
        {/* ============================================================ */}
        <Dialog open={driverProfileOpen} onOpenChange={setDriverProfileOpen}>
          <DialogContent className="w-[320px] rounded-2xl p-4 text-left">
            <DialogHeader>
              <DialogTitle className="text-sm font-bold">Driver & Fleet Profile</DialogTitle>
              <DialogDescription className="text-xs">
                Transport credentials and daily inspection record.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2 text-xs">
              <div className="flex items-center gap-3 rounded-xl bg-muted/60 p-3">
                <div className="grid size-10 place-items-center rounded-full bg-amber-500 text-amber-950 font-bold">
                  SV
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Seng Vibol</h4>
                  <p className="text-[11px] text-muted-foreground">Commercial Bus Driver · License #KH-88219</p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                    ✓ Clean Safety Record (4 Years)
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 border-t pt-2 text-[11px]">
                <div className="flex justify-between py-1 border-b border-border/60">
                  <span className="text-muted-foreground">Bus Assistant</span>
                  <span className="font-bold">Chea Sreyneang</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/60">
                  <span className="text-muted-foreground">Bus Vehicle</span>
                  <span className="font-bold">Hyundai County (Plate KH 2A-9412)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/60">
                  <span className="text-muted-foreground">Seating Capacity</span>
                  <span className="font-bold">28 Seats (24 Subscribed)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Pre-Trip Inspection</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    Passed (Brakes, Tires, First-Aid)
                  </span>
                </div>
              </div>

              <Button
                onClick={() => setDriverProfileOpen(false)}
                className="h-9 w-full text-xs font-bold cursor-pointer"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MobileDeviceFrame>
  );
}