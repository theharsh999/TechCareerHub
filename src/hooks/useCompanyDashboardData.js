// src/hooks/useCompanyDashboardData.js

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

// Map UI statuses to known existing database statuses
const STATUS_MAP = {
  "Applied": "applied",
  "Shortlisted": "shortlisted",
  "Interview Scheduled": "interview_scheduled",
  "Offered": "offered",
  "Rejected": "rejected",
};

const DISPLAY_STATUS_MAP = {
  applied: "Applied",
  shortlisted: "Shortlisted",
  interview_scheduled: "Interview Scheduled",
  offered: "Offered",
  rejected: "Rejected",
};

export function useCompanyDashboardData() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCompanyData = useCallback(async () => {
    if (!user?.id) {
      throw new Error("No authenticated user found.");
    }

    // 1. Get company profile
    const { data: company, error: companyError } = await supabase
      .from("companies")
      .select("*")
      .eq("profile_id", user.id)
      .maybeSingle();

    if (companyError) throw companyError;

    if (!company) {
      return {
        profile: {
          name: "New Company",
          logoInitials: "NC",
          industry: "Not specified",
          location: "Not specified",
          website: "#",
          about: "Please set up your company profile.",
          activeOpportunities: 0,
          totalApplicants: 0,
          hiredThisSeason: 0,
        },
        opportunities: [],
        applicants: [],
      };
    }

    // 2. Get company's opportunities
    const { data: opportunityData, error: opportunityError } = await supabase
      .from("opportunities")
      .select("*")
      .eq("company_id", company.id)
      .order("created_at", { ascending: false });

    if (opportunityError) throw opportunityError;

    const companyOpportunities = opportunityData || [];
    const opportunityIds = companyOpportunities.map((op) => op.id);

    // 3. Get applications
    let applicationData = [];
    if (opportunityIds.length > 0) {
      const { data, error: applicationError } = await supabase
        .from("applications")
        .select("*")
        .in("opportunity_id", opportunityIds)
        .order("applied_at", { ascending: false });

      if (applicationError) throw applicationError;
      applicationData = data || [];
    }

    // 4. Get student details (Using explicit separate query to avoid guessing FKs)
    const studentIds = [...new Set(applicationData.map((a) => a.student_id))];
    let students = [];
    if (studentIds.length > 0) {
      const { data, error: studentError } = await supabase
        .from("students")
        .select("id, roll_no, resume_url")
        .in("id", studentIds);

      if (studentError) throw studentError;
      students = data || [];
    }

    // 5. Get profile details (Using explicit separate query)
    let studentProfiles = [];
    if (studentIds.length > 0) {
      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("id, full_name")
        .in("id", studentIds);

      if (profileError) throw profileError;
      studentProfiles = data || [];
    }

    // 6. Create lookup maps
    const studentMap = new Map(students.map((s) => [s.id, s]));
    const profileMap = new Map(studentProfiles.map((p) => [p.id, p]));
    const opportunityMap = new Map(companyOpportunities.map((o) => [o.id, o]));

    // 7. Format opportunities
    const formattedOpportunities = companyOpportunities.map((opportunity) => {
      const applicantCount = applicationData.filter(
        (a) => a.opportunity_id === opportunity.id
      ).length;

      return {
        id: opportunity.id,
        title: opportunity.title,
        type: opportunity.type,
        location: opportunity.location,
        stipend: opportunity.stipend || "Not specified",
        deadline: opportunity.application_deadline,
        applicants: applicantCount,
        status: opportunity.status || "Open",
      };
    });

    // 8. Format applicants
    const formattedApplicants = applicationData.map((application) => {
      const student = studentMap.get(application.student_id);
      const studentProfile = profileMap.get(application.student_id);
      const opportunity = opportunityMap.get(application.opportunity_id);

      return {
        id: application.id,
        studentName: studentProfile?.full_name || (student?.roll_no ? `Student (Roll No: ${student.roll_no})` : "Unknown Student"),
        rollNo: student?.roll_no || "N/A",
        opportunity: opportunity?.title || "Unknown Opportunity",
        appliedDate: application.applied_at,
        resumeUrl: student?.resume_url || "#",
        status: DISPLAY_STATUS_MAP[application.status] || "Applied",
      };
    });

    // 9. Company statistics
    const activeOpportunities = companyOpportunities.filter(
      (o) => (o.status || "Open").toLowerCase() === "open"
    ).length;

    const totalApplicants = applicationData.length;

    // Use 'offered' to accurately reflect hired candidates this season.
    const hiredThisSeason = applicationData.filter(
      (a) => a.status === "offered"
    ).length;

    // 10. Final profile shape
    const formattedProfile = {
      name: company.company_name,
      logoInitials: (company.company_name || "CO")
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      industry: company.industry || "Not specified",
      location: company.location || "Not specified",
      website: company.website || "#",
      about: company.about || "No company description available.",
      activeOpportunities,
      totalApplicants,
      hiredThisSeason,
    };

    return {
      profile: formattedProfile,
      opportunities: formattedOpportunities,
      applicants: formattedApplicants,
    };
  }, [user]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchCompanyData();
      setProfile(data.profile);
      setOpportunities(data.opportunities);
      setApplicants(data.applicants);
    } catch (err) {
      console.error("Company dashboard error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchCompanyData]);

  useEffect(() => {
    load();
  }, [load]);

  const postOpportunity = useCallback(
    async (opportunity) => {
      if (!user?.id) return;

      try {
        const { data: company, error: companyError } = await supabase
          .from("companies")
          .select("id")
          .eq("profile_id", user.id)
          .maybeSingle();

        if (companyError) throw companyError;
        if (!company) throw new Error("Please complete your company profile before posting an opportunity.");

        const { error } = await supabase
          .from("opportunities")
          .insert({
            company_id: company.id,
            title: opportunity.title,
            type: opportunity.type === "Full-time" ? "job" : "internship",
            location: opportunity.location,
            stipend: opportunity.stipend,
            application_deadline: opportunity.deadline,
            status: "Open",
            minimum_cgpa: opportunity.minimum_cgpa || null,
            required_branch: opportunity.eligible_branches?.length > 0 ? opportunity.eligible_branches : null,
            eligible_years: opportunity.eligible_years?.length > 0 ? opportunity.eligible_years : null,
            required_skills: opportunity.required_skills?.length > 0 ? opportunity.required_skills : null,
          });

        if (error) throw error;

        await load();
      } catch (err) {
        console.error("Post opportunity error:", err);
        setError(err);
      }
    },
    [user, load]
  );

  const updateApplicantStatus = useCallback(
    async (applicantId, status) => {
      try {
        const dbStatus = STATUS_MAP[status] || "applied";

        // Important: We should ideally only update if the opportunity belongs to the company.
        // Given we don't want to make complex nested RPC updates, we rely on RLS 
        // to prevent unauthorized updates, but we do standard update here.
        const { data, error } = await supabase
          .from("applications")
          .update({
            status: dbStatus,
          })
          .eq("id", applicantId)
          .select();

        if (error) throw error;
        if (!data || data.length === 0) {
          throw new Error("Update failed. You may not have permission to modify this applicant's status (RLS check failed) or the application does not exist.");
        }

        await load();
      } catch (err) {
        console.error("Update applicant status error:", err);
        setError(err);
      }
    },
    [load]
  );

  return {
    profile,
    opportunities,
    applicants,
    loading,
    error,
    postOpportunity,
    updateApplicantStatus,
    refresh: load,
  };
}