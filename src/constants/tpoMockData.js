// src/constants/tpoMockData.js
// Realistic mock data for the TPO Dashboard + Notifications module.
// Replace the getters in hooks/useTPODashboardData.js with real Supabase
// queries later — component code does not need to change as long as the
// returned shapes below are preserved.

export const APPLICATION_STATUSES = {
  APPLIED: "Applied",
  SHORTLISTED: "Shortlisted",
  INTERVIEW: "Interview Scheduled",
  OFFERED: "Offered",
  SELECTED: "Selected",
  REJECTED: "Rejected",
};

export const mockStats = {
  totalStudents: 486,
  activeApplications: 132,
  studentsPlaced: 97,
  activeDrives: 14,
  placementRate: 68, // percent
  avgPackage: "6.4 LPA",
};

// ── NEW: per-student profile data (Resume Builder module output) ──────────
// Later this comes from your `students` / `resumes` tables in Supabase.
export const mockStudentProfiles = [
  {
    rollNo: "CS21B045",
    name: "Ananya Sharma",
    resumeCompletion: 90,
    skills: ["JavaScript", "React", "Node.js", "SQL"],
  },
  {
    rollNo: "CS21B012",
    name: "Rohan Patil",
    resumeCompletion: 55,
    skills: ["Java", "Spring Boot"],
  },
  {
    rollNo: "IT21B078",
    name: "Ishita Verma",
    resumeCompletion: 95,
    skills: ["Python", "Pandas", "SQL", "Power BI", "Excel"],
  },
  {
    rollNo: "CS21B091",
    name: "Devansh Kulkarni",
    resumeCompletion: 40,
    skills: ["C++"],
  },
  {
    rollNo: "EC21B033",
    name: "Priya Nair",
    resumeCompletion: 88,
    skills: ["C", "Embedded C", "RTOS", "Circuit Design"],
  },
  {
    rollNo: "CS21B058",
    name: "Karan Mehta",
    resumeCompletion: 60,
    skills: ["Java"],
  },
  // Update mockStudentProfiles in src/constants/tpoMockData.js
  {
    rollNo: "CS21B045",
    name: "Ananya Sharma",
    cgpa: 8.8,
    backlogs: 0,
    isVerifiedByTPO: true,
    resumeCompletion: 90,
    skills: ["JavaScript", "React", "Node.js", "SQL"],
  },
  {
    rollNo: "CS21B012",
    name: "Rohan Patil",
    cgpa: 7.2,
    backlogs: 1,
    isVerifiedByTPO: true,
    resumeCompletion: 55,
    skills: ["Java", "Spring Boot"],
  },
  {
    rollNo: "IT21B078",
    name: "Ishita Verma",
    cgpa: 9.1,
    backlogs: 0,
    isVerifiedByTPO: true,
    resumeCompletion: 95,
    skills: ["Python", "Pandas", "SQL", "Power BI", "Excel"],
  },
  {
    rollNo: "CS21B091",
    name: "Devansh Kulkarni",
    cgpa: 6.8,
    backlogs: 0,
    isVerifiedByTPO: false, // Unverified
    resumeCompletion: 40,
    skills: ["C++"],
  },

];

