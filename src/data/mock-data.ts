export interface Campus {
  id: string;
  name: string;
  country: "Cambodia" | "France";
  city: string;
  address: string;
  phone: string;
  totalStudents: number;
  totalTeachers: number;
}

export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: "Male" | "Female";
  dateOfBirth: string;
  grade: string;
  classId: string;
  className: string;
  campusId: string;
  avatar: string;
  parentId: string;
  attendanceRate: number;
  gpa: number;
  status: "Active" | "Graduated" | "Suspended";
  medicalNotes?: string;
  emergencyContact: string;
  busSubscription?: {
    subscribed: boolean;
    routeId: string;
    routeName: string;
    stopId: string;
    stopName: string;
    pickupTime: string;
    dropoffTime: string;
    plan: "Round-trip" | "Morning-only" | "Afternoon-only";
    feePerTerm: number;
  };
}

export interface ParentGuardian {
  id: string;
  fullName: string;
  relationship: "Father" | "Mother" | "Guardian";
  phone: string;
  email: string;
  preferredLanguage: "kh" | "en" | "fr";
  authorizedPickup: boolean;
  avatar: string;
  address: string;
  childrenIds: string[];
}

export interface Teacher {
  id: string;
  teacherId: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  homeroomClassId?: string;
  homeroomClassName?: string;
  subjects: string[];
  avatar: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  studentId: string;
  studentName: string;
  parentId: string;
  term: string;
  issueDate: string;
  dueDate: string;
  currency: "USD" | "EUR";
  items: Array<{
    description: string;
    category: "Tuition" | "Transport" | "Activity" | "Uniform" | "Exam";
    amount: number;
  }>;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  status: "Paid" | "Pending" | "Overdue" | "Partially Paid";
  paymentMethod?: "Bakong KHQR" | "Bank Transfer" | "Credit Card / SEPA" | "Cashier";
}

export interface RouteStop {
  id: string;
  sequence: number;
  name: string;
  landmark: string;
  scheduledPickupTime: string;
  scheduledDropoffTime: string;
  expectedRidersCount: number;
  latitude: number;
  longitude: number;
  status: "Pending" | "Arrived" | "Skipped";
  actualArrivalTime?: string;
}

export interface Route {
  id: string;
  routeCode: string;
  name: string;
  zone: string;
  campusId: string;
  campusName: string;
  busPlate: string;
  capacity: number;
  driverName: string;
  driverPhone: string;
  assistantName: string;
  assistantPhone: string;
  totalSubscribedRiders: number;
  stops: RouteStop[];
  currentStatus: "On Schedule" | "Delayed" | "Completed" | "At Campus";
  delayMinutes: number;
}

export type TransportEventType =
  | "TRIP_CREATED"
  | "TRIP_STARTED"
  | "STOP_ARRIVED"
  | "STUDENT_BOARDED"
  | "STUDENT_NO_SHOW"
  | "STUDENT_ARRIVED_CAMPUS"
  | "PM_TRIP_STARTED"
  | "STUDENT_DROPPED_OFF"
  | "STOP_SKIPPED"
  | "ROUTE_DELAYED"
  | "ROUTE_CHANGED"
  | "INCIDENT_LOGGED"
  | "TRIP_COMPLETED"
  | "STUDENT_UNDELIVERED"
  | "GUARDIAN_CONFIRMED"
  | "SUBSTITUTE_BUS_ASSIGNED"
  | "ETA_ALERT_SENT";

export interface TransportEvent {
  id: string;
  type: TransportEventType;
  tripId: string;
  routeId: string;
  stopId?: string | undefined;
  stopName?: string | undefined;
  studentId?: string | undefined;
  studentName?: string | undefined;
  timestamp: string;
  title: string;
  description: string;
  severity?: "info" | "success" | "warning" | "error" | undefined;
  details?: Record<string, any> | undefined;
}

