// src/components/student/ApplicationsList.jsx

import Card from "../common/Card";
import Badge from "../common/Badge";
import ApplicationStatusTracker from "./ApplicationStatusTracker";
import { REJECTED } from "../../constants/applicationMockData";

const STATUS_BADGE = {
  Applied: "bg-slate-500/10 text-slate-300 border-slate-500/30",
  Shortlisted: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
  Interview: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  Selected: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  [REJECTED]: "bg-rose-500/10 text-rose-300 border-rose-500/30",
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

export default function ApplicationsList({ applications = [] }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80">
        <h3 className="text-sm font-semibold text-white">My Applications</h3>
        <span className="text-xs text-slate-500">{applications.length} total</span>
      </div>

      <div className="flex flex-col divide-y divide-slate-800/60">
        {applications.map((app) => (
          <div key={app.id} className="px-5 py-4 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="text-slate-200 font-medium text-sm">
                  {app.title}
                </span>
                <span className="text-slate-500 text-xs ml-2">
                  {app.company}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-slate-500">
                  Applied {formatDate(app.appliedDate)}
                </span>
                <Badge
                  className={`px-2 py-0.5 border ${STATUS_BADGE[app.status] ?? STATUS_BADGE.Applied}`}
                >
                  {app.status}
                </Badge>
              </div>
            </div>

            <ApplicationStatusTracker status={app.status} />
          </div>
        ))}

        {applications.length === 0 && (
          <div className="px-5 py-8 text-center text-slate-500 text-sm">
            You haven't applied to anything yet.
          </div>
        )}
      </div>
    </Card>
  );
}
