import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import StudentNavbar from "../../components/student/StudentNavbar";

const Opportunities = () => {
  const navigate = useNavigate();

  const [opportunities, setOpportunities] = useState([]);
  const [appliedOpportunityIds, setAppliedOpportunityIds] = useState(new Set());
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    setLoading(true);
    setError("");

    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("opportunities")
      .select(`
        *,
        companies (
          company_name
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Opportunities error:", error);
      setError(`Unable to load opportunities: ${error.message}`);
    } else {
      setOpportunities(data || []);
      
      // Fetch user's applications
      if (user) {
        const { data: appsData } = await supabase
          .from("applications")
          .select("opportunity_id")
          .eq("student_id", user.id);
          
        if (appsData) {
          setAppliedOpportunityIds(new Set(appsData.map(a => a.opportunity_id)));
        }
      }
    }

    setLoading(false);
  };

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const text = `
      ${opportunity.title}
      ${opportunity.companies?.company_name || ""}
      ${opportunity.type}
      ${opportunity.location || ""}
      ${opportunity.mode || ""}
    `.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  return (
    <>
      <StudentNavbar />
      <div className="min-h-screen bg-bg-base text-text-main px-6 py-10">
        <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Opportunities
          </h1>

          <p className="text-text-muted mt-2 text-lg">
            Find internships, jobs and other career opportunities.
          </p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search opportunities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-bg-card border border-border-subtle rounded-xl px-5 py-4 text-lg outline-none focus:border-purple-500 mb-8"
        />

        {/* Loading */}
        {loading && (
          <p className="text-text-muted">
            Loading opportunities...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-400">
            {error}
          </p>
        )}

        {/* No opportunities */}
        {!loading && !error && filteredOpportunities.length === 0 && (
          <div className="bg-bg-card border border-border-subtle rounded-xl p-8 text-center">
            <p className="text-text-muted">
              No opportunities found.
            </p>
          </div>
        )}

        {/* Opportunities */}
        {!loading && !error && filteredOpportunities.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {filteredOpportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                onClick={() =>
                  navigate(`/student/opportunities/${opportunity.id}`)
                }
                className="bg-bg-card border border-border-subtle rounded-2xl p-6 cursor-pointer hover:border-purple-500 transition"
              >

                {/* Title */}
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-2xl font-semibold">
                    {opportunity.title}
                  </h2>
                  {appliedOpportunityIds.has(opportunity.id) && (
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ml-3">
                      ✓ Applied
                    </span>
                  )}
                </div>

                {/* Company */}
                <p className="text-purple-400 font-medium mb-5">
                  {opportunity.companies?.company_name || "Unknown Company"}
                </p>

                {/* Details */}
                <div className="space-y-2 text-text-muted">

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

                {/* Skills */}
                {opportunity.required_skills?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {opportunity.required_skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Deadline */}
                {opportunity.application_deadline && (
                  <p className="text-text-main0 text-sm mt-5">
                    Deadline:{" "}
                    {new Date(
                      opportunity.application_deadline
                    ).toLocaleDateString()}
                  </p>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
      </div>
    </>
  );
};
export default Opportunities;