export interface TripRider {
  studentId: string;
  studentName: string;
  grade: string;
  stopId: string;
  stopName: string;
  scheduledTime: string;
  status: "Not picked" | "Picked" | "Dropped" | "No-show" | "Exception";
  boardedTime?: string | undefined;
  droppedTime?: string | undefined;
  guardianConfirmed?: boolean | undefined;
  guardianName?: string | undefined;
  guardianPhone?: string | undefined;
  notes?: string | undefined;
}

export interface Trip {
  id: string;
  routeId: string;
  routeName: string;
  type: "AM" | "PM";
  date: string;
  startTime: string;
  status: "Scheduled" | "In Progress" | "At Campus" | "Completed" | "Delayed";
  driverName: string;
  assistantName: string;
  busPlate: string;
  totalRiders: number;
  boardedCount: number;
  noShowCount: number;
  droppedCount: number;
  delayMinutes: number;
  delayReason?: string;
  riders: TripRider[];
}

export interface TransportIncident {
  id: string;
  tripId: string;
  routeId: string;
  routeName: string;
  type:
    | "Traffic delay"
    | "Student no-show"
    | "Medical issue"
    | "Vehicle breakdown"
    | "Parent not at stop"
    | "Weather disruption";
  severity: "Low" | "Medium" | "High" | "Critical";
  timestamp: string;
  loggedBy: string;
  notes: string;
  photoAttached?: boolean;
  photoUrl?: string;
  status: "Open" | "Investigating" | "Resolved";
  notifiedParentsCount: number;
}

export interface Announcement {
  id: string;
  title: string;
  category: "General" | "Academic" | "Transport" | "Finance" | "Urgent";
  publishedAt: string;
  author: string;
  audience: "All" | "Grade 6" | "Route 03 Parents" | "Staff";
  content: string;
  readRate: number;
}

// ==========================================
// REALISTIC MOCK DATA (CAMBODIA & FRANCE)
// ==========================================

export const MOCK_CAMPUSES: Campus[] = [
  {
    id: "campus-pp-main",
    name: "Phnom Penh Main Campus",
    country: "Cambodia",
    city: "Phnom Penh",
    address: "Preah Norodom Blvd, Daun Penh, Phnom Penh",
    phone: "+855 23 888 901",
    totalStudents: 850,
    totalTeachers: 64,
  },
  {
    id: "campus-pp-tk",
    name: "Toul Kork Early Years & Primary",
    country: "Cambodia",
    city: "Phnom Penh",
    address: "Street 315, Toul Kork, Phnom Penh",
    phone: "+855 23 888 902",
    totalStudents: 420,
    totalTeachers: 36,
  },
  {
    id: "campus-paris-15",
    name: "Campus International Paris 15e",
    country: "France",
    city: "Paris",
    address: "84 Rue de Vaugirard, 75015 Paris",
    phone: "+33 1 42 68 90 00",
    totalStudents: 560,
    totalTeachers: 48,
  },
];

export const MOCK_PARENTS: ParentGuardian[] = [
  {
    id: "parent-meas",
    fullName: "Kosal Meas",
    relationship: "Father",
    phone: "+855 12 345 678",
    email: "kosal.meas@example.com",
    preferredLanguage: "en",
    authorizedPickup: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    address: "Villa #14, St. 592, Toul Kork, Phnom Penh",
    childrenIds: ["stu-dara-meas", "stu-bopha-meas"],
  },
  {
    id: "parent-dubois",
    fullName: "Claire Dubois",
    relationship: "Mother",
    phone: "+33 6 12 34 56 78",
    email: "claire.dubois@example.fr",
    preferredLanguage: "fr",
    authorizedPickup: true,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    address: "22 Avenue de Breteuil, 75007 Paris",
    childrenIds: ["stu-lucas-dubois"],
  },
];

export const MOCK_STUDENTS: Student[] = [
  {
    id: "stu-dara-meas",
    studentId: "STU-2026-088",
    firstName: "Dara",
    lastName: "Meas",
    fullName: "Dara Meas",
    gender: "Male",
    dateOfBirth: "2014-05-14",
    grade: "Grade 6",
    classId: "cls-grade-6a",
    className: "Grade 6A",
    campusId: "campus-pp-main",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    parentId: "parent-meas",
    attendanceRate: 98,
    gpa: 3.85,
    status: "Active",
    medicalNotes: "Mild asthma inhaler kept in nurse office",
    emergencyContact: "+855 12 345 678",
    busSubscription: {
      subscribed: true,
      routeId: "route-03",
      routeName: "Route 03 · Toul Kork & Russian Blvd",
      stopId: "stop-tk-circle",
      stopName: "Toul Kork Circle (Near TK Avenue)",
      pickupTime: "06:40 AM",
      dropoffTime: "04:10 PM",
      plan: "Round-trip",
      feePerTerm: 180,
    },
  },
  {
    id: "stu-bopha-meas",
    studentId: "STU-2026-112",
    firstName: "Bopha",
    lastName: "Meas",
    fullName: "Bopha Meas",
    gender: "Female",
    dateOfBirth: "2018-09-22",
    grade: "Grade 2",
    classId: "cls-grade-2b",
    className: "Grade 2B",
    campusId: "campus-pp-tk",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    parentId: "parent-meas",
    attendanceRate: 95,
    gpa: 3.92,
    status: "Active",
    medicalNotes: "Peanut allergy",
    emergencyContact: "+855 12 345 678",
    busSubscription: {
      subscribed: true,
      routeId: "route-03",
      routeName: "Route 03 · Toul Kork & Russian Blvd",
      stopId: "stop-tk-circle",
      stopName: "Toul Kork Circle (Near TK Avenue)",
      pickupTime: "06:40 AM",
      dropoffTime: "04:10 PM",
      plan: "Round-trip",
      feePerTerm: 160,
    },
  },
  {
    id: "stu-lucas-dubois",
    studentId: "STU-2026-042",
    firstName: "Lucas",
    lastName: "Dubois",
    fullName: "Lucas Dubois",
    gender: "Male",
    dateOfBirth: "2011-03-10",
    grade: "3ème / Grade 9",
    classId: "cls-grade-9a",
    className: "3ème A",
    campusId: "campus-paris-15",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    parentId: "parent-dubois",
    attendanceRate: 96,
    gpa: 3.78,
    status: "Active",
    emergencyContact: "+33 6 12 34 56 78",
    busSubscription: {
      subscribed: true,
      routeId: "route-12",
      routeName: "Ligne 12 · Paris Rive Gauche",
      stopId: "stop-paris-breteuil",
      stopName: "Place de Breteuil",
      pickupTime: "07:25 AM",
      dropoffTime: "05:15 PM",
      plan: "Round-trip",
      feePerTerm: 220,
    },
  },
];

export const MOCK_TEACHERS: Teacher[] = [
  {
    id: "tch-chhay-meng",
    teacherId: "TCH-014",
    fullName: "Mr. Chhay Meng",
    email: "chhay.meng@schoolos.edu",
    phone: "+855 12 778 899",
    department: "Mathematics & STEM",
    homeroomClassId: "cls-grade-6a",
    homeroomClassName: "Grade 6A",
    subjects: ["Mathematics 6", "Robotics Basics"],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "tch-catherine-leroy",
    teacherId: "TCH-008",
    fullName: "Mme. Catherine Leroy",
    email: "c.leroy@schoolos.edu",
    phone: "+33 6 45 78 90 12",
    department: "Humanities & Languages",
    homeroomClassId: "cls-grade-9a",
    homeroomClassName: "3ème A",
    subjects: ["Littérature & Français", "Histoire-Géo"],
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: "inv-2026-001",
    invoiceNumber: "INV-2026-0891",
    studentId: "stu-dara-meas",
    studentName: "Dara Meas",
    parentId: "parent-meas",
    term: "Term 2 (Jan - Apr 2026)",
    issueDate: "2026-01-05",
    dueDate: "2026-01-25",
    currency: "USD",
    items: [
      { description: "Term 2 Tuition (Grade 6 International)", category: "Tuition", amount: 720 },
      { description: "School Bus Transport (Route 03 Round-trip)", category: "Transport", amount: 180 },
      { description: "STEM Science Kit & Lab Access", category: "Activity", amount: 45 },
    ],
    totalAmount: 945,
    paidAmount: 945,
    balanceDue: 0,
    status: "Paid",
    paymentMethod: "Bakong KHQR",
  },
  {
    id: "inv-2026-002",
    invoiceNumber: "INV-2026-0892",
    studentId: "stu-bopha-meas",
    studentName: "Bopha Meas",
    parentId: "parent-meas",
    term: "Term 2 (Jan - Apr 2026)",
    issueDate: "2026-01-05",
    dueDate: "2026-01-25",
    currency: "USD",
    items: [
      { description: "Term 2 Tuition (Grade 2 Primary)", category: "Tuition", amount: 580 },
      { description: "School Bus Transport (Route 03 Sibling discount)", category: "Transport", amount: 140 },
      { description: "Art & Music Material Kit", category: "Activity", amount: 35 },
    ],
    totalAmount: 755,
    paidAmount: 755,
    balanceDue: 0,
    status: "Paid",
    paymentMethod: "Bakong KHQR",
  },
  {
    id: "inv-2026-003",
    invoiceNumber: "INV-2026-1044",
    studentId: "stu-dara-meas",
    studentName: "Dara Meas",
    parentId: "parent-meas",
    term: "Term 3 (May - Jul 2026)",
    issueDate: "2026-04-01",
    dueDate: "2026-04-20",
    currency: "USD",
    items: [
      { description: "Term 3 Tuition Advance", category: "Tuition", amount: 720 },
      { description: "School Bus Transport (Term 3)", category: "Transport", amount: 180 },
    ],
    totalAmount: 900,
    paidAmount: 0,
    balanceDue: 900,
    status: "Pending",
  },
  {
    id: "inv-2026-fr-01",
    invoiceNumber: "INV-PARIS-2026-03",
    studentId: "stu-lucas-dubois",
    studentName: "Lucas Dubois",
    parentId: "parent-dubois",
    term: "Trimestre 2 (Jan - Mars 2026)",
    issueDate: "2026-01-10",
    dueDate: "2026-01-31",
    currency: "EUR",
    items: [
      { description: "Frais de scolarité Trimestre 2 (3ème)", category: "Tuition", amount: 1100 },
      { description: "Navette scolaire Ligne 12", category: "Transport", amount: 220 },
      { description: "Adhésion Club Robotique", category: "Activity", amount: 60 },
    ],
    totalAmount: 1380,
    paidAmount: 1380,
    balanceDue: 0,
    status: "Paid",
    paymentMethod: "Credit Card / SEPA",
  },
];

export const MOCK_ROUTE_03_STOPS: RouteStop[] = [
  {
    id: "stop-tk-circle",
    sequence: 1,
    name: "Toul Kork Circle (TK Avenue)",
    landmark: "In front of Brown Coffee TK",
    scheduledPickupTime: "06:40 AM",
    scheduledDropoffTime: "04:10 PM",
    expectedRidersCount: 4,
    latitude: 11.5833,
    longitude: 104.8967,
    status: "Arrived",
    actualArrivalTime: "06:42 AM",
  },
  {
    id: "stop-st-315-592",
    sequence: 2,
    name: "St. 315 & St. 592 Intersection",
    landmark: "Opposite Calmette Clinic Annex",
    scheduledPickupTime: "06:52 AM",
    scheduledDropoffTime: "04:22 PM",
    expectedRidersCount: 5,
    latitude: 11.5794,
    longitude: 104.9012,
    status: "Arrived",
    actualArrivalTime: "06:55 AM",
  },
  {
    id: "stop-russian-blvd",
    sequence: 3,
    name: "Russian Blvd / 7 Makara Flyover",
    landmark: "Caltex Gas Station",
    scheduledPickupTime: "07:08 AM",
    scheduledDropoffTime: "04:38 PM",
    expectedRidersCount: 6,
    latitude: 11.5689,
    longitude: 104.9085,
    status: "Arrived",
    actualArrivalTime: "07:20 AM", // delayed due to roadwork
  },
  {
    id: "stop-santhormok",
    sequence: 4,
    name: "Santhormok Junction",
    landmark: "Near ABA Bank Santhormok Branch",
    scheduledPickupTime: "07:22 AM",
    scheduledDropoffTime: "04:52 PM",
    expectedRidersCount: 5,
    latitude: 11.5612,
    longitude: 104.9123,
    status: "Pending",
  },
  {
    id: "stop-campus-gate-2",
    sequence: 5,
    name: "Phnom Penh Main Campus (Gate 2)",
    landmark: "Preah Norodom Boulevard Entrance",
    scheduledPickupTime: "07:35 AM",
    scheduledDropoffTime: "05:05 PM",
    expectedRidersCount: 20,
    latitude: 11.5543,
    longitude: 104.9278,
    status: "Pending",
  },
];

export const MOCK_ROUTES: Route[] = [
  {
    id: "route-03",
    routeCode: "R-03",
    name: "Route 03 · Toul Kork & Russian Blvd",
    zone: "Toul Kork / Daun Penh",
    campusId: "campus-pp-main",
    campusName: "Phnom Penh Main Campus",
    busPlate: "KH 2A-9412",
    capacity: 28,
    driverName: "Seng Vibol",
    driverPhone: "+855 12 998 123",
    assistantName: "Chea Sreyneang",
    assistantPhone: "+855 12 998 124",
    totalSubscribedRiders: 24,
    stops: MOCK_ROUTE_03_STOPS,
    currentStatus: "Delayed",
    delayMinutes: 12,
  },
  {
    id: "route-07",
    routeCode: "R-07",
    name: "Route 07 · Chamkarmon & BKK1",
    zone: "Chamkarmon / BKK1",
    campusId: "campus-pp-main",
    campusName: "Phnom Penh Main Campus",
    busPlate: "KH 2B-3108",
    capacity: 26,
    driverName: "Rith Sok",
    driverPhone: "+855 12 445 789",
    assistantName: "Pich Rath",
    assistantPhone: "+855 12 445 790",
    totalSubscribedRiders: 22,
    stops: [],
    currentStatus: "On Schedule",
    delayMinutes: 0,
  },
  {
    id: "route-12",
    routeCode: "L-12",
    name: "Ligne 12 · Paris Rive Gauche",
    zone: "Paris 7e / 15e",
    campusId: "campus-paris-15",
    campusName: "Campus International Paris 15e",
    busPlate: "FR 75-BUS-90",
    capacity: 24,
    driverName: "Jean Moreau",
    driverPhone: "+33 6 88 12 34 56",
    assistantName: "Marie Lambert",
    assistantPhone: "+33 6 88 12 34 57",
    totalSubscribedRiders: 18,
    stops: [],
    currentStatus: "On Schedule",
    delayMinutes: 0,
  },
];

