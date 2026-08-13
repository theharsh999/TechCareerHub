// src/hooks/useCompanyDashboardData.js
//
// Central data hook for the Company Dashboard module.
// Currently backed by mock data (constants/companyMockData.js) with a
// simulated network delay so loading states render correctly.
//
// TO WIRE UP SUPABASE LATER:
//   - fetchCompanyData: replace with queries against `companies`,
//     `opportunities`, `applications` tables, keeping the returned shape
//     { profile, opportunities, applicants } identical.
//   - postOpportunity: replace with an insert into `opportunities`.
//   - updateApplicantStatus: replace with an update on `applications`.
// No component using this hook needs to change.

import { useState, useEffect, useCallback } from "react";
import {
  mockCompanyProfile,
  mockOpportunities,
  mockApplicants,
} from "../constants/companyMockData";

async function fetchCompanyData() {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    profile: mockCompanyProfile,
    opportunities: mockOpportunities,
    applicants: mockApplicants,
  };
}

export function useCompanyDashboardData() {
  const [profile, setProfile] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCompanyData();
      setProfile(data.profile);
      setOpportunities(data.opportunities);
      setApplicants(data.applicants);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const postOpportunity = useCallback((opportunity) => {
    setOpportunities((prev) => [
      {
        id: `OPP-${Math.floor(Math.random() * 9000) + 1000}`,
        applicants: 0,
        status: "Open",
        ...opportunity,
      },
      ...prev,
    ]);
  }, []);

  const updateApplicantStatus = useCallback((applicantId, status) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === applicantId ? { ...a, status } : a))
    );
  }, []);

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
