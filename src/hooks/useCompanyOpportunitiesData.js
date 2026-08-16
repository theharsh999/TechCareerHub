import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export function useCompanyOpportunitiesData() {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOpportunities = useCallback(async () => {
    if (!user?.id) throw new Error("No authenticated user found.");

    // Get company profile
    const { data: company, error: companyError } = await supabase
      .from("companies")
      .select("id")
      .eq("profile_id", user.id)
      .single();

    if (companyError) throw companyError;

    // Get company's opportunities
    const { data: opportunityData, error: opportunityError } = await supabase
      .from("opportunities")
      .select("*")
      .eq("company_id", company.id)
      .order("created_at", { ascending: false });

    if (opportunityError) throw opportunityError;

    const companyOpportunities = opportunityData || [];
    const opportunityIds = companyOpportunities.map((op) => op.id);

    // Get applications to count applicants
    let applicationData = [];
    if (opportunityIds.length > 0) {
      const { data, error: applicationError } = await supabase
        .from("applications")
        .select("opportunity_id")
        .in("opportunity_id", opportunityIds);

      if (applicationError) throw applicationError;
      applicationData = data || [];
    }

    // Format opportunities
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

    return formattedOpportunities;
  }, [user]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchOpportunities();
      setOpportunities(data);
    } catch (err) {
      console.error("Fetch opportunities error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchOpportunities]);

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
          .single();

        if (companyError) throw companyError;

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

  return {
    opportunities,
    loading,
    error,
    postOpportunity,
    refresh: load,
  };
}
