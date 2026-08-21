import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrainCircuit, ArrowRight } from "lucide-react";
import { supabase } from "../../lib/supabase";
import StudentNavbar from "../../components/student/StudentNavbar";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("applications")
      .select(`
        id,
        status,
        applied_at,
        opportunities (
          title,
          companies (
            company_name
          )
        )
      `)
      .eq("student_id", user.id)
      .order("applied_at", { ascending: false });

    if (error) {
      console.error("Dashboard applications error:", error.message);
    } else {
      setApplications(data || []);
    }

    setLoading(false);
  };

  const totalApplications = applications.length;

  const appliedCount = applications.filter(
    (application) => application.status === "applied"
  ).length;

  const shortlistedCount = applications.filter(
    (application) => application.status === "shortlisted"
  ).length;

  const rejectedCount = applications.filter(
    (application) => application.status === "rejected"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-base text-text-main px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-text-muted">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <StudentNavbar />
      <div className="min-h-screen bg-bg-base text-text-main px-6 py-10">
        <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Student Dashboard
          </h1>

          <p className="text-text-muted mt-2">
            Track your opportunities and applications.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

          <div className="bg-bg-card border border-border-subtle rounded-2xl p-6">
            <p className="text-text-muted">Total Applications</p>
            <p className="text-3xl font-bold mt-2">
              {totalApplications}
            </p>
          </div>

          <div className="bg-bg-card border border-border-subtle rounded-2xl p-6">
            <p className="text-text-muted">Applied</p>
            <p className="text-3xl font-bold mt-2 text-blue-400">
              {appliedCount}
            </p>
          </div>

          <div className="bg-bg-card border border-border-subtle rounded-2xl p-6">
            <p className="text-text-muted">Shortlisted</p>
            <p className="text-3xl font-bold mt-2 text-green-400">
              {shortlistedCount}
            </p>
          </div>

          <div className="bg-bg-card border border-border-subtle rounded-2xl p-6">
            <p className="text-text-muted">Rejected</p>
            <p className="text-3xl font-bold mt-2 text-red-400">
              {rejectedCount}
            </p>
          </div>

        </div>

        {/* AI Assessment Feature */}
        <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex items-start sm:items-center gap-5 relative z-10">
            <div className="bg-blue-500/10 p-4 rounded-2xl border border-blue-500/20">
              <BrainCircuit className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">AI Skill Assessment</h2>
              <p className="text-text-muted text-sm sm:text-base max-w-xl">
                Test your technical skills and discover the areas you should improve. 
                <span className="inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-border-subtle">10 questions • ~5 min</span>
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/student/assessment')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors flex items-center justify-center gap-2 relative z-10 whitespace-nowrap"
          >
            Take Assessment
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Recent Applications */}
        <div className="bg-bg-card border border-border-subtle rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-6">
            Recent Applications
          </h2>

          {applications.length === 0 ? (
            <p className="text-text-muted">
              You haven't applied to any opportunities yet.
            </p>
          ) : (
            <div className="space-y-4">

              {applications.slice(0, 5).map((application) => (
                <div
                  key={application.id}
                  className="border border-border-subtle rounded-xl p-5"
                >

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                    <div>
                      <h3 className="font-semibold text-lg">
                        {application.opportunities?.title ||
                          "Unknown Opportunity"}
                      </h3>

                      <p className="text-text-muted mt-1">
                        {application.opportunities?.companies?.company_name ||
                          "Unknown Company"}
                      </p>

                      <p className="text-text-main0 text-sm mt-2">
                        Applied on{" "}
                        {new Date(
                          application.applied_at
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <span className="capitalize px-4 py-2 rounded-full bg-purple-500/10 text-purple-300 text-sm">
                      {application.status}
                    </span>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
      </div>
    </>
  );
};

export default StudentDashboard;