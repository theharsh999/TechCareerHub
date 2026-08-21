import { RefreshCw } from "lucide-react";
import StatsOverview from "../../components/tpo/StatsOverview";
import ApplicationsOverviewTable from "../../components/tpo/ApplicationsOverviewTable";
import DriveRequestsTable from "../../components/tpo/DriveRequestsTable";
import NotificationsPanel from "../../components/tpo/NotificationsPanel";
import Button from "../../components/common/Button";
import { useTPODashboardData } from "../../hooks/useTPODashboardData";
import DashboardLayout from "../../components/layout/DashboardLayout";

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
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-text-main">TPO Dashboard</h1>
            <p className="text-sm text-text-muted mt-0.5">
              Overview of student applications, campus drive approvals, and placement activity
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

        {/* Smart Drive Request Approvals (Company <-> TPO Sync) */}
        <DriveRequestsTable />

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
    </DashboardLayout>
  );
}