// ── UPDATED: each application now carries requiredSkills (from the job
// posting) and interviewScore (null if no interview happened yet) ─────────
export const mockApplications = [
  {
    id: "APP-1042",
    studentName: "Ananya Sharma",
    rollNo: "CS21B045",
    company: "Zensoft Technologies",
    role: "SDE Intern",
    requiredSkills: ["JavaScript", "React", "Node.js", "Git"],
    appliedDate: "2026-08-05",
    deadline: "2026-08-14",
    status: APPLICATION_STATUSES.INTERVIEW,
    interviewScore: 7.5,
  },
  {
    id: "APP-1043",
    studentName: "Rohan Patil",
    rollNo: "CS21B012",
    company: "Nimbus Cloud Systems",
    role: "Backend Developer",
    requiredSkills: ["Java", "Spring Boot", "SQL", "Docker"],
    appliedDate: "2026-08-03",
    deadline: "2026-08-13",
    status: APPLICATION_STATUSES.SHORTLISTED,
    interviewScore: null,
  },
  {
    id: "APP-1044",
    studentName: "Ishita Verma",
    rollNo: "IT21B078",
    company: "Quantify Analytics",
    role: "Data Analyst Intern",
    requiredSkills: ["Python", "SQL", "Power BI"],
    appliedDate: "2026-07-30",
    deadline: "2026-08-12",
    status: APPLICATION_STATUSES.OFFERED,
    interviewScore: 8.2,
  },
  {
    id: "APP-1045",
    studentName: "Devansh Kulkarni",
    rollNo: "CS21B091",
    company: "Zensoft Technologies",
    role: "SDE Intern",
    requiredSkills: ["JavaScript", "React", "Node.js", "Git"],
    appliedDate: "2026-08-06",
    deadline: "2026-08-14",
    status: APPLICATION_STATUSES.APPLIED,
    interviewScore: null,
  },
  {
    id: "APP-1046",
    studentName: "Priya Nair",
    rollNo: "EC21B033",
    company: "Orbit Semiconductors",
    role: "Embedded Systems Intern",
    requiredSkills: ["Embedded C", "RTOS", "Circuit Design"],
    appliedDate: "2026-07-28",
    deadline: "2026-08-10",
    status: APPLICATION_STATUSES.SELECTED,
    interviewScore: 9.0,
  },
  {
    id: "APP-1047",
    studentName: "Karan Mehta",
    rollNo: "CS21B058",
    company: "Nimbus Cloud Systems",
    role: "Backend Developer",
    requiredSkills: ["Java", "Spring Boot", "SQL", "Docker"],
    appliedDate: "2026-08-01",
    deadline: "2026-08-13",
    status: APPLICATION_STATUSES.REJECTED,
    interviewScore: 3.5,
  },
  // A couple of extra applications so Karan/Devansh show a real rejection pattern
  {
    id: "APP-1048",
    studentName: "Karan Mehta",
    rollNo: "CS21B058",
    company: "Orbit Semiconductors",
    role: "Embedded Systems Intern",
    requiredSkills: ["Embedded C", "RTOS"],
    appliedDate: "2026-07-20",
    deadline: "2026-07-30",
    status: APPLICATION_STATUSES.REJECTED,
    interviewScore: 2.0,
  },
  {
    id: "APP-1049",
    studentName: "Devansh Kulkarni",
    rollNo: "CS21B091",
    company: "Quantify Analytics",
    role: "Data Analyst Intern",
    requiredSkills: ["Python", "SQL", "Power BI"],
    appliedDate: "2026-07-22",
    deadline: "2026-08-01",
    status: APPLICATION_STATUSES.REJECTED,
    interviewScore: 3.0,
  },
];

export const mockNotifications = [
  {
    id: "NTF-01",
    type: "deadline",
    title: "Application deadline approaching",
    message: "Zensoft Technologies (SDE Intern) closes in 2 days — 18 students yet to apply.",
    time: "2026-08-12T09:15:00",
    read: false,
    priority: "high",
  },
  {
    id: "NTF-02",
    type: "status",
    title: "Student selected",
    message: "Priya Nair (EC21B033) has been selected by Orbit Semiconductors.",
    time: "2026-08-11T17:40:00",
    read: false,
    priority: "normal",
  },
  {
    id: "NTF-03",
    type: "deadline",
    title: "Drive closing soon",
    message: "Quantify Analytics (Data Analyst Intern) closes tomorrow.",
    time: "2026-08-11T11:00:00",
    read: false,
    priority: "high",
  },
  {
    id: "NTF-04",
    type: "status",
    title: "Application rejected",
    message: "Karan Mehta (CS21B058) was not selected by Nimbus Cloud Systems.",
    time: "2026-08-10T14:20:00",
    read: true,
    priority: "low",
  },
  {
    id: "NTF-05",
    type: "general",
    title: "New drive posted",
    message: "Orbit Semiconductors opened a new drive for Embedded Systems Intern.",
    time: "2026-08-09T10:05:00",
    read: true,
    priority: "normal",
  },
];