import { useState } from "react";
import {
  Briefcase,
  Building,
  Check,
  ChevronRight,
  GraduationCap,
  Mail,
  MapPin,
  MessageSquare,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function EmployerPortal() {
  const [tab, setTab] = useState<"jobs" | "candidates" | "messages">("jobs");
  const [search, setSearch] = useState("");
  const [newJobOpen, setNewJobOpen] = useState(false);

  const jobs = [
    { id: "J01", title: "Junior Web Developer Intern", department: "Digital Banking", type: "Paid Internship", applicants: 8, status: "Active" },
    { id: "J02", title: "Data Analyst Apprentice", department: "Business Intelligence", type: "Vocational Co-op", applicants: 5, status: "Active" },
    { id: "J03", title: "Customer Success Assistant", department: "Client Operations", type: "Part-Time", applicants: 12, status: "Reviewing" },
  ];

  const candidates = [
    { name: "Sokha Chan", grade: "Grade 12 (Graduating)", stream: "Computer Science & IT", gpa: "3.8 / 4.0", skills: ["React", "TypeScript", "Python", "Khmer/English"], badge: "Top 5% Graduate" },
    { name: "Vannak Chea", grade: "Grade 11", stream: "Applied Electronics & Robotics", gpa: "3.6 / 4.0", skills: ["Arduino", "Circuit Design", "CAD", "Robotics"], badge: "National Science Medalist" },
    { name: "Sreyneang Lim", grade: "Grade 12", stream: "Business & Accounting", gpa: "3.9 / 4.0", skills: ["Bakong Integration", "Excel Advanced", "QuickBooks"], badge: "Valedictorian Nominee" },
  ];

  return (
    <div className="min-h-[calc(100dvh-3rem)] bg-background text-foreground pb-12">
      {/* Header */}
      <div className="border-b border-border/80 bg-card py-7 px-4 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                <Briefcase className="size-3.5" /> Corporate & Vocational Partnerships
              </div>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                School OS Employer Portal
              </h1>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                ផតថលដៃគូវិជ្ជាជីវៈ · Connect with vetted student talent, offer internships, and recruit top graduates.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={tab === "jobs" ? "default" : "outline"}
                size="sm"
                className="text-xs"
                onClick={() => setTab("jobs")}
              >
                Our Postings ({jobs.length})
              </Button>
              <Button
                variant={tab === "candidates" ? "default" : "outline"}
                size="sm"
                className="text-xs"
                onClick={() => setTab("candidates")}
              >
                Talent Pool
              </Button>
              <Button
                variant={tab === "messages" ? "default" : "outline"}
                size="sm"
                className="text-xs"
                onClick={() => setTab("messages")}
              >
                Inquiries
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-8 py-6">
        {/* JOBS / OPPORTUNITIES */}
        {tab === "jobs" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold">Active Opportunities for Students</h2>
                <p className="text-xs text-muted-foreground">Manage your company's internship listings</p>
              </div>
              <Button
                size="sm"
                className="text-xs gap-1 font-semibold"
                onClick={() => setNewJobOpen(true)}
              >
                <Plus className="size-4" /> Post New Internship
              </Button>
            </div>

            <div className="space-y-3">
              {jobs.map((job) => (
                <div key={job.id} className="rounded-xl border border-border/80 bg-card p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-foreground">{job.title}</h3>
                      <Badge variant="outline" className="text-[10px]">
                        {job.type}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px]">
                        {job.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Department: {job.department} · Phnom Penh Office
                    </p>
                    <p className="text-xs font-semibold text-primary mt-2">
                      {job.applicants} Student applications received
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => setTab("candidates")}
                    >
                      Review Applicants ({job.applicants})
                    </Button>
                    <Button size="sm" variant="default" className="text-xs">
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CANDIDATES TALENT POOL */}
        {tab === "candidates" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold">Verified Student Talent Directory</h2>
                <p className="text-xs text-muted-foreground">Certified academic & technical profiles validated by school</p>
              </div>
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9 h-9 text-xs"
                  placeholder="Filter by skill, stream or grade..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {candidates.map((cand) => (
                <div key={cand.name} className="rounded-xl border border-border/80 bg-card p-5 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-10">
                          <AvatarFallback className="bg-muted text-foreground font-bold text-xs">
                            {cand.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold text-sm text-foreground">{cand.name}</h3>
                          <p className="text-xs text-muted-foreground">{cand.grade}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-[10px]">
                        {cand.badge}
                      </Badge>
                    </div>

                    <div className="mt-3.5 space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Academic Focus:</span>
                        <span className="font-semibold text-foreground">{cand.stream}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cumulative GPA:</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">{cand.gpa}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {cand.skills.map((skill) => (
                        <span key={skill} className="rounded bg-muted px-2 py-0.5 text-[10px] font-semibold text-foreground/80">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-border/60 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => setTab("messages")}
                    >
                      <Mail className="size-3 mr-1" /> Request Interview
                    </Button>
                    <Button size="sm" variant="default" className="text-xs">
                      View Portfolio
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGES / INQUIRIES */}
        {tab === "messages" && (
          <div className="max-w-3xl space-y-4">
            <h2 className="text-base font-bold">Candidate Interview Inquiries</h2>
            <div className="rounded-xl border border-border/80 bg-card p-5 shadow-2xs">
              <div className="flex items-center gap-3 border-b border-border/60 pb-3">
                <Avatar className="size-10">
                  <AvatarFallback className="bg-muted text-foreground font-bold text-xs">SC</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xs font-bold">Interview Scheduled: Sokha Chan</h3>
                  <p className="text-[10px] text-muted-foreground">Role: Junior Web Developer Intern</p>
                </div>
                <Badge variant="secondary" className="ml-auto text-[10px]">
                  Confirmed: Tue 22 Sep · 3:00 PM
                </Badge>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-foreground/80">
                School vocational coordinator Ms. Sopheary confirmed that Sokha has completed the prerequisites in
                React and TypeScript with high marks. Zoom interview link has been sent to candidate.
              </p>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  Reschedule
                </Button>
                <Button size="sm" variant="default" className="text-xs">
                  Join Interview Room
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
