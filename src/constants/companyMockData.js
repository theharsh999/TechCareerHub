// src/constants/companyMockData.js
// Realistic mock data for the Company Dashboard module.
// Replace the getters in hooks/useCompanyDashboardData.js with real
// Supabase queries later — component code does not need to change as
// long as the returned shapes below are preserved.

export const APPLICANT_STATUSES = {
  APPLIED: "Applied",
  SHORTLISTED: "Shortlisted",
  INTERVIEW: "Interview Scheduled",
  OFFERED: "Offered",
  REJECTED: "Rejected",
};

export const mockCompanyProfile = {
  name: "Zensoft Technologies",
  logoInitials: "ZT",
  industry: "Software / SaaS",
  location: "Pune, India",
  website: "https://zensoft.example.com",
  about:
    "Zensoft builds developer tooling for mid-market SaaS companies. We hire interns and full-time engineers across backend, frontend, and DevOps.",
  activeOpportunities: 3,
  totalApplicants: 41,
  hiredThisSeason: 6,
};

export const mockOpportunities = [
  {
    id: "OPP-201",
    title: "SDE Intern",
    type: "Internship",
    location: "Pune (Hybrid)",
    stipend: "₹35,000/mo",
    deadline: "2026-08-14",
    applicants: 18,
    status: "Open",
  },
  {
    id: "OPP-202",
    title: "Backend Developer",
    type: "Full-time",
    location: "Pune (On-site)",
    stipend: "6.4 LPA",
    deadline: "2026-08-20",
    applicants: 15,
    status: "Open",
  },
  {
    id: "OPP-203",
    title: "QA Automation Intern",
    type: "Internship",
    location: "Remote",
    stipend: "₹20,000/mo",
    deadline: "2026-08-05",
    applicants: 8,
    status: "Closed",
  },
];

export const mockApplicants = [
  {
    id: "APL-501",
    studentName: "Ananya Sharma",
    rollNo: "CS21B045",
    opportunity: "SDE Intern",
    appliedDate: "2026-08-05",
    resumeUrl: "#",
    status: APPLICANT_STATUSES.INTERVIEW,
  },
  {
    id: "APL-502",
    studentName: "Devansh Kulkarni",
    rollNo: "CS21B091",
    opportunity: "SDE Intern",
    appliedDate: "2026-08-06",
    resumeUrl: "#",
    status: APPLICANT_STATUSES.APPLIED,
  },
  {
    id: "APL-503",
    studentName: "Karan Mehta",
    rollNo: "CS21B058",
    opportunity: "Backend Developer",
    appliedDate: "2026-08-01",
    resumeUrl: "#",
    status: APPLICANT_STATUSES.REJECTED,
  },
  {
    id: "APL-504",
    studentName: "Meera Joshi",
    rollNo: "CS21B067",
    opportunity: "Backend Developer",
    appliedDate: "2026-08-02",
    resumeUrl: "#",
    status: APPLICANT_STATUSES.SHORTLISTED,
  },
  {
    id: "APL-505",
    studentName: "Rohan Patil",
    rollNo: "CS21B012",
    opportunity: "SDE Intern",
    appliedDate: "2026-08-03",
    resumeUrl: "#",
    status: APPLICANT_STATUSES.OFFERED,
  },
];
