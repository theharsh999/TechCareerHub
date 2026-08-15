// src/components/tpo/NotificationBell.jsx
//
// Clickable bell icon for the TPO Dashboard header. Shows an unread-count
// badge and toggles a dropdown with the same notification data already
// powering NotificationsPanel — reuses markAsRead/markAllAsRead from
// useTPODashboardData so both stay in sync.

import { useState, useRef, useEffect } from "react";
import { Bell, Clock, CheckCircle2, X } from "lucide-react";

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

export default function NotificationBell({
  notifications = [],
  unreadCount = 0,
  onMarkAsRead,
  onMarkAllAsRead,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const recent = notifications.slice(0, 6);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
        aria-label="Notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-indigo-500 text-white text-[10px] font-semibold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-800 bg-[#111622] shadow-xl shadow-black/40 z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80">
            <span className="text-sm font-semibold text-white">Notifications</span>
            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllAsRead}
                  className="text-xs text-indigo-400 hover:text-indigo-300"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="text-slate-600 hover:text-slate-400"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto flex flex-col">
            {recent.map((n) => {
              const config = ICONS[n.type] ?? ICONS.general;
              const Icon = config.icon;
              return (
                <button
                  key={n.id}
                  onClick={() => !n.read && onMarkAsRead(n.id)}
                  className={`flex gap-3 px-4 py-3 text-left border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors ${
                    n.read ? "" : "bg-slate-800/20"
                  }`}
                >
                  <div className={`shrink-0 p-1.5 rounded-lg h-fit ${config.className}`}>
                    <Icon size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-200 truncate">
                      {n.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                      {n.message}
                    </p>
                    <span className="text-[10px] text-slate-600 mt-1 inline-block">
                      {timeAgo(n.time)}
                    </span>
                  </div>
                  {!n.read && (
                    <span className="shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-indigo-500" />
                  )}
                </button>
              );
            })}

            {recent.length === 0 && (
              <div className="py-8 text-center text-slate-500 text-sm">
                You're all caught up.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
