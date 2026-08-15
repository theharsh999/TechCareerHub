// src/hooks/useApplicationTracker.js
//
// Data hook for the student-facing Apply System + Application Tracker.
// Backed by mock data (constants/applicationMockData.js) with a simulated
// network delay so loading states render correctly.
//
// TO WIRE UP SUPABASE LATER:
//   - fetchData: replace with queries against `opportunities` and
//     `applications` (filtered by current student id), keeping the
//     returned shape { opportunities, applications } identical.
//   - applyToOpportunity: replace with an insert into `applications`
//     (status defaults to "Applied"). This is also the same table
//     ApplicantsTable.jsx (company side) reads/updates — status changes
//     made by a company will show up here once wired to real data.
// No component using this hook needs to change.

import { useState, useEffect, useCallback } from "react";
import {
  mockAvailableOpportunities,
  mockMyApplications,
} from "../constants/applicationMockData";

async function fetchData() {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    opportunities: mockAvailableOpportunities,
    applications: mockMyApplications,
  };
}

export function useApplicationTracker() {
  const [opportunities, setOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchData();
      setOpportunities(data.opportunities);
      setApplications(data.applications);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const applyToOpportunity = useCallback((opportunity) => {
    setApplications((prev) => {
      const alreadyApplied = prev.some(
        (a) => a.opportunityId === opportunity.id
      );
      if (alreadyApplied) return prev;
      return [
        {
          id: `APL-${Math.floor(Math.random() * 9000) + 1000}`,
          opportunityId: opportunity.id,
          title: opportunity.title,
          company: opportunity.company,
          appliedDate: new Date().toISOString().slice(0, 10),
          status: "Applied",
        },
        ...prev,
      ];
    });
  }, []);

  const hasApplied = useCallback(
    (opportunityId) =>
      applications.some((a) => a.opportunityId === opportunityId),
    [applications]
  );

  return {
    opportunities,
    applications,
    loading,
    error,
    applyToOpportunity,
    hasApplied,
    refresh: load,
  };
}
