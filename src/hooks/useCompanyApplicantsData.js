import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

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

export function useCompanyApplicantsData() {
  const { user } = useAuth();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplicants = useCallback(async () => {
    if (!user?.id) throw new Error("No authenticated user found.");

    // 1. Get company
    const { data: company, error: companyError } = await supabase
      .from("companies")
      .select("id")
      .eq("profile_id", user.id)
      .maybeSingle();

    if (companyError) throw companyError;
    if (!company) return [];

    // 2. Get opportunities
    const { data: opportunities, error: oppError } = await supabase
      .from("opportunities")
      .select("id, title")
      .eq("company_id", company.id);

    if (oppError) throw oppError;

    const opportunityIds = opportunities?.map((o) => o.id) || [];
    
    // 3. Get applications
    let applicationData = [];
    if (opportunityIds.length > 0) {
      const { data, error: appError } = await supabase
        .from("applications")
        .select("*")
        .in("opportunity_id", opportunityIds)
        .order("applied_at", { ascending: false });

      if (appError) throw appError;
      applicationData = data || [];
    }

    // 4. Get student details
    const studentIds = [...new Set(applicationData.map((a) => a.student_id))];
    let students = [];
    if (studentIds.length > 0) {
      const { data, error: stuError } = await supabase
        .from("students")
        .select("id, roll_no, resume_url")
        .in("id", studentIds);

      if (stuError) throw stuError;
      students = data || [];
    }

    // 5. Get profile details
    let studentProfiles = [];
    if (studentIds.length > 0) {
      const { data, error: profError } = await supabase
        .from("profiles")
        .select("id, full_name")
        .in("id", studentIds);

      if (profError) throw profError;
      studentProfiles = data || [];
    }

    const studentMap = new Map(students.map((s) => [s.id, s]));
    const profileMap = new Map(studentProfiles.map((p) => [p.id, p]));
    const oppMap = new Map(opportunities?.map((o) => [o.id, o]) || []);

    return applicationData.map((application) => {
      const student = studentMap.get(application.student_id);
      const studentProfile = profileMap.get(application.student_id);
      const opportunity = oppMap.get(application.opportunity_id);

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
  }, [user]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchApplicants();
      setApplicants(data);
    } catch (err) {
      console.error("Fetch applicants error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchApplicants]);

  useEffect(() => {
    load();
  }, [load]);

  const updateApplicantStatus = useCallback(
    async (applicantId, status) => {
      try {
        const dbStatus = STATUS_MAP[status] || "applied";

        const { data, error } = await supabase
          .from("applications")
          .update({ status: dbStatus })
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
    applicants,
    loading,
    error,
    updateApplicantStatus,
    refresh: load,
  };
}
