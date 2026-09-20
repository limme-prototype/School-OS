import { useState } from "react";
import {
  Calendar,
  ChevronRight,
  Heart,
  Mail,
  MapPin,
  MessageSquare,
  Search,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AlumniPortal() {
  const [tab, setTab] = useState<"feed" | "events" | "network">("feed");
  const [search, setSearch] = useState("");

  const alumni = [
    { name: "Serey Vathana", year: "Class of 2019", role: "Software Engineer at ABA Bank", city: "Phnom Penh", mentor: true },
    { name: "Monineath Chea", year: "Class of 2017", role: "Medical Doctor at Calmette Hospital", city: "Phnom Penh", mentor: true },
    { name: "Kosal Rath", year: "Class of 2021", role: "Graduate Student, Tokyo University", city: "Tokyo, Japan", mentor: false },
    { name: "Pisey Neth", year: "Class of 2015", role: "Architect & Urban Designer", city: "Siem Reap", mentor: true },
  ];

  return (
    <div className="min-h-[calc(100dvh-3rem)] bg-muted/20 text-foreground pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white py-8 px-4 sm:px-8 border-b">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-purple-200">
                🎓 Alumni Network
              </span>
              <h1 className="mt-2 text-2xl sm:text-3xl font-bold">School OS Alumni Portal</h1>
              <p className="mt-1 text-xs sm:text-sm text-purple-200/80">
                ផតថលអតីតសិស្ស · Stay connected, mentor current students, and give back to the school community.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={tab === "feed" ? "default" : "outline"}
                size="sm"
                className={tab === "feed" ? "bg-purple-600 text-white hover:bg-purple-500" : "text-white border-white/20 hover:bg-white/10"}
                onClick={() => setTab("feed")}
              >
                Community Feed
              </Button>
              <Button
                variant={tab === "events" ? "default" : "outline"}
                size="sm"
                className={tab === "events" ? "bg-purple-600 text-white hover:bg-purple-500" : "text-white border-white/20 hover:bg-white/10"}
                onClick={() => setTab("events")}
              >
                Events (3)
              </Button>
              <Button
                variant={tab === "network" ? "default" : "outline"}
                size="sm"
                className={tab === "network" ? "bg-purple-600 text-white hover:bg-purple-500" : "text-white border-white/20 hover:bg-white/10"}
                onClick={() => setTab("network")}
              >
                Directory
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-8 py-6">
        {/* FEED */}
        {tab === "feed" && (
          <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              <div className="rounded-xl border bg-card p-5 shadow-xs">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarFallback className="bg-purple-600 text-white font-bold">NS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-xs text-foreground">New Sunrise School Official</h3>
                    <p className="text-[10px] text-muted-foreground">3 hours ago · Phnom Penh</p>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-foreground/90">
                  Congratulations to our Class of 2026 for achieving a 98% pass rate on the National BacII
                  Examination! Special recognition to our alumni mentors who volunteered weekend tutorial sessions.
                </p>
                <div className="mt-3 flex gap-4 border-t pt-2 text-xs text-muted-foreground">
                  <button className="flex items-center gap-1.5 hover:text-purple-600">
                    <Heart className="size-3.5 text-rose-500" /> 48 Likes
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-purple-600">
                    <MessageSquare className="size-3.5" /> 12 Comments
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-purple-600 ml-auto">
                    <Share2 className="size-3.5" /> Share
                  </button>
                </div>
              </div>

              <div className="rounded-xl border bg-card p-5 shadow-xs">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarFallback className="bg-blue-600 text-white font-bold">SV</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-xs text-foreground">Serey Vathana · Class of 2019</h3>
                    <p className="text-[10px] text-muted-foreground">Yesterday · Tech & Careers</p>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-foreground/90">
                  Excited to share that our engineering team at ABA Bank is hiring junior frontend interns! Open to
                  recent school graduates with React & TypeScript experience. Feel free to message me directly.
                </p>
                <div className="mt-3 flex gap-4 border-t pt-2 text-xs text-muted-foreground">
                  <button className="flex items-center gap-1.5 hover:text-purple-600">
                    <Heart className="size-3.5 text-rose-500" /> 31 Likes
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-purple-600">
                    <MessageSquare className="size-3.5" /> 7 Inquiries
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar widgets */}
            <div className="space-y-4">
              <div className="rounded-xl border bg-card p-4 shadow-xs">
                <h4 className="font-bold text-xs text-foreground">Alumni Mentorship Program</h4>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Connect with high school seniors preparing for university scholarships and careers in STEM.
                </p>
                <Button className="mt-3 w-full bg-purple-600 hover:bg-purple-500 text-white text-xs h-8">
                  Join as a Mentor
                </Button>
              </div>

              <div className="rounded-xl border bg-card p-4 shadow-xs">
                <h4 className="font-bold text-xs text-foreground">Campus Support Fund</h4>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Contribute to the STEM Laboratory equipment drive via Bakong KHQR.
                </p>
                <Button variant="outline" className="mt-3 w-full text-xs h-8">
                  Support Projects
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* EVENTS */}
        {tab === "events" && (
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-base font-bold">Upcoming Reunions & Campus Events</h2>
            {[
              {
                title: "10-Year Grand Reunion Dinner (Classes 2014-2018)",
                date: "Saturday, 14 Nov 2026 · 6:30 PM",
                location: "Rosewood Phnom Penh Grand Ballroom",
                registered: "124 Alumni Attending",
              },
              {
                title: "Annual STEM & Career Mentorship Expo",
                date: "Friday, 27 Nov 2026 · 9:00 AM",
                location: "School Main Campus Hall",
                registered: "38 Mentors Registered",
              },
              {
                title: "Alumni Football Tournament 2026",
                date: "Sunday, 12 Dec 2026 · 8:00 AM",
                location: "School Athletic Field",
                registered: "8 Teams Competing",
              },
            ].map((event) => (
              <div key={event.title} className="rounded-xl border bg-card p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <Badge variant="outline" className="text-[10px] text-purple-600 border-purple-300">
                    <Calendar className="size-3 mr-1" /> {event.date}
                  </Badge>
                  <h3 className="font-bold text-sm text-foreground mt-1.5">{event.title}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="size-3.5" /> {event.location}
                  </p>
                  <p className="text-[10px] font-semibold text-emerald-600 mt-2">{event.registered}</p>
                </div>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-500 text-white text-xs">
                  RSVP Now
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* NETWORK DIRECTORY */}
        {tab === "network" && (
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9 h-9 text-xs"
                  placeholder="Search alumni by name, graduation year, or industry..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2.5">
              {alumni.map((alum) => (
                <div key={alum.name} className="flex items-center justify-between rounded-xl border bg-card p-4 shadow-xs">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-11">
                      <AvatarFallback className="bg-purple-600/10 text-purple-700 font-bold text-xs">
                        {alum.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-xs text-foreground">{alum.name}</h3>
                        <Badge variant="secondary" className="text-[9px]">
                          {alum.year}
                        </Badge>
                        {alum.mentor && (
                          <span className="rounded-full bg-emerald-100 px-2 py-0.2 text-[9px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            Available to Mentor
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{alum.role}</p>
                      <p className="text-[10px] text-muted-foreground">{alum.city}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
                    <Mail className="size-3.5" /> Connect
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