export const MOCK_TRIP_03_AM: Trip = {
  id: "trip-03-am-2026-09-21",
  routeId: "route-03",
  routeName: "Route 03 · Toul Kork & Russian Blvd",
  type: "AM",
  date: "2026-09-21",
  startTime: "06:35 AM",
  status: "In Progress",
  driverName: "Seng Vibol",
  assistantName: "Chea Sreyneang",
  busPlate: "KH 2A-9412",
  totalRiders: 24,
  boardedCount: 15,
  noShowCount: 1,
  droppedCount: 0,
  delayMinutes: 12,
  delayReason: "Roadwork drainage congestion on Russian Blvd near 7 Makara flyover",
  riders: [
    {
      studentId: "stu-dara-meas",
      studentName: "Dara Meas",
      grade: "Grade 6A",
      stopId: "stop-tk-circle",
      stopName: "Toul Kork Circle",
      scheduledTime: "06:40 AM",
      status: "Picked",
      boardedTime: "06:42 AM",
      guardianConfirmed: true,
      guardianName: "Kosal Meas",
      guardianPhone: "+855 12 345 678",
      notes: "Boarded safely with backpack and water bottle",
    },
    {
      studentId: "stu-bopha-meas",
      studentName: "Bopha Meas",
      grade: "Grade 2B",
      stopId: "stop-tk-circle",
      stopName: "Toul Kork Circle",
      scheduledTime: "06:40 AM",
      status: "Picked",
      boardedTime: "06:42 AM",
      guardianConfirmed: true,
      guardianName: "Kosal Meas",
      guardianPhone: "+855 12 345 678",
      notes: "Seated in front row with assistant Chea Sreyneang",
    },
    {
      studentId: "stu-sokha-kim",
      studentName: "Sokha Kim",
      grade: "Grade 6A",
      stopId: "stop-st-315-592",
      stopName: "St. 315 & St. 592",
      scheduledTime: "06:52 AM",
      status: "Picked",
      boardedTime: "06:54 AM",
      guardianConfirmed: true,
    },
    {
      studentId: "stu-vannak-chea",
      studentName: "Vannak Chea",
      grade: "Grade 6A",
      stopId: "stop-st-315-592",
      stopName: "St. 315 & St. 592",
      scheduledTime: "06:52 AM",
      status: "No-show",
      notes: "Parent submitted absence via School OS Parent App (flu symptom)",
    },
    {
      studentId: "stu-chanthou-rath",
      studentName: "Chanthou Rath",
      grade: "Grade 6A",
      stopId: "stop-santhormok",
      stopName: "Santhormok Junction",
      scheduledTime: "07:22 AM",
      status: "Not picked",
    },
    {
      studentId: "stu-david-chhay",
      studentName: "David Chhay",
      grade: "Grade 6A",
      stopId: "stop-santhormok",
      stopName: "Santhormok Junction",
      scheduledTime: "07:22 AM",
      status: "Not picked",
    },
  ],
};

