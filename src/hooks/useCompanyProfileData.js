import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export function useCompanyProfileData() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    if (!user?.id) throw new Error("No authenticated user found.");

    const { data: company, error: companyError } = await supabase
      .from("companies")
      .select("*")
      .eq("profile_id", user.id)
      .single();

    if (companyError) throw companyError;

    // Get opportunities count
    const { data: opps, error: oppsError } = await supabase
      .from("opportunities")
      .select("id, status")
      .eq("company_id", company.id);

    if (oppsError) throw oppsError;
    
    const activeOpportunities = opps?.filter(o => (o.status || "Open").toLowerCase() === "open").length || 0;
    const oppIds = opps?.map(o => o.id) || [];

    // Get applicants count
    let totalApplicants = 0;
    let hiredThisSeason = 0;

    if (oppIds.length > 0) {
      const { data: apps, error: appsError } = await supabase
        .from("applications")
        .select("status")
        .in("opportunity_id", oppIds);

      if (appsError) throw appsError;
      
      totalApplicants = apps?.length || 0;
      hiredThisSeason = apps?.filter(a => a.status === "offered").length || 0;
    }

    return {
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
      // Pass original company fields so the edit form can pre-fill
      raw: company
    };
  }, [user]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProfile();
      setProfile(data);
    } catch (err) {
      console.error("Fetch profile error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchProfile]);

  useEffect(() => {
    load();
  }, [load]);

  const updateProfile = useCallback(async (updates) => {
    if (!user?.id) return;
    try {
      const { data, error } = await supabase
        .from("companies")
        .update(updates)
        .eq("profile_id", user.id)
        .select();

      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error("Update failed. You may not have permission to modify this profile.");
      }
      await load();
    } catch (err) {
      console.error("Update profile error:", err);
      setError(err);
      throw err; // throw so the caller UI can show the error
    }
  }, [user, load]);

  return {
    profile,
    loading,
    error,
    refresh: load,
    updateProfile
  };
}
