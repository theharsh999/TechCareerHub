// src/hooks/useTPODashboardData.js
//
// Central data hook for the TPO Dashboard + Notifications module.
// Currently backed by mock data (constants/tpoMockData.js) with a simulated
// network delay so loading states render correctly.
//
// TO WIRE UP SUPABASE LATER:
//   Replace the body of `fetchDashboardData` with real queries, e.g.
//     const { data: applications } = await supabase.from("applications").select("*")
//   and keep the returned shape identical:
//     { stats, applications, notifications }
// No component using this hook needs to change.

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  mockStats,
  mockApplications,
  mockNotifications,
} from "../constants/tpoMockData";

async function fetchDashboardData() {
  // Simulated latency — remove once real Supabase calls are wired in.
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    stats: mockStats,
    applications: mockApplications,
    notifications: mockNotifications,
  };
}

export function useTPODashboardData() {
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDashboardData();
      setStats(data.stats);
      setApplications(data.applications);
      setNotifications(data.notifications);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const markAsRead = useCallback((notificationId) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  return {
    stats,
    applications,
    notifications,
    loading,
    error,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refresh: load,
  };
}
