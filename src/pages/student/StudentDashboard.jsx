import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <div className="min-h-screen bg-[#080d19] text-white px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <StudentNavbar />
      <div className="min-h-screen bg-[#080d19] text-white px-6 py-10">
        <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Student Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Track your opportunities and applications.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

          <div className="bg-[#0d1424] border border-slate-800 rounded-2xl p-6">
            <p className="text-slate-400">Total Applications</p>
            <p className="text-3xl font-bold mt-2">
              {totalApplications}
            </p>
          </div>

          <div className="bg-[#0d1424] border border-slate-800 rounded-2xl p-6">
            <p className="text-slate-400">Applied</p>
            <p className="text-3xl font-bold mt-2 text-blue-400">
              {appliedCount}
            </p>
          </div>

          <div className="bg-[#0d1424] border border-slate-800 rounded-2xl p-6">
            <p className="text-slate-400">Shortlisted</p>
            <p className="text-3xl font-bold mt-2 text-green-400">
              {shortlistedCount}
            </p>
          </div>

          <div className="bg-[#0d1424] border border-slate-800 rounded-2xl p-6">
            <p className="text-slate-400">Rejected</p>
            <p className="text-3xl font-bold mt-2 text-red-400">
              {rejectedCount}
            </p>
          </div>

        </div>

        {/* Recent Applications */}
        <div className="bg-[#0d1424] border border-slate-800 rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-6">
            Recent Applications
          </h2>

          {applications.length === 0 ? (
            <p className="text-slate-400">
              You haven't applied to any opportunities yet.
            </p>
          ) : (
            <div className="space-y-4">

              {applications.slice(0, 5).map((application) => (
                <div
                  key={application.id}
                  className="border border-slate-800 rounded-xl p-5"
                >

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                    <div>
                      <h3 className="font-semibold text-lg">
                        {application.opportunities?.title ||
                          "Unknown Opportunity"}
                      </h3>

                      <p className="text-slate-400 mt-1">
                        {application.opportunities?.companies?.company_name ||
                          "Unknown Company"}
                      </p>

                      <p className="text-slate-500 text-sm mt-2">
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