# School-OS

> **School OS + Transport Safety Platform**
> Unified Cloud SIS, Learning Operations, and Real-time School Bus Safety Platform for K-12 Schools.

## Overview

School OS provides high-fidelity, interactive prototypes for all primary school stakeholders:

- **🎒 Student App** (`/student`) – Timetable, homework submission, exams, grades, and live bus card.
- **👨‍👩‍👧 Parent App** (`/parent`) – Attendance timeline, term fees, academic reports, live bus tracking, driver calling, and absence reporting.
- **👩‍🏫 Teacher App** (`/teacher`) – Class management, automated bus-arrival attendance sync, homework assignment, and gradebook.
- **🏫 School Admin Portal** (`/admin`) – Full school operations, admissions, billing, staff permissions, and fleet/transport management.
- **🚌 Bus Staff App** (`/bus-staff`) – Real-time route trips, stop check-ins, rider manifests (`Not picked` / `Picked` / `Dropped`), QR scan simulation, safety incident logger, and offline sync.
- **🎓 Portals** (`/alumni`, `/applicant`, `/employer`) – Lifecycle portals for prospective students, graduates, and employment partners.

---

## Deploy to Vercel

This repository is pre-configured for zero-friction deployment on [Vercel](https://vercel.com).

### 1. Import Repository
1. Push this repository to your GitHub account (`https://github.com/limme-prototype/School-OS.git`).
2. Go to [Vercel Dashboard](https://vercel.com/new) and click **"Add New Project"**.
3. Import the `School-OS` repository.

### 2. Build & Output Settings
Vercel automatically detects the configuration from [`vercel.json`](vercel.json) and [`vite.config.ts`](vite.config.ts):
- **Framework Preset**: Other
- **Build Command**: `bun run build` (or `npm run build`)
- **Output Directory**: `.vercel/output` (Nitro automatically targets the Vercel Build Output API v3)
- **Install Command**: `bun install` (or `npm install`)

### 3. Environment Variables
No required environment variables are needed for previewing the prototypes. Optional overrides:
- `NITRO_PRESET=vercel` (automatically enabled on Vercel)

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/limme-prototype/School-OS.git
cd School-OS

# Install dependencies (using Bun recommended)
bun install

# Run the local development server
bun run dev

# Open http://localhost:3000 in your browser
```

---

## PRD: UX Prototype for School OS

Parent App

Teacher App

Admin Portal

Bus Staff App

Optional Portals (Applicant, Alumni, Employer)

The prototypes will:

Validate navigation, layout, and flows with real users (students, parents, teachers, admin, bus staff).

Prove that the design system (colors, typography, components) works across roles.

Provide a concrete basis for implementation (React Native/Flutter + React admin).

This PRD focuses on UX/UI only: structure, screens, interactions, and visual system. Functional logic is covered in the app PRDs you already wrote, this document is about turning them into prototypes.

Target users (for UX validation)

Students – K‑12, using low‑ to mid‑range Android phones; need simple navigation to timetable, homework, results, bus info.

Parents – mixed digital literacy; need clear child summaries (attendance, grades, fees, bus events) in Khmer and English.

Teachers – manage multiple classes; need fast attendance, homework posting, grading.

Admins – school owners, registrars, accountants, transport managers; need desktop dashboards and configuration UI.

Bus staff – drivers/assistants on low‑end Android; need extremely simple, offline‑tolerant trip and rider workflows.

Global design system in prototypes

All prototypes must follow one shared design system (already defined in your docs):

3.1 Layout & grid

Mobile:

Frame: 360×640.

Single column, stacked cards.

Spacing grid: 4–8px.

Admin web:

Frame: 1440×900.

Left sidebar ≈260px; top bar; 12‑column content area.

3.2 Navigation patterns

Mobile apps: bottom navigation with 3–5 tabs, each tab a top‑level view.

Admin portal: persistent sidebar; top bar with search, notifications, user menu.

3.3 Color tokens & usage

From the education/dashboard palettes:

Background: #F8FAFC (Paper white).

Primary: #1D4ED8 (Lesson blue).

Success: #22C55E (Correct green).

Bus accent / warning: #F59E0B (amber).

Danger: #EF4444 (Check red).

Text primary: #111827; text secondary: #4B5563; borders: #E5E7EB.

Role-based accents:

Student, Parent, Teacher, Admin: Lesson blue as main accent.

Parent summary cards: add yellow accent for progress.

Bus flows (Bus Staff, bus chips in other apps): amber headers/chips; green success, red critical incidents.

3.4 Typography

Base: Inter or similar + Khmer fallback.

Mobile base: 14–16px; Admin: 14px.

Headings: H1 24px, H2 20px, H3 18px.

3.5 Components

Prototype component set:

Buttons: primary, secondary, ghost, destructive.

Inputs: text, select, date, search.

Chips: status (Present/Absent/Late), bus events, roles.

Cards: summary KPIs, list items, profile.

Tables: data grids (Admin).

Navigation: bottom nav bar, sidebar, tabs.

3.6 Interaction & accessibility

Buttons: default, hover (web), pressed, disabled; clear states.

Inputs: default, focused, error; show messages + icons.

Chips: default, selected; color + icon.

Contrast ≥ 4.5:1; touch targets ≥ 44×44px.

Prototype scope by app

4.1 Student App prototype

Goal: Validate that students can find timetable, homework, results, and bus info quickly.

Screens to design:

Home – greeting, today’s timetable card, next homework card, attendance + bus chips.

Classes – weekly timetable + subject list.

Homework – assignment list cards + detail screen.

Results – tabs for Attendance (calendar) and Grades (subject list + term average).

More – profile, bus info, settings.

Key flows to prototype:

Tap period → Class details.

Tap homework → Homework detail.

Swipe between days on timetable.

View bus info for subscribed students.

Color usage: Lesson blue for nav/buttons; green for completed homework; amber for due‑soon.

4.2 Parent App prototype

Goal: Validate child summary, progress, fees, bus events, and messaging flows for parents.

Screens:

Home – child selector; cards for attendance, latest grades, fee status.

Progress – tabs: Attendance (calendar), Grades (subject list).

Fees – invoice list + detail with KHQR/Bakong QR and payment info.

Bus – subscription status, route + stop card, bus events timeline.

Messages – announcements + optional chat threads.

Key flows:

Switch child via selector, update all content.

Open invoice, view QR, mark as paid (in UI).

Read bus event history (pickup, arrival, drop‑off).

Color usage: yellow accent on summary cards; amber chips for bus events; blue for primary actions.

4.3 Teacher App prototype

Goal: Validate schedule, attendance, homework posting, grade entry on mobile.

Screens:

Home – today’s classes cards with Attendance + Homework buttons.

Classes – list view; class detail with student list and tabs (Homework, Assessments).

Attendance – student list with Present/Absent/Late toggles, bus suggestion strip.

Grades – assignment list; assignment detail with grade table.

News – announcement feed.

Key flows:

Tap class card to go to detail.

Tap Attendance to mark statuses.

Create homework and grade it.

Color usage: Lesson blue buttons; green chips for graded/completed; neutral for default.

4.4 Admin Portal prototype

Goal: Validate desktop dashboard and navigation for SIS, LMS, finance, transport.

Screens:

Dashboard – KPI cards, charts for enrollment & attendance.

Students & Parents – table with filters; profile side panel.

Fees & Finance – invoice list; fee plan list.

Transport – tabs: Routes/Stops, Buses/Drivers, Trips, Incidents/No‑Shows.

Settings & Roles – roles view; user accounts table.

Key flows:

Navigate from sidebar items to sections.

Filter tables, open detail panels.

Switch transport tabs and view data.

Color usage: dark blue sidebar; light background; blue primary actions; semantic chips (green/amber/red).

4.5 Bus Staff App prototype

Goal: Validate trip list, stop‑by‑stop workflow, rider status toggles, incidents, offline‑first UX.

Screens:

Today’s Trips – trip cards (route, session, start time, status).

Trip Detail – Stops – ordered stop list; “Arrived” button.

Trip Detail – Riders – rider list with status chips; QR/ID scan entry.

Trip Detail – Incidents – incident list; Log Incident form.

Key flows:

Select trip → see stops and riders.

Mark pickup/drop‑off via taps and/or scans.

Log incidents with type and notes.

Color usage: amber top bar and bus chips; green for successful events; red for critical incidents.

4.6 Optional Portals prototype

Applicant Portal

Home, Apply (multi‑step form), My Applications (status cards).

Alumni Portal

Feed, Events, Network, Support.

Employer Portal

Opportunities, Candidates, Messages.

All reusing global tokens and components.

Non-functional requirements for prototypes

Even at prototype stage:

Must be clear, clickable enough for user testing (Figma interactive prototypes or Framer).

Cover representative flows end-to-end (e.g., Parent: Home → Fees → Bus; Bus Staff: Today’s Trips → Trip Detail → rider status).

Include multi‑language placeholders (Khmer + English labels), even if content is fake.

Success metrics for UX prototype phase

At least 5–10 users per role test the prototypes (students, parents, teachers, admins, bus staff).

≥80% of test users find key actions within 3 clicks/taps (e.g., check bus events, mark attendance).

Qualitative feedback shows clarity and trust, especially for parents around learning + transport.


Create a Bus Staff App prototype for ‘School OS’ focusing on trip execution and safety events.

360×640 frame with an amber top bar showing route/trip name.

Screens:

Today’s Trips: cards with route name, AM/PM, start time, status.

Trip Detail – Stops: ordered list of stops with expected rider count and ‘Arrived’ button per stop.

Trip Detail – Riders: rider list with status chips (Not picked/Picked/Dropped) and a QR/ID scan button.

Trip Detail – Incidents: incident list and ‘Log Incident’ form (type, notes, photo).



Use amber for bus emphasis, green for successful pickups/arrivals/drop‑offs, red for critical incidents.
Output: an interactive prototype that simulates running a trip and marking events.

---

## License

Private repository for prototype and investor demonstration.
