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

export const mockApplications = [
  {
    id: "APP-1042",
    studentName: "Ananya Sharma",
    rollNo: "CS21B045",
    company: "Zensoft Technologies",
    role: "SDE Intern",
    appliedDate: "2026-08-05",
    deadline: "2026-08-14",
    status: APPLICATION_STATUSES.INTERVIEW,
  },
  {
    id: "APP-1043",
    studentName: "Rohan Patil",
    rollNo: "CS21B012",
    company: "Nimbus Cloud Systems",
    role: "Backend Developer",
    appliedDate: "2026-08-03",
    deadline: "2026-08-13",
    status: APPLICATION_STATUSES.SHORTLISTED,
  },
  {
    id: "APP-1044",
    studentName: "Ishita Verma",
    rollNo: "IT21B078",
    company: "Quantify Analytics",
    role: "Data Analyst Intern",
    appliedDate: "2026-07-30",
    deadline: "2026-08-12",
    status: APPLICATION_STATUSES.OFFERED,
  },
  {
    id: "APP-1045",
    studentName: "Devansh Kulkarni",
    rollNo: "CS21B091",
    company: "Zensoft Technologies",
    role: "SDE Intern",
    appliedDate: "2026-08-06",
    deadline: "2026-08-14",
    status: APPLICATION_STATUSES.APPLIED,
  },
  {
    id: "APP-1046",
    studentName: "Priya Nair",
    rollNo: "EC21B033",
    company: "Orbit Semiconductors",
    role: "Embedded Systems Intern",
    appliedDate: "2026-07-28",
    deadline: "2026-08-10",
    status: APPLICATION_STATUSES.SELECTED,
  },
  {
    id: "APP-1047",
    studentName: "Karan Mehta",
    rollNo: "CS21B058",
    company: "Nimbus Cloud Systems",
    role: "Backend Developer",
    appliedDate: "2026-08-01",
    deadline: "2026-08-13",
    status: APPLICATION_STATUSES.REJECTED,
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
