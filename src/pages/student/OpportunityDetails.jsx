import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const OpportunityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [opportunity, setOpportunity] = useState(null);
  const [student, setStudent] = useState(null);
  const [studentSkills, setStudentSkills] = useState([]);

  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

  const [error, setError] = useState("");
  const [eligibility, setEligibility] = useState(null);

  const [applicationStatus, setApplicationStatus] = useState(null);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Please login first.");
      setLoading(false);
      return;
    }

    const [opportunityResponse, studentResponse, skillsResponse, applicationResponse] =
      await Promise.all([
        supabase
          .from("opportunities")
          .select(`
            *,
            companies (
              company_name
            )
          `)
          .eq("id", id)
          .single(),

        supabase
          .from("students")
          .select("*")
          .eq("id", user.id)
          .single(),

        supabase
          .from("student_skills")
          .select(`
            skill_id,
            skills (
              name
            )
          `)
          .eq("student_id", user.id),

        supabase
          .from("applications")
          .select("id, status")
          .eq("student_id", user.id)
          .eq("opportunity_id", id)
          .maybeSingle(),
      ]);

    if (opportunityResponse.error) {
      setError(opportunityResponse.error.message);
      setLoading(false);
      return;
    }

    if (studentResponse.error) {
      setError("Unable to load your student profile.");
      setLoading(false);
      return;
    }

    if (skillsResponse.error) {
      setError("Unable to load your skills.");
      setLoading(false);
      return;
    }

    if (applicationResponse.error) {
      setError("Unable to load application status.");
      setLoading(false);
      return;
    }

    setOpportunity(opportunityResponse.data);
    setStudent(studentResponse.data);

    const skills = (skillsResponse.data || []).map(
      (item) => item.skills?.name
    );

    setStudentSkills(skills);
    setApplicationStatus(applicationResponse.data?.status || null);

    setLoading(false);
  };

  const checkEligibility = () => {
    if (!student || !opportunity) return;

    setChecking(true);

    const reasons = [];

    // CGPA
    if (
      opportunity.minimum_cgpa !== null &&
      opportunity.minimum_cgpa !== undefined &&
      Number(student.cgpa) < Number(opportunity.minimum_cgpa)
    ) {
      reasons.push(
        `Minimum CGPA required is ${opportunity.minimum_cgpa}. Your CGPA is ${student.cgpa}.`
      );
    }

    // Branch
    if (opportunity.required_branch?.length > 0) {
      const studentBranch = student.branch?.toLowerCase();

      const branchMatch = opportunity.required_branch.some(
        (branch) => branch.toLowerCase() === studentBranch
      );

      if (!branchMatch) {
        reasons.push(
          `Your branch (${student.branch}) is not eligible.`
        );
      }
    }

    // Academic year
    if (opportunity.eligible_years?.length > 0) {
      const yearMatch = opportunity.eligible_years.some(
        (year) =>
          year.toLowerCase() === student.academic_year?.toLowerCase()
      );

      if (!yearMatch) {
        reasons.push(
          `Your academic year (${student.academic_year}) is not eligible.`
        );
      }
    }

    // Skills
    if (opportunity.required_skills?.length > 0) {
      const missingSkills = opportunity.required_skills.filter(
        (requiredSkill) =>
          !studentSkills.some(
            (studentSkill) =>
              studentSkill?.toLowerCase() === requiredSkill.toLowerCase()
          )
      );

      if (missingSkills.length > 0) {
        reasons.push(
          `Missing required skills: ${missingSkills.join(", ")}.`
        );
      }
    }

    setEligibility({
      eligible: reasons.length === 0,
      reasons,
    });

    setChecking(false);
  };

  const handleApply = async () => {
    if (!eligibility?.eligible) {
      alert("You are not eligible for this opportunity.");
      return;
    }

    setApplying(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: existingApplication } = await supabase
      .from("applications")
      .select("id, status")
      .eq("student_id", user.id)
      .eq("opportunity_id", id)
      .maybeSingle();

    if (existingApplication) {
      setApplicationStatus(existingApplication.status);
      setApplying(false);
      return;
    }

    const { error } = await supabase
      .from("applications")
      .insert({
        student_id: user.id,
        opportunity_id: id,
        status: "applied",
        match_percentage: null,
      });

    if (error) {
      alert(`Unable to apply: ${error.message}`);
    } else {
      setApplicationStatus("applied");
    }

    setApplying(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-base text-text-main px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-text-muted">Loading opportunity...</p>
        </div>
      </div>
    );
  }

  if (error || !opportunity) {
    return (
      <div className="min-h-screen bg-bg-base text-text-main px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/student/opportunities")}
            className="text-purple-400 mb-6"
          >
            ← Back to Opportunities
          </button>

          <p className="text-red-400">
            {error || "Opportunity not found."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-base text-text-main px-6 py-10">
      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => navigate("/student/opportunities")}
          className="text-purple-400 hover:text-purple-300 mb-6"
        >
          ← Back to Opportunities
        </button>

        <div className="bg-bg-card border border-border-subtle rounded-2xl p-8">

          <h1 className="text-4xl font-bold mb-3">
            {opportunity.title}
          </h1>

          <p className="text-purple-400 text-xl mb-8">
            {opportunity.companies?.company_name || "Unknown Company"}
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8 text-text-muted">
            <p>
              <span className="text-text-main0">Type:</span>{" "}
              {opportunity.type}
            </p>

            <p>
              <span className="text-text-main0">Location:</span>{" "}
              {opportunity.location || "Not specified"}
            </p>

            <p>
              <span className="text-text-main0">Mode:</span>{" "}
              {opportunity.mode || "Not specified"}
            </p>

            <p>
              <span className="text-text-main0">Minimum CGPA:</span>{" "}
              {opportunity.minimum_cgpa || "Not specified"}
            </p>
          </div>

          {opportunity.description && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">
                Description
              </h2>

              <p className="text-text-muted leading-7">
                {opportunity.description}
              </p>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Eligibility Requirements
            </h2>

            <div className="space-y-3 text-text-muted">

              {opportunity.required_branch?.length > 0 && (
                <p>
                  <span className="text-text-main0">
                    Branch:
                  </span>{" "}
                  {opportunity.required_branch.join(", ")}
                </p>
              )}

              {opportunity.eligible_years?.length > 0 && (
                <p>
                  <span className="text-text-main0">
                    Years:
                  </span>{" "}
                  {opportunity.eligible_years.join(", ")}
                </p>
              )}

            </div>
          </div>

          {opportunity.required_skills?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Required Skills
              </h2>

              <div className="flex flex-wrap gap-2">
                {opportunity.required_skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-purple-500/10 text-purple-300 px-4 py-2 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Eligibility Checker & Apply Flow */}
          <div className="border-t border-border-subtle pt-8">
            {applicationStatus ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
                <h3 className="text-green-400 text-xl font-semibold capitalize">
                  ✓ Application {applicationStatus.replace('_', ' ')}
                </h3>
                <p className="text-text-muted mt-2">
                  You have already applied for this opportunity.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-4">
                  Check Your Eligibility
                </h2>

                <button
                  onClick={checkEligibility}
                  disabled={checking}
                  className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 px-6 py-3 rounded-xl font-medium"
                >
                  {checking ? "Checking..." : "Check Eligibility"}
                </button>

                {eligibility && (
                  <div className="mt-6">
                    {eligibility.eligible ? (
                      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
                        <h3 className="text-green-400 text-xl font-semibold">
                          ✓ You are Eligible
                        </h3>
                        <p className="text-text-muted mt-2">
                          You meet all the requirements for this opportunity.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
                        <h3 className="text-red-400 text-xl font-semibold">
                          ✕ You are Not Eligible
                        </h3>
                        <p className="text-text-muted mt-3 mb-2">Reasons:</p>
                        <ul className="list-disc list-inside text-text-muted space-y-1">
                          {eligibility.reasons.map((reason, index) => (
                            <li key={index}>{reason}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {eligibility.eligible && (
                      <div className="mt-6">
                        <button
                          onClick={handleApply}
                          disabled={applying}
                          className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 px-6 py-3 rounded-xl font-medium"
                        >
                          {applying ? "Applying..." : "Apply Now"}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {opportunity.application_deadline && (
            <p className="text-text-main0 mt-8">
              Deadline:{" "}
              {new Date(
                opportunity.application_deadline
              ).toLocaleDateString()}
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default OpportunityDetails;