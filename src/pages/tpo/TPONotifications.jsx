import { RefreshCw } from "lucide-react";
import NotificationsPanel from "../../components/tpo/NotificationsPanel";
import Button from "../../components/common/Button";
import { useTPODashboardData } from "../../hooks/useTPODashboardData";
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function TPONotifications() {
  const {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refresh,
  } = useTPODashboardData();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="animate-spin text-indigo-400" size={24} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-text-main">Notifications</h1>
            <p className="text-sm text-text-muted mt-0.5">
              Manage your TPO alerts and updates
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

        <NotificationsPanel
          notifications={notifications}
          unreadCount={unreadCount}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
        />
      </div>
    </DashboardLayout>
  );
}
