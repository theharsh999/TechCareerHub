// src/components/tpo/NotificationsPanel.jsx

import { Clock, CheckCircle2, XCircle, Bell, X } from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";

const ICONS = {
  deadline: { icon: Clock, className: "text-amber-400 bg-amber-500/10" },
  status: { icon: CheckCircle2, className: "text-emerald-400 bg-emerald-500/10" },
  general: { icon: Bell, className: "text-indigo-400 bg-indigo-500/10" },
};

function timeAgo(isoString) {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function NotificationItem({ notification, onDismiss }) {
  const config = ICONS[notification.type] ?? ICONS.general;
  const Icon = config.icon;
  const isRejection = notification.title.toLowerCase().includes("rejected");

  return (
    <div
      className={`flex gap-3 px-4 py-3 rounded-xl border transition-colors ${
        notification.read
          ? "border-border-subtle/60 bg-transparent"
          : "border-border-subtle bg-bg-hover/30"
      }`}
    >
      <div className={`shrink-0 p-2 rounded-lg h-fit ${isRejection ? "text-rose-400 bg-rose-500/10" : config.className}`}>
        <Icon size={16} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-text-main">
            {notification.title}
          </p>
          {!notification.read && (
            <span className="shrink-0 w-2 h-2 mt-1.5 rounded-full bg-indigo-500" />
          )}
        </div>
        <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
          {notification.message}
        </p>
        <span className="text-[11px] text-slate-600 mt-1 inline-block">
          {timeAgo(notification.time)}
        </span>
      </div>

      {onDismiss && (
        <button
          onClick={() => onDismiss(notification.id)}
          className="shrink-0 text-slate-600 hover:text-text-muted transition-colors h-fit"
          aria-label="Mark as read"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

export default function NotificationsPanel({
  notifications = [],
  unreadCount = 0,
  onMarkAsRead,
  onMarkAllAsRead,
}) {
  return (
    <Card className="bg-bg-card border border-border-subtle rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-text-main">Notifications</h3>
          {unreadCount > 0 && (
            <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded-full bg-indigo-500 text-white">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            className="text-xs text-indigo-400 hover:text-indigo-300 px-0"
            onClick={onMarkAllAsRead}
          >
            Mark all read
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-2 p-3 max-h-[420px] overflow-y-auto">
        {notifications.map((n) => (
          <NotificationItem
            key={n.id}
            notification={n}
            onDismiss={!n.read ? onMarkAsRead : undefined}
          />
        ))}

        {notifications.length === 0 && (
          <div className="py-8 text-center text-text-main0 text-sm">
            You're all caught up.
          </div>
        )}
      </div>
    </Card>
  );
}
