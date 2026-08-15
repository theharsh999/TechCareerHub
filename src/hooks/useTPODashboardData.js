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
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

const DISPLAY_STATUS_MAP = {
  applied: "Applied",
  shortlisted: "Shortlisted",
  interview_scheduled: "Interview Scheduled",
  offered: "Offered",
  rejected: "Rejected",
};

export function useTPODashboardData() {
  const { user } = useAuth();

  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    if (!user?.id) {
      throw new Error("No authenticated user found.");
    }

    // 1. Fetch Stats
    const { count: totalStudents } = await supabase
      .from("students")
      .select("*", { count: "exact", head: true });

    const { count: activeDrives } = await supabase
      .from("opportunities")
      .select("*", { count: "exact", head: true })
      .eq("status", "Open");

    const { count: activeApplications } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true })
      .in("status", ["applied", "shortlisted"]);

    // Note: Since 'offered' isn't natively supported in DB yet, 'shortlisted' is used as the proxy for placement tracking.
    const { count: studentsPlaced } = await supabase
      .from("applications")
      .select("student_id", { count: "exact", head: true })
      .eq("status", "offered");

    // 2. Fetch Recent Applications
    const { data: recentApps, error: recentAppsError } = await supabase
      .from("applications")
      .select("*")
      .order("applied_at", { ascending: false })
      .limit(20);

    if (recentAppsError) throw recentAppsError;

    const appData = recentApps || [];
    const studentIds = [...new Set(appData.map((a) => a.student_id))];
    const oppIds = [...new Set(appData.map((a) => a.opportunity_id))];

    // 3. Resolve relations manually to avoid guessing FK names
    let students = [];
    let profiles = [];
    if (studentIds.length > 0) {
      const [{ data: sData }, { data: pData }] = await Promise.all([
        supabase.from("students").select("id, roll_no").in("id", studentIds),
        supabase.from("profiles").select("id, full_name").in("id", studentIds)
      ]);
      students = sData || [];
      profiles = pData || [];
    }

    let opportunities = [];
    let companies = [];
    if (oppIds.length > 0) {
      const { data: oData } = await supabase
        .from("opportunities")
        .select("id, title, company_id, application_deadline")
        .in("id", oppIds);
      
      opportunities = oData || [];
      const companyIds = [...new Set(opportunities.map((o) => o.company_id))];
      
      if (companyIds.length > 0) {
        const { data: cData } = await supabase
          .from("companies")
          .select("id, company_name")
          .in("id", companyIds);
        companies = cData || [];
      }
    }

    const studentMap = new Map(students.map((s) => [s.id, s]));
    const profileMap = new Map(profiles.map((p) => [p.id, p]));
    const oppMap = new Map(opportunities.map((o) => [o.id, o]));
    const companyMap = new Map(companies.map((c) => [c.id, c]));

    const formattedApps = appData.map((app) => {
      const student = studentMap.get(app.student_id);
      const profile = profileMap.get(app.student_id);
      const opp = oppMap.get(app.opportunity_id);
      const company = opp ? companyMap.get(opp.company_id) : null;

      return {
        id: app.id,
        studentName: profile?.full_name || (student?.roll_no ? `Student (Roll No: ${student.roll_no})` : "Unknown Student"),
        rollNo: student?.roll_no || "N/A",
        company: company?.company_name || "Unknown Company",
        role: opp?.title || "Unknown Role",
        appliedDate: app.applied_at,
        deadline: opp?.application_deadline,
        status: DISPLAY_STATUS_MAP[app.status] || app.status,
      };
    });

    // 4. Fetch Notifications
    let fetchedNotifications = [];
    const { data: notifs, error: notifsError } = await supabase
      .from("notifications")
      .select("*")
      .eq("recipient_id", user.id)
      .order("created_at", { ascending: false });

    if (!notifsError && notifs) {
      fetchedNotifications = notifs.map(n => ({
        id: n.id,
        type: n.type || "general",
        title: n.title,
        message: n.message,
        time: n.created_at,
        read: n.read || false,
        priority: n.priority || "normal"
      }));
    } else {
      console.warn("Notifications table might not exist or RLS is blocking:", notifsError);
    }

    const placementRate = totalStudents > 0 ? Math.round((studentsPlaced / totalStudents) * 100) : 0;

    return {
      stats: {
        totalStudents: totalStudents || 0,
        activeApplications: activeApplications || 0,
        studentsPlaced: studentsPlaced || 0,
        activeDrives: activeDrives || 0,
        placementRate,
        avgPackage: "N/A" // Stipends are text like '6 LPA', SQL average calculations cannot process this format natively.
      },
      applications: formattedApps,
      notifications: fetchedNotifications
    };
  }, [user]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDashboardData();
      setStats(data.stats);
      setApplications(data.applications);
      setNotifications(data.notifications);
    } catch (err) {
      console.error("TPO dashboard data error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchDashboardData]);

  useEffect(() => {
    load();
  }, [load]);

  const markAsRead = useCallback(async (notificationId) => {
    try {
      await supabase.from("notifications").update({ read: true }).eq("id", notificationId);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark notification read:", err);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    if (!user?.id) return;
    try {
      await supabase
        .from("notifications")
        .update({ read: true })
        .eq("recipient_id", user.id)
        .eq("read", false);
      
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error("Failed to mark all notifications read:", err);
    }
  }, [user]);

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
