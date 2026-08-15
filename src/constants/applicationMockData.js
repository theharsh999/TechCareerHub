// src/constants/applicationMockData.js
// Mock data for the student-facing Apply System + Application Tracker.
// Swap the getters in hooks/useApplicationTracker.js for real Supabase
// queries later; keep these shapes the same and no component changes.

export const APPLICATION_STAGES = [
  "Applied",
  "Shortlisted",
  "Interview",
  "Selected",
];

// "Rejected" is a terminal state that can happen at any stage — handled
// separately from the linear pipeline above (see ApplicationStatusTracker).
export const REJECTED = "Rejected";

export const mockAvailableOpportunities = [
  {
    id: "OPP-201",
    title: "SDE Intern",
    company: "Zensoft Technologies",
    type: "Internship",
    location: "Pune (Hybrid)",
    stipend: "₹35,000/mo",
    deadline: "2026-08-30",
    eligibility: "CGPA ≥ 7.0, CS/IT branch",
  },
  {
    id: "OPP-202",
    title: "Backend Developer",
    company: "Zensoft Technologies",
    type: "Full-time",
    location: "Pune (On-site)",
    stipend: "6.4 LPA",
    deadline: "2026-09-05",
    eligibility: "CGPA ≥ 7.5, no active backlogs",
  },
  {
    id: "OPP-301",
    title: "Frontend Engineer Intern",
    company: "Nimbus Cloud Labs",
    type: "Internship",
    location: "Remote",
    stipend: "₹28,000/mo",
    deadline: "2026-08-25",
    eligibility: "CGPA ≥ 6.5, all branches",
  },
  {
    id: "OPP-302",
    title: "Data Analyst",
    company: "Nimbus Cloud Labs",
    type: "Full-time",
    location: "Bengaluru (Hybrid)",
    stipend: "5.8 LPA",
    deadline: "2026-09-10",
    eligibility: "CGPA ≥ 7.0, CS/IT/ECE branch",
  },
];

// Applications the current student has already submitted. `status`
// mirrors what a company recruiter sets via ApplicantsTable.jsx on their
// side — in the real app these come from the same `applications` table.
export const mockMyApplications = [
  {
    id: "APL-901",
    opportunityId: "OPP-201",
    title: "SDE Intern",
    company: "Zensoft Technologies",
    appliedDate: "2026-08-05",
    status: "Interview",
  },
  {
    id: "APL-902",
    opportunityId: "OPP-301",
    title: "Frontend Engineer Intern",
    company: "Nimbus Cloud Labs",
    appliedDate: "2026-08-10",
    status: "Applied",
  },
  {
    id: "APL-903",
    opportunityId: "OPP-202",
    title: "Backend Developer",
    company: "Zensoft Technologies",
    appliedDate: "2026-08-02",
    status: "Rejected",
  },
];
