import { useMemo, useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  Bus,
  Camera,
  Check,
  ChevronRight,
  CircleUserRound,
  Clock3,
  CloudOff,
  MapPin,
  Phone,
  QrCode,
  Search,
  ShieldAlert,
  ShieldCheck,
  Users,
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

type Screen = "trips" | "trip";
type TripTab = "stops" | "riders" | "incidents";
type RiderStatus = "Not picked" | "Picked" | "Dropped";

type Rider = {
  id: number;
  name: string;
  khmerName: string;
  grade: string;
  stop: string;
  status: RiderStatus;
  parentName: string;
  parentPhone: string;
  note?: string;
};

const initialRiders: Rider[] = [
  { id: 1, name: "Dara Sok", khmerName: "សុខ ដារ៉ា", grade: "G5-A", stop: "Tuol Kork Market", status: "Picked", parentName: "Sokha Meas", parentPhone: "+855 12 778 899" },
  { id: 2, name: "Sreyneang Lim", khmerName: "លឹម ស្រីនាង", grade: "G4-B", stop: "Tuol Kork Market", status: "Picked", parentName: "Kosal Lim", parentPhone: "+855 17 445 221" },
  { id: 3, name: "Vannak Chea", khmerName: "ជា វណ្ណៈ", grade: "G6-A", stop: "TK Avenue", status: "Not picked", parentName: "Borey Chea", parentPhone: "+855 78 990 112" },
  { id: 4, name: "Sophea Chan", khmerName: "ចាន់ សុភា", grade: "G3-C", stop: "TK Avenue", status: "Not picked", parentName: "Thyda Chan", parentPhone: "+855 16 332 109" },
  { id: 5, name: "Makara Heng", khmerName: "ហេង មករា", grade: "G5-B", stop: "Street 315", status: "Not picked", parentName: "Channa Heng", parentPhone: "+855 93 442 881" },
  { id: 6, name: "Bopha Kim", khmerName: "គឹម បុប្ផា", grade: "G4-A", stop: "Street 315", status: "Not picked", parentName: "Rath Kim", parentPhone: "+855 12 554 990" },
];

const stops = [
  { id: 1, time: "06:30", name: "School Depot", khmer: "សាលារៀន", riders: 0 },
  { id: 2, time: "06:42", name: "Tuol Kork Market", khmer: "ផ្សារទួលគោក", riders: 2 },
  { id: 3, time: "06:55", name: "TK Avenue", khmer: "ធីខេ អាវិនយូ", riders: 2 },
  { id: 4, time: "07:08", name: "Street 315", khmer: "ផ្លូវ ៣១៥", riders: 2 },
  { id: 5, time: "07:25", name: "Cambodia School", khmer: "សាលាកម្ពុជា", riders: 6 },
];

const trips = [
  { id: 1, route: "Route 03 · Tuol Kork", khmer: "ខ្សែទី ០៣ · ទួលគោក", session: "AM", time: "06:30", riders: 18, status: "Ready" },
  { id: 2, route: "Route 03 · Tuol Kork", khmer: "ខ្សែទី ០៣ · ទួលគោក", session: "PM", time: "15:35", riders: 20, status: "Scheduled" },
  { id: 3, route: "Route 07 · Sen Sok", khmer: "ខ្សែទី ០៧ · សែនសុខ", session: "PM", time: "16:10", riders: 14, status: "Scheduled" },
];

export function BusStaffApp() {
  const [screen, setScreen] = useState<Screen>("trips");
  const [tab, setTab] = useState<TripTab>("stops");
  const [arrivedStops, setArrivedStops] = useState<number[]>([1, 2]);
  const [riders, setRiders] = useState(initialRiders);
  const [search, setSearch] = useState("");
  const [scanOpen, setScanOpen] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [incidentType, setIncidentType] = useState("");
  const [incidentNotes, setIncidentNotes] = useState("");
  const [photoAdded, setPhotoAdded] = useState(false);
  const [incidentLogged, setIncidentLogged] = useState(false);
  const [tripComplete, setTripComplete] = useState(false);

  // New interactive states
  const [isOnline, setIsOnline] = useState(true);
  const [driverProfileOpen, setDriverProfileOpen] = useState(false);
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
  const [busToast, setBusToast] = useState<string | null>(null);

  const pickedCount = riders.filter((rider) => rider.status !== "Not picked").length;
  const filteredRiders = useMemo(
    () => riders.filter((rider) => `${rider.name} ${rider.khmerName}`.toLowerCase().includes(search.toLowerCase())),
    [riders, search],
  );

  const startTrip = () => {
    setScreen("trip");
    setTab("stops");
  };

  const markArrived = (id: number) => {
    setArrivedStops((current) => (current.includes(id) ? current : [...current, id]));
  };

  const advanceRider = (id: number) => {
    setRiders((current) =>
      current.map((rider) => {
        if (rider.id !== id) return rider;
        const nextStatus: RiderStatus = rider.status === "Not picked" ? "Picked" : rider.status === "Picked" ? "Dropped" : "Dropped";
        return { ...rider, status: nextStatus };
      }),
    );
  };

  const simulateScan = () => {
    setScanComplete(true);
    setRiders((current) => current.map((rider) => (rider.id === 3 ? { ...rider, status: "Picked" } : rider)));
  };

  const submitIncident = () => {
    if (!incidentType || !incidentNotes.trim()) return;
    setIncidentLogged(true);
    setIncidentOpen(false);
    setIncidentType("");
    setIncidentNotes("");
    setPhotoAdded(false);
  };

  const resetTrip = () => {
    setScreen("trips");
    setTripComplete(false);
    setTab("stops");
  };

  const toggleSync = () => {
    setIsOnline((prev) => {
      const next = !prev;
      setBusToast(next ? "Network online: Synced 3 offline records to cloud!" : "Offline mode active. Changes queued locally.");
      setTimeout(() => setBusToast(null), 2500);
      return next;
    });
  };

  const handleCall = (name: string, phone: string) => {
    setBusToast(`Calling ${name} (${phone})...`);
    setTimeout(() => setBusToast(null), 3000);
    setSelectedRider(null);
  };

  const handleReportNoShow = (id: number) => {
    setRiders((prev) => prev.map((r) => r.id === id ? { ...r, status: "Not picked", note: "Reported No-Show / Absent" } : r));
    setBusToast(`Marked rider as Absent / No-Show. Route proceeding.`);
    setTimeout(() => setBusToast(null), 3000);
    setSelectedRider(null);
  };

  return (
    <MobileDeviceFrame appName="Bus Staff App" roleBadge="Transport">
      <div className="relative flex h-full w-full flex-col bg-background">
        {/* Top Toast Banner */}
        {busToast && (
          <div className="absolute top-3 inset-x-4 z-50 rounded-lg bg-primary text-primary-foreground p-2.5 text-center text-xs font-semibold shadow-xl animate-in fade-in slide-in-from-top-2">
            {busToast}
          </div>
        )}

        {screen === "trips" ? (
          <TripsScreen
            onStart={startTrip}
            onOpenDriver={() => setDriverProfileOpen(true)}
            isOnline={isOnline}
            onToggleSync={toggleSync}
          />
        ) : (
          <div className="flex h-full flex-col bg-background">
            <header className="bus-header px-4 pb-3 pt-3 text-bus-foreground">
              <div className="flex items-center justify-between">
                <Button variant="busGhost" size="iconTouch" onClick={() => setScreen("trips")} aria-label="Back to today's trips">
                  <ArrowLeft />
                </Button>
                <div className="min-w-0 flex-1 px-2">
                  <p className="truncate text-sm font-bold">Route 03 · Tuol Kork</p>
                  <p className="truncate text-xs opacity-80">ខ្សែទី ០៣ · ទួលគោក · AM</p>
                </div>
                <button
                  onClick={toggleSync}
                  className="sync-pill cursor-pointer hover:opacity-80 transition"
                  title="Tap to toggle online/offline state"
                >
                  {isOnline ? (
                    <>
                      <Wifi className="size-3.5" /> Synced
                    </>
                  ) : (
                    <>
                      <CloudOff className="size-3.5" /> Offline
                    </>
                  )}
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between rounded-md bg-bus-foreground/10 px-3 py-2">
                <div className="flex items-center gap-2"><Clock3 className="size-4" /><span className="text-xs font-semibold">Started 06:30 · 34 min</span></div>
                <span className="text-xs font-bold">{arrivedStops.length}/5 stops</span>
              </div>
            </header>

            <nav className="trip-tabs" aria-label="Trip sections">
              <TripTabButton active={tab === "stops"} icon={MapPin} label="Stops" khmer="ចំណត" onClick={() => setTab("stops")} />
              <TripTabButton active={tab === "riders"} icon={Users} label="Riders" khmer="សិស្ស" onClick={() => setTab("riders")} />
              <TripTabButton active={tab === "incidents"} icon={ShieldAlert} label="Incidents" khmer="ហេតុការណ៍" onClick={() => setTab("incidents")} alert={incidentLogged} />
            </nav>

            <div className="min-h-0 flex-1 overflow-y-auto">
              {tab === "stops" && <StopsView arrivedStops={arrivedStops} onArrive={markArrived} onFinish={() => setTripComplete(true)} />}
              {tab === "riders" && (
                <RidersView
                  riders={filteredRiders}
                  search={search}
                  setSearch={setSearch}
                  onAdvance={advanceRider}
                  onScan={() => { setScanComplete(false); setScanOpen(true); }}
                  pickedCount={pickedCount}
                  onSelectRider={(r) => setSelectedRider(r)}
                />
              )}
              {tab === "incidents" && <IncidentsView logged={incidentLogged} onLog={() => setIncidentOpen(true)} />}
            </div>
          </div>
        )}
      </div>

      {/* QR Code Scanner Dialog */}
      <Dialog open={scanOpen} onOpenChange={setScanOpen}>
        <DialogContent className="w-[328px] rounded-lg p-4">
          <DialogHeader className="text-left">
            <DialogTitle>Scan student ID</DialogTitle>
            <DialogDescription>ស្កេនកូដសិស្ស · Center the QR code in the frame.</DialogDescription>
          </DialogHeader>
          {!scanComplete ? (
            <>
              <div className="scanner-box" aria-label="Simulated QR scanner"><span /><span /><span /><span /><QrCode className="size-14 text-muted-foreground/40" /></div>
              <Button variant="bus" size="touch" className="w-full cursor-pointer" onClick={simulateScan}><QrCode /> Simulate scan</Button>
            </>
          ) : (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-success-soft text-success"><Check className="size-7" /></div>
              <div><p className="font-bold">Vannak Chea · G6-A</p><p className="text-sm text-muted-foreground">Pickup recorded at TK Avenue</p></div>
              <Button variant="success" size="touch" className="w-full cursor-pointer" onClick={() => setScanOpen(false)}>Done · រួចរាល់</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Incident Logger Dialog */}
      <Dialog open={incidentOpen} onOpenChange={setIncidentOpen}>
        <DialogContent className="w-[328px] rounded-lg p-4">
          <DialogHeader className="text-left">
            <DialogTitle>Log safety incident</DialogTitle>
            <DialogDescription>កត់ត្រាហេតុការណ៍ · Required fields are marked.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <label className="form-label">Incident type *</label>
            <Select value={incidentType} onValueChange={setIncidentType}>
              <SelectTrigger className="h-11"><SelectValue placeholder="Select incident type" /></SelectTrigger>
              <SelectContent><SelectItem value="delay">Traffic delay</SelectItem><SelectItem value="rider">Rider not at stop</SelectItem><SelectItem value="medical">Medical / safety</SelectItem><SelectItem value="vehicle">Vehicle issue</SelectItem></SelectContent>
            </Select>
            <label className="form-label">Notes *</label>
            <Textarea value={incidentNotes} onChange={(event) => setIncidentNotes(event.target.value)} placeholder="Describe what happened…" className="min-h-20" />
            <Button variant="outline" size="touch" className="w-full cursor-pointer" onClick={() => setPhotoAdded((value) => !value)}>{photoAdded ? <Check /> : <Camera />}{photoAdded ? "Photo attached" : "Add photo · បន្ថែមរូប"}</Button>
            <Button variant="destructive" size="touch" className="w-full cursor-pointer" disabled={!incidentType || !incidentNotes.trim()} onClick={submitIncident}><ShieldAlert /> Log incident</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Trip Complete Dialog */}
      <Dialog open={tripComplete} onOpenChange={setTripComplete}>
        <DialogContent className="w-[328px] rounded-lg p-5 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-success-soft text-success"><Check className="size-8" /></div>
          <DialogHeader><DialogTitle>Trip completed safely</DialogTitle><DialogDescription>ការធ្វើដំណើរបានបញ្ចប់ · 5 stops · {pickedCount} rider events · {incidentLogged ? "1 incident" : "No incidents"}</DialogDescription></DialogHeader>
          <Button variant="success" size="touch" className="cursor-pointer" onClick={resetTrip}>Back to today’s trips</Button>
        </DialogContent>
      </Dialog>

      {/* Driver Profile Dialog */}
      <Dialog open={driverProfileOpen} onOpenChange={setDriverProfileOpen}>
        <DialogContent className="w-[320px] rounded-2xl p-5 text-left text-xs">
          <DialogHeader className="text-left border-b pb-2">
            <DialogTitle className="text-base font-bold">Bus Staff Profile</DialogTitle>
            <DialogDescription className="text-xs">Driver & Vehicle Assignment</DialogDescription>
          </DialogHeader>
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-full bg-bus text-bus-foreground font-bold text-base">
                SV
              </div>
              <div>
                <p className="font-bold text-sm text-foreground">S. Vibol (Driver)</p>
                <p className="text-[10px] text-muted-foreground">ID: BUS-DRV-04 · License KH-99201</p>
                <Badge variant="outline" className="mt-1 text-[9px] text-emerald-800 bg-emerald-100 border-emerald-300 font-bold">
                  Verified Clean Record
                </Badge>
              </div>
            </div>

            <div className="space-y-1.5 rounded-lg border border-border bg-muted/40 p-2.5 text-[11px]">
              <div className="flex justify-between py-1 border-b border-border/60">
                <span className="text-muted-foreground">Bus Vehicle</span>
                <span className="font-bold">Bus B-12 (Plate 2AB-4301)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/60">
                <span className="text-muted-foreground">Assistant</span>
                <span className="font-semibold">Sreyneang Lim</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/60">
                <span className="text-muted-foreground">Route</span>
                <span className="font-semibold">Route 03 (Tuol Kork)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Total Capacity</span>
                <span className="font-semibold">30 Seats (18 Assigned)</span>
              </div>
            </div>

            <Button
              className="w-full text-xs font-semibold gap-1.5 cursor-pointer"
              variant="outline"
              onClick={() => handleCall("School Operations Dispatch", "+855 23 889 001")}
            >
              <Phone className="size-3.5 text-primary" /> Call Dispatch Center
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Rider Contact / Quick Info Dialog */}
      <Dialog open={Boolean(selectedRider)} onOpenChange={(open) => !open && setSelectedRider(null)}>
        {selectedRider && (
          <DialogContent className="w-[320px] rounded-2xl p-5 text-left text-xs">
            <DialogHeader className="text-left border-b pb-2">
              <DialogTitle className="text-base font-bold">{selectedRider.name}</DialogTitle>
              <DialogDescription className="text-xs">{selectedRider.khmerName} · {selectedRider.grade}</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 pt-2">
              <div className="space-y-1.5 rounded-lg border border-border bg-muted/40 p-2.5 text-[11px]">
                <div className="flex justify-between py-1 border-b border-border/60">
                  <span className="text-muted-foreground">Assigned Stop</span>
                  <span className="font-semibold">{selectedRider.stop}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/60">
                  <span className="text-muted-foreground">Pickup Status</span>
                  <span className="font-bold text-primary">{selectedRider.status}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/60">
                  <span className="text-muted-foreground">Parent / Guardian</span>
                  <span className="font-semibold">{selectedRider.parentName}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Phone Number</span>
                  <span className="font-mono font-bold text-foreground">{selectedRider.parentPhone}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1 text-xs gap-1 cursor-pointer"
                  onClick={() => handleCall(selectedRider.parentName, selectedRider.parentPhone)}
                >
                  <Phone className="size-3.5" /> Call Parent
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 text-xs text-destructive hover:bg-destructive/10 cursor-pointer"
                  onClick={() => handleReportNoShow(selectedRider.id)}
                >
                  Report No-Show
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </MobileDeviceFrame>
  );
}

function TripsScreen({
  onStart,
  onOpenDriver,
  isOnline,
  onToggleSync,
}: {
  onStart: () => void;
  onOpenDriver: () => void;
  isOnline: boolean;
  onToggleSync: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-background">
      <header className="bus-header px-4 pb-5 pt-4 text-bus-foreground">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3"><div className="bus-mark"><Bus className="size-5" /></div><div><p className="text-sm font-bold">School OS</p><p className="text-xs opacity-80">Bus Staff · បុគ្គលិកឡាន</p></div></div>
          <Button variant="busGhost" size="iconTouch" aria-label="Driver profile" className="cursor-pointer" onClick={onOpenDriver}><CircleUserRound /></Button>
        </div>
        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold opacity-75">SUNDAY · 20 SEP</p>
            <h1 className="mt-1 text-2xl font-bold">Today’s Trips</h1>
            <p className="text-sm opacity-80">ការធ្វើដំណើរថ្ងៃនេះ</p>
          </div>
          <button
            onClick={onToggleSync}
            className="sync-pill cursor-pointer hover:opacity-80 transition"
            title="Tap to toggle online/offline state"
          >
            {isOnline ? (
              <>
                <Wifi className="size-3.5" /> Online
              </>
            ) : (
              <>
                <CloudOff className="size-3.5" /> Offline
              </>
            )}
          </button>
        </div>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <div className="mb-3 flex items-center justify-between"><p className="text-sm font-semibold">3 assigned trips</p><span className="text-xs text-muted-foreground">Driver: S. Vibol</span></div>
        <div className="space-y-3">
          {trips.map((trip, index) => (
            <article key={trip.id} className={cn("trip-card", index === 0 && "trip-card-ready")}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3"><div className={cn("session-tile", index === 0 && "session-tile-active")}><span>{trip.session}</span><Bus className="size-5" /></div><div className="min-w-0"><h2 className="truncate text-sm font-bold">{trip.route}</h2><p className="truncate text-xs text-muted-foreground">{trip.khmer}</p><div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground"><span className="flex items-center gap-1"><Clock3 className="size-3.5" />{trip.time}</span><span className="flex items-center gap-1"><Users className="size-3.5" />{trip.riders}</span></div></div></div>
                <span
                  className={cn(
                    "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-bold shadow-none",
                    index === 0
                      ? "border-emerald-300 bg-emerald-100 text-emerald-950 font-bold"
                      : "border-slate-300 bg-slate-100 text-slate-800 font-bold"
                  )}
                >
                  {trip.status}
                </span>
              </div>
              {index === 0 && <Button variant="bus" size="touch" className="mt-4 w-full cursor-pointer" onClick={onStart}>Start trip · ចាប់ផ្តើម <ChevronRight /></Button>}
            </article>
          ))}
        </div>
        <div className="offline-note"><CloudOff className="size-4" /><span>Trip actions work offline and sync automatically.</span></div>
      </div>
    </div>
  );
}

function TripTabButton({ active, icon: Icon, label, khmer, onClick, alert }: { active: boolean; icon: typeof MapPin; label: string; khmer: string; onClick: () => void; alert?: boolean }) {
  return <button className={cn("trip-tab cursor-pointer", active && "trip-tab-active")} onClick={onClick}><span className="relative"><Icon className="size-5" />{alert && <span className="alert-dot" />}</span><span>{label}</span><small>{khmer}</small></button>;
}

function StopsView({ arrivedStops, onArrive, onFinish }: { arrivedStops: number[]; onArrive: (id: number) => void; onFinish: () => void }) {
  const nextStop = stops.find((stop) => !arrivedStops.includes(stop.id));
  return <div className="p-4"><div className="section-heading"><div><h2>Route stops</h2><p>ចំណតតាមខ្សែ · Tap when the bus arrives</p></div><Badge variant="outline">5 stops</Badge></div><div className="stop-list">{stops.map((stop, index) => { const arrived = arrivedStops.includes(stop.id); const current = nextStop?.id === stop.id; return <div className="stop-row" key={stop.id}><div className="stop-rail"><div className={cn("stop-node", arrived && "stop-node-done", current && "stop-node-current")}>{arrived ? <Check className="size-3.5" /> : index + 1}</div>{index < stops.length - 1 && <div className={cn("stop-line", arrived && "stop-line-done")} />}</div><div className={cn("stop-content", current && "stop-content-current")}><div className="flex items-start justify-between gap-2"><div><div className="flex items-center gap-2"><span className="text-xs font-bold text-muted-foreground">{stop.time}</span>{current && <span className="inline-flex items-center rounded border border-amber-400 bg-amber-200 px-1.5 py-0.5 text-[9px] font-extrabold text-amber-950">NEXT</span>}</div><h3>{stop.name}</h3><p>{stop.khmer}</p><span className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"><Users className="size-3.5" />{stop.riders} expected riders</span></div>{arrived ? <span className="arrival-done"><Check /> Arrived</span> : <Button variant={current ? "bus" : "outline"} size="smTouch" className="cursor-pointer" disabled={!current} onClick={() => onArrive(stop.id)}>Arrived</Button>}</div></div></div>; })}</div><Button variant="success" size="touch" className="mt-2 w-full cursor-pointer" disabled={arrivedStops.length < stops.length} onClick={onFinish}><Check /> Complete trip · បញ្ចប់</Button></div>;
}

function RidersView({
  riders,
  search,
  setSearch,
  onAdvance,
  onScan,
  pickedCount,
  onSelectRider,
}: {
  riders: Rider[];
  search: string;
  setSearch: (value: string) => void;
  onAdvance: (id: number) => void;
  onScan: () => void;
  pickedCount: number;
  onSelectRider: (rider: Rider) => void;
}) {
  return (
    <div className="p-4">
      <div className="section-heading">
        <div>
          <h2>Riders</h2>
          <p>សិស្សលើឡាន · {pickedCount}/{initialRiders.length} recorded (Tap rider for parent info)</p>
        </div>
        <Button variant="bus" size="iconTouch" onClick={onScan} aria-label="Scan QR or student ID" className="cursor-pointer">
          <QrCode />
        </Button>
      </div>
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search rider · ស្វែងរក" className="h-11 pl-9" />
      </div>
      <div className="space-y-2">
        {riders.map((rider) => (
          <article className="rider-row" key={rider.id}>
            <button
              onClick={() => onSelectRider(rider)}
              className="flex items-center gap-3 min-w-0 flex-1 text-left cursor-pointer hover:opacity-85"
            >
              <div className="rider-avatar">{rider.name.split(" ").map((part) => part[0]).join("")}</div>
              <div className="min-w-0 flex-1">
                <h3>{rider.name} <span>· {rider.grade}</span></h3>
                <p>{rider.khmerName}</p>
                <small className="block truncate">{rider.stop}</small>
                {rider.note && (
                  <span className="inline-block mt-0.5 text-[9px] text-destructive font-bold">
                    {rider.note}
                  </span>
                )}
              </div>
            </button>
            <button
              className={cn(
                "rider-status cursor-pointer",
                rider.status === "Picked" && "rider-picked",
                rider.status === "Dropped" && "rider-dropped"
              )}
              onClick={() => onAdvance(rider.id)}
              disabled={rider.status === "Dropped"}
            >
              {rider.status === "Not picked" && <X />}
              {rider.status !== "Not picked" && <Check />}
              {rider.status}
            </button>
          </article>
        ))}
      </div>
      <Button variant="outline" size="touch" className="mt-3 w-full cursor-pointer" onClick={onScan}>
        <QrCode /> Scan QR / ID · ស្កេន
      </Button>
    </div>
  );
}

function IncidentsView({ logged, onLog }: { logged: boolean; onLog: () => void }) {
  return <div className="p-4"><div className="section-heading"><div><h2>Safety events</h2><p>ហេតុការណ៍សុវត្ថិភាព</p></div><Button variant="destructive" size="smTouch" className="cursor-pointer" onClick={onLog}><AlertTriangle /> Log</Button></div>{logged && <article className="incident-card incident-critical"><div className="incident-icon"><AlertTriangle /></div><div><div className="flex items-center gap-2"><h3>Safety incident</h3><Badge variant="destructive">NEW</Badge></div><p>Reported just now · Photo attached</p><small>Saved offline · Waiting to sync</small></div></article>}<article className="incident-card"><div className="incident-icon incident-icon-warning"><Clock3 /></div><div><h3>Traffic delay</h3><p>06:51 · Monivong Blvd · +8 min</p><small>Reported to transport office</small></div></article>{!logged && <div className="empty-safety"><div className="empty-safety-icon"><ShieldAlert /></div><h3>No critical incidents</h3><p>មិនមានហេតុការណ៍ធ្ងន់ធ្ងរ<br />Log any delay, rider issue, or safety concern.</p></div>}<Button variant="destructive" size="touch" className="mt-4 w-full cursor-pointer" onClick={onLog}><AlertTriangle /> Log incident · កត់ត្រាហេតុការណ៍</Button></div>;
}