import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import StudentNavbar from "../../components/student/StudentNavbar";

const StudentApplications = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
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

    const { data, error } = await supabase
      .from("applications")
      .select(`
        id,
        status,
        match_percentage,
        applied_at,
        opportunity_id,
        opportunities (
          id,
          title,
          type,
          location,
          mode,
          application_deadline,
          companies (
            company_name
          )
        )
      `)
      .eq("student_id", user.id)
      .order("applied_at", { ascending: false });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setApplications(data || []);
    setLoading(false);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "applied":
        return "bg-purple-500/10 text-purple-300 border-purple-500/30";

      case "shortlisted":
        return "bg-green-500/10 text-green-400 border-green-500/30";

      case "rejected":
        return "bg-red-500/10 text-red-400 border-red-500/30";

      default:
        return "bg-slate-500/10 text-text-muted border-slate-500/30";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-base text-text-main px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-text-muted">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <StudentNavbar />
      <div className="min-h-screen bg-bg-base text-text-main px-6 py-10">
        <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/student/dashboard")}
            className="text-purple-400 hover:text-purple-300 mb-5"
          >
            ← Back to Dashboard
          </button>

          <h1 className="text-4xl font-bold mb-2">
            My Applications
          </h1>

          <p className="text-text-muted">
            Track all your job and internship applications.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5 text-red-400 mb-6">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!error && applications.length === 0 && (
          <div className="bg-bg-card border border-border-subtle rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-semibold mb-3">
              No Applications Yet
            </h2>

            <p className="text-text-muted mb-6">
              You haven't applied to any opportunities yet.
            </p>

            <button
              onClick={() => navigate("/student/opportunities")}
              className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl font-medium"
            >
              Browse Opportunities
            </button>
          </div>
        )}

        {/* Applications */}
        <div className="space-y-5">
          {applications.map((application) => {
            const opportunity = application.opportunities;

            return (
              <div
                key={application.id}
                className="bg-bg-card border border-border-subtle rounded-2xl p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

                  {/* Details */}
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">
                      {opportunity?.title || "Unknown Opportunity"}
                    </h2>

                    <p className="text-purple-400 text-lg mb-4">
                      {opportunity?.companies?.company_name ||
                        "Unknown Company"}
                    </p>

                    <div className="space-y-2 text-text-muted">

                      {opportunity?.type && (
                        <p>
                          <span className="text-text-main0">
                            Type:
                          </span>{" "}
                          {opportunity.type}
                        </p>
                      )}

                      {opportunity?.location && (
                        <p>
                          <span className="text-text-main0">
                            Location:
                          </span>{" "}
                          {opportunity.location}
                        </p>
                      )}

                      {opportunity?.mode && (
                        <p>
                          <span className="text-text-main0">
                            Mode:
                          </span>{" "}
                          {opportunity.mode}
                        </p>
                      )}

                      {application.applied_at && (
                        <p>
                          <span className="text-text-main0">
                            Applied on:
                          </span>{" "}
                          {new Date(
                            application.applied_at
                          ).toLocaleDateString()}
                        </p>
                      )}

                      {application.match_percentage !== null && (
                        <p>
                          <span className="text-text-main0">
                            Match:
                          </span>{" "}
                          {application.match_percentage}%
                        </p>
                      )}

                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <span
                      className={`inline-block px-4 py-2 rounded-full border capitalize font-medium ${getStatusStyle(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>
                  </div>
                </div>

                {/* View Opportunity */}
                {opportunity?.id && (
                  <div className="mt-6 pt-5 border-t border-border-subtle">
                    <button
                      onClick={() =>
                        navigate(
                          `/student/opportunities/${opportunity.id}`
                        )
                      }
                      className="text-purple-400 hover:text-purple-300 font-medium"
                    >
                      View Opportunity →
                    </button>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
      </div>
    </>
  );
};

export default StudentApplications;