export const MOCK_TRANSPORT_EVENTS: TransportEvent[] = [
  {
    id: "evt-001",
    type: "TRIP_STARTED",
    tripId: "trip-03-am-2026-09-21",
    routeId: "route-03",
    timestamp: "06:35 AM",
    title: "Morning Trip Dispatched",
    description: "Bus KH 2A-9412 departed depot on schedule. Driver: Seng Vibol.",
    severity: "info",
  },
  {
    id: "evt-002",
    type: "STOP_ARRIVED",
    tripId: "trip-03-am-2026-09-21",
    routeId: "route-03",
    stopId: "stop-tk-circle",
    stopName: "Toul Kork Circle",
    timestamp: "06:40 AM",
    title: "Arrived at Stop 1 · Toul Kork Circle",
    description: "4 expected riders at Brown Coffee TK.",
    severity: "info",
  },
  {
    id: "evt-003",
    type: "STUDENT_BOARDED",
    tripId: "trip-03-am-2026-09-21",
    routeId: "route-03",
    stopId: "stop-tk-circle",
    studentId: "stu-dara-meas",
    studentName: "Dara Meas",
    timestamp: "06:42 AM",
    title: "Student Boarded · Dara Meas",
    description: "Boarded bus safely. Parent Kosal Meas notified.",
    severity: "success",
  },
  {
    id: "evt-004",
    type: "STUDENT_BOARDED",
    tripId: "trip-03-am-2026-09-21",
    routeId: "route-03",
    stopId: "stop-tk-circle",
    studentId: "stu-bopha-meas",
    studentName: "Bopha Meas",
    timestamp: "06:42 AM",
    title: "Student Boarded · Bopha Meas",
    description: "Boarded bus safely with sibling Dara.",
    severity: "success",
  },
  {
    id: "evt-005",
    type: "STUDENT_NO_SHOW",
    tripId: "trip-03-am-2026-09-21",
    routeId: "route-03",
    stopId: "stop-st-315-592",
    studentId: "stu-vannak-chea",
    studentName: "Vannak Chea",
    timestamp: "06:56 AM",
    title: "Student No-Show · Vannak Chea",
    description: "Parent verified absent in advance via Parent App.",
    severity: "warning",
  },
  {
    id: "evt-006",
    type: "ROUTE_DELAYED",
    tripId: "trip-03-am-2026-09-21",
    routeId: "route-03",
    timestamp: "07:15 AM",
    title: "Traffic Delay Advisory (+12 mins)",
    description: "Roadwork drainage congestion on Russian Blvd. GeoAlert broadcast to 18 families.",
    severity: "warning",
  },
  {
    id: "evt-007",
    type: "ETA_ALERT_SENT",
    tripId: "trip-03-am-2026-09-21",
    routeId: "route-03",
    timestamp: "07:18 AM",
    title: "ETA Updates Delivered",
    description: "Next stop Santhormok revised ETA: 07:34 AM.",
    severity: "info",
  },
];

export const MOCK_INCIDENTS: TransportIncident[] = [
  {
    id: "inc-2026-04",
    tripId: "trip-03-am-2026-09-21",
    routeId: "route-03",
    routeName: "Route 03 · Toul Kork & Russian Blvd",
    type: "Traffic delay",
    severity: "Medium",
    timestamp: "07:15 AM",
    loggedBy: "Driver Seng Vibol",
    notes: "Drainage works lane closure on Russian Blvd near 7 Makara flyover. Vehicle safe, estimated delay 12 minutes.",
    photoAttached: true,
    photoUrl: "https://images.unsplash.com/photo-1543465077-db45d34b88a5?w=400&auto=format&fit=crop&q=80",
    status: "Investigating",
    notifiedParentsCount: 18,
  },
  {
    id: "inc-2026-03",
    tripId: "trip-03-am-2026-09-21",
    routeId: "route-03",
    routeName: "Route 03 · Toul Kork & Russian Blvd",
    type: "Student no-show",
    severity: "Low",
    timestamp: "06:56 AM",
    loggedBy: "Assistant Chea Sreyneang",
    notes: "Student Vannak Chea did not appear at Stop #2. Verified excused absence in teacher homeroom system.",
    status: "Resolved",
    notifiedParentsCount: 1,
  },
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-01",
    title: "STEM & Science Fair Registration Open",
    category: "Academic",
    publishedAt: "2026-09-18",
    author: "Academic Director",
    audience: "All",
    content: "Students from Grades 4-12 are invited to present their science and robotics exhibits on Oct 15.",
    readRate: 92,
  },
  {
    id: "ann-02",
    title: "Route 03 Morning Delay Update (Russian Blvd)",
    category: "Transport",
    publishedAt: "Today, 07:16 AM",
    author: "Transport Operations Desk",
    audience: "Route 03 Parents",
    content: "Route 03 is running approximately 12 minutes behind schedule due to municipal drainage construction on Russian Blvd. All students are safe and comfortable onboard.",
    readRate: 100,
  },
  {
    id: "ann-03",
    title: "Term 2 Mid-Term Progress Reports Available",
    category: "Academic",
    publishedAt: "2026-09-12",
    author: "Registrar Office",
    audience: "All",
    content: "Digital progress reports and teacher comments are now downloadable in the Parent and Student portals.",
    readRate: 88,
  },
];
