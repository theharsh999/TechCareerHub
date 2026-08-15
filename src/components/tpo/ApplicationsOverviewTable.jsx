// src/components/tpo/ApplicationsOverviewTable.jsx
//
// ASSUMPTION: Badge accepts `children` + `className`, and optionally a
// `variant` prop. Since the real Badge API wasn't confirmed, this file
// passes explicit color classes via className so the status colors render
// correctly whether or not `variant` is honored. If Badge overrides
// className with its own default colors, tell me and I'll switch to
// variant-only.

import Card from "../common/Card";
import Badge from "../common/Badge";
import { APPLICATION_STATUSES } from "../../constants/tpoMockData";

const STATUS_STYLES = {
  [APPLICATION_STATUSES.APPLIED]: {
    variant: "default",
    className: "bg-slate-500/10 text-slate-300 border border-slate-500/30",
  },
  [APPLICATION_STATUSES.SHORTLISTED]: {
    variant: "info",
    className: "bg-indigo-500/10 text-indigo-300 border border-indigo-500/30",
  },
  [APPLICATION_STATUSES.INTERVIEW]: {
    variant: "warning",
    className: "bg-amber-500/10 text-amber-300 border border-amber-500/30",
  },
  [APPLICATION_STATUSES.OFFERED]: {
    variant: "success",
    className:
      "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30",
  },
  [APPLICATION_STATUSES.SELECTED]: {
    variant: "success",
    className:
      "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40",
  },
  [APPLICATION_STATUSES.REJECTED]: {
    variant: "danger",
    className: "bg-rose-500/10 text-rose-300 border border-rose-500/30",
  },
};

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES[APPLICATION_STATUSES.APPLIED];
  return (
    <Badge variant={style.variant} className={`${style.className} text-xs font-medium px-2.5 py-1 rounded-full`}>
      {status}
    </Badge>
  );
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

function isDeadlineSoon(deadline) {
  const days = Math.ceil(
    (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24)
  );
  return days <= 2 && days >= 0;
}

export default function ApplicationsOverviewTable({ applications = [] }) {
  return (
    <Card className="bg-[#11162277] border border-slate-800/80 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80">
        <h3 className="text-sm font-semibold text-white">
          Recent Applications
        </h3>
        <span className="text-xs text-slate-500">
          {applications.length} shown
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-500 border-b border-slate-800/80">
              <th className="px-5 py-3 font-medium">Student</th>
              <th className="px-5 py-3 font-medium">Company / Role</th>
              <th className="px-5 py-3 font-medium">Applied</th>
              <th className="px-5 py-3 font-medium">Deadline</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr
                key={app.id}
                className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors"
              >
                <td className="px-5 py-3">
                  <div className="text-slate-200 font-medium">
                    {app.studentName}
                  </div>
                  <div className="text-xs text-slate-500">{app.rollNo}</div>
                </td>
                <td className="px-5 py-3">
                  <div className="text-slate-300">{app.company}</div>
                  <div className="text-xs text-slate-500">{app.role}</div>
                </td>
                <td className="px-5 py-3 text-slate-400">
                  {formatDate(app.appliedDate)}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={
                      isDeadlineSoon(app.deadline)
                        ? "text-amber-400 font-medium"
                        : "text-slate-400"
                    }
                  >
                    {formatDate(app.deadline)}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <StatusBadge status={app.status} />
                </td>
              </tr>
            ))}

            {applications.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-8 text-center text-slate-500 text-sm"
                >
                  No applications yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
