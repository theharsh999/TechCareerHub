// src/pages/tpo/TPODashboard.jsx
//
// This page intentionally does NOT import DashboardLayout directly — it
// assumes your routing wraps TPO routes with <DashboardLayout><Outlet/></DashboardLayout>
// (a common pattern). If instead each page must wrap itself, just do:
//
//   import DashboardLayout from "../../components/layout/DashboardLayout";
//   export default function TPODashboard() {
//     return <DashboardLayout>{/* content below */}</DashboardLayout>;
//   }

import { RefreshCw } from "lucide-react";
import StatsOverview from "../../components/tpo/StatsOverview";
import ApplicationsOverviewTable from "../../components/tpo/ApplicationsOverviewTable";
import NotificationsPanel from "../../components/tpo/NotificationsPanel";
import Button from "../../components/common/Button";
import { useTPODashboardData } from "../../hooks/useTPODashboardData";

export default function TPODashboard() {
  const {
    stats,
    applications,
    notifications,
    loading,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refresh,
  } = useTPODashboardData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="animate-spin text-indigo-400" size={24} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">TPO Dashboard</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Overview of student applications and placement activity
          </p>
        </div>
        <Button
          variant="secondary"
          className="flex items-center gap-2 text-sm"
          onClick={refresh}
        >
          <RefreshCw size={14} />
          Refresh
        </Button>
      </div>

      <StatsOverview stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ApplicationsOverviewTable applications={applications} />
        </div>
        <div>
          <NotificationsPanel
            notifications={notifications}
            unreadCount={unreadCount}
            onMarkAsRead={markAsRead}
            onMarkAllAsRead={markAllAsRead}
          />
        </div>
      </div>
    </div>
  );
}
