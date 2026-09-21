import { useState } from "react";
import {
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  FileCheck,
  FileText,
  GraduationCap,
  HelpCircle,
  Home,
  Plus,
  Send,
  Sparkles,
  Upload,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function ApplicantPortal() {
  const [tab, setTab] = useState<"home" | "apply" | "status">("home");
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-[calc(100dvh-3rem)] bg-background text-foreground pb-12">
      {/* Header */}
      <div className="border-b border-border/80 bg-card py-7 px-4 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                <Sparkles className="size-3.5" /> Admissions 2026–2027 Open
              </div>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                New Sunrise School Admissions Portal
              </h1>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                ផតថលចុះឈ្មោះចូលរៀន · Fast, bilingual enrollment for K-12 students in Phnom Penh.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={tab === "home" ? "default" : "outline"}
                size="sm"
                onClick={() => setTab("home")}
                className="text-xs"
              >
                Overview
              </Button>
              <Button
                variant={tab === "apply" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setTab("apply");
                  setSubmitted(false);
                  setStep(1);
                }}
                className="text-xs"
              >
                Apply Online
              </Button>
              <Button
                variant={tab === "status" ? "default" : "outline"}
                size="sm"
                onClick={() => setTab("status")}
                className="text-xs"
              >
                My Applications (2)
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-8 py-6">
        {/* OVERVIEW */}
        {tab === "home" && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
                <div className="grid size-9 place-items-center rounded-lg bg-muted text-foreground font-bold text-sm">
                  1
                </div>
                <h3 className="mt-3 font-bold text-sm">Fill Application Form</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Complete personal details, prior academic records, and select transportation preferences.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
                <div className="grid size-9 place-items-center rounded-lg bg-muted text-foreground font-bold text-sm">
                  2
                </div>
                <h3 className="mt-3 font-bold text-sm">Upload Documents</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Birth certificate, family book, and transcript from the previous school year.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
                <div className="grid size-9 place-items-center rounded-lg bg-muted text-foreground font-bold text-sm">
                  3
                </div>
                <h3 className="mt-3 font-bold text-sm">Assessment & Interview</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Get notified for an entrance placement test and family orientation interview.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold">Ready to register your child?</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Early registration discount of 10% applies to Term 1 before 30 October 2026.
                </p>
              </div>
              <Button
                className="font-semibold text-xs h-10 px-5"
                onClick={() => {
                  setTab("apply");
                  setStep(1);
                  setSubmitted(false);
                }}
              >
                Start New Application <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* APPLY MULTI-STEP FORM */}
        {tab === "apply" && (
          <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-sm">
            {!submitted ? (
              <>
                <div className="flex items-center justify-between border-b pb-4 mb-6">
                  <div>
                    <h2 className="text-base font-bold">Student Enrollment Application</h2>
                    <p className="text-xs text-muted-foreground">Step {step} of 3</p>
                  </div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map((num) => (
                      <div
                        key={num}
                        className={cn(
                          "size-7 rounded-full grid place-items-center text-xs font-semibold",
                          step === num
                            ? "bg-primary text-primary-foreground"
                            : step > num
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {step > num ? <Check className="size-3.5" /> : num}
                      </div>
                    ))}
                  </div>
                </div>

                {step === 1 && (
                  <div className="space-y-3.5 text-xs">
                    <h3 className="font-bold text-sm text-foreground">Step 1: Student Information</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold block mb-1">Student Full Name (Latin) *</label>
                        <Input defaultValue="Channary Voeun" className="h-9 text-xs" />
                      </div>
                      <div>
                        <label className="font-semibold block mb-1">Khmer Name (អក្សរខ្មែរ) *</label>
                        <Input defaultValue="វឿន ចាន់ណារី" className="h-9 text-xs" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold block mb-1">Date of Birth</label>
                        <Input defaultValue="2013-05-14" type="date" className="h-9 text-xs" />
                      </div>
                      <div>
                        <label className="font-semibold block mb-1">Applying for Grade *</label>
                        <select className="h-9 w-full rounded-md border border-input bg-background px-3 text-xs">
                          <option>Grade 7 (Lower Secondary)</option>
                          <option>Grade 8</option>
                          <option>Grade 9</option>
                          <option>Grade 10</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="font-semibold block mb-1">Previous School</label>
                      <Input defaultValue="Wat Bo Primary School, Siem Reap" className="h-9 text-xs" />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-3.5 text-xs">
                    <h3 className="font-bold text-sm text-foreground">Step 2: Parent / Guardian Information</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold block mb-1">Primary Guardian Name *</label>
                        <Input defaultValue="Sophea Voeun" className="h-9 text-xs" />
                      </div>
                      <div>
                        <label className="font-semibold block mb-1">Relationship</label>
                        <Input defaultValue="Mother" className="h-9 text-xs" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold block mb-1">Mobile Phone (Telegram/Bakong) *</label>
                        <Input defaultValue="+855 12 889 900" className="h-9 text-xs" />
                      </div>
                      <div>
                        <label className="font-semibold block mb-1">Email Address</label>
                        <Input defaultValue="sophea.v@gmail.com" className="h-9 text-xs" />
                      </div>
                    </div>
                    <div>
                      <label className="font-semibold block mb-1">Home Address in Phnom Penh</label>
                      <Input defaultValue="#42, St. 598, Sangkat Boeung Kak 2, Khan Toul Kork" className="h-9 text-xs" />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-3.5 text-xs">
                    <h3 className="font-bold text-sm text-foreground">Step 3: Document Attachments</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3 shadow-2xs">
                        <div className="flex items-center gap-2.5">
                          <FileText className="size-4.5 text-primary" />
                          <div>
                            <p className="font-semibold">Birth Certificate / សំបុត្រកំណើត</p>
                            <p className="text-[10px] text-muted-foreground">birth_certificate_voeun.pdf (1.2 MB)</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-[10px]">Uploaded</Badge>
                      </div>

                      <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3 shadow-2xs">
                        <div className="flex items-center gap-2.5">
                          <FileCheck className="size-4.5 text-primary" />
                          <div>
                            <p className="font-semibold">Previous Grade 6 Transcript</p>
                            <p className="text-[10px] text-muted-foreground">transcript_2025_2026.pdf (2.4 MB)</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-[10px]">Uploaded</Badge>
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="font-semibold text-foreground">Transport Enrollment:</p>
                      <label className="flex items-center gap-2 mt-1.5 cursor-pointer">
                        <input type="checkbox" defaultChecked className="size-4 rounded accent-primary" />
                        <span className="text-muted-foreground">Request school bus service (Toul Kork route pickup)</span>
                      </label>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-between border-t border-border/80 pt-4">
                  {step > 1 ? (
                    <Button variant="outline" size="sm" onClick={() => setStep((s) => s - 1)}>
                      Previous
                    </Button>
                  ) : <div />}

                  {step < 3 ? (
                    <Button
                      size="sm"
                      onClick={() => setStep((s) => s + 1)}
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="font-bold gap-1.5"
                      onClick={() => setSubmitted(true)}
                    >
                      <Send className="size-3.5" /> Submit Application
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="mx-auto size-14 rounded-full bg-primary/10 text-primary grid place-items-center">
                  <CheckCircle2 className="size-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Application Submitted Successfully</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Application reference number: <strong className="text-foreground font-mono">APP-2026-0419</strong>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Our registrar team has received your documents and will review them within 2 business days.
                  </p>
                </div>
                <div className="pt-2 flex justify-center gap-3">
                  <Button
                    size="sm"
                    onClick={() => setTab("status")}
                  >
                    Track Status
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setTab("home")}>
                    Back to Home
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* APPLICATION STATUS */}
        {tab === "status" && (
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-base font-bold">My Submitted Applications</h2>
            <div className="space-y-3">
              <div className="rounded-xl border border-border/80 bg-card p-5 shadow-2xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-primary">APP-2026-0419</span>
                    <h3 className="text-sm font-bold mt-0.5">Channary Voeun · Grade 7 Enrollment</h3>
                  </div>
                  <Badge variant="outline" className="text-xs gap-1">
                    <Clock className="size-3" /> Under Registrar Review
                  </Badge>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                  <div>
                    <span className="block text-[10px]">Submitted:</span>
                    <span className="font-semibold text-foreground">20 Sep 2026</span>
                  </div>
                  <div>
                    <span className="block text-[10px]">Campus:</span>
                    <span className="font-semibold text-foreground">Phnom Penh Main</span>
                  </div>
                  <div>
                    <span className="block text-[10px]">Bus Request:</span>
                    <span className="font-semibold text-foreground">Route B-12 (Toul Kork)</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border/80 bg-card p-5 shadow-2xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-primary">APP-2026-0102</span>
                    <h3 className="text-sm font-bold mt-0.5">Malis Voeun · Kindergarten K2</h3>
                  </div>
                  <Badge variant="secondary" className="text-xs gap-1">
                    <CheckCircle2 className="size-3" /> Accepted · Confirmed
                  </Badge>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Tuition Deposit Paid via Bakong</span>
                  <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                    <Download className="size-3" /> Download Letter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
