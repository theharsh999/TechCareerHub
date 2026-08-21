// src/components/tpo/ApplicationsOverviewTable.jsx
//
// ASSUMPTION: Badge accepts `children` + `className`, and optionally a
// `variant` prop. Since the real Badge API wasn't confirmed, this file
// passes explicit color classes via className so the status colors render
// correctly whether or not `variant` is honored. If Badge overrides
// className with its own default colors, tell me and I'll switch to
// variant-only.

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { APPLICATION_STATUSES } from "../../constants/tpoMockData";

const PAGE_SIZE = 5;

const STATUS_STYLES = {
  [APPLICATION_STATUSES.APPLIED]: {
    variant: "default",
    className: "bg-slate-500/10 text-text-muted border border-slate-500/30",
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
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(applications.length / PAGE_SIZE));

  // Keep page in range if the applications list shrinks (e.g. after refresh/filter)
  const safePage = Math.min(page, totalPages);

  const paginatedApplications = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return applications.slice(start, start + PAGE_SIZE);
  }, [applications, safePage]);

  const rangeStart = applications.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(safePage * PAGE_SIZE, applications.length);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  return (
    <Card className="bg-bg-card border border-border-subtle rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle">
        <h3 className="text-sm font-semibold text-text-main">
          Recent Applications
        </h3>
        <span className="text-xs text-text-main0">
          {applications.length === 0
            ? "0 shown"
            : `${rangeStart}-${rangeEnd} of ${applications.length}`}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-text-main0 border-b border-border-subtle">
              <th className="px-5 py-3 font-medium">Student</th>
              <th className="px-5 py-3 font-medium">Company / Role</th>
              <th className="px-5 py-3 font-medium">Applied</th>
              <th className="px-5 py-3 font-medium">Deadline</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedApplications.map((app) => (
              <tr
                key={app.id}
                className="border-b border-border-subtle/50 last:border-0 hover:bg-bg-hover/30 transition-colors"
              >
                <td className="px-5 py-3">
                  <div className="text-text-main font-medium">
                    {app.studentName}
                  </div>
                  <div className="text-xs text-text-main0">{app.rollNo}</div>
                </td>
                <td className="px-5 py-3">
                  <div className="text-text-muted">{app.company}</div>
                  <div className="text-xs text-text-main0">{app.role}</div>
                </td>
                <td className="px-5 py-3 text-text-muted">
                  {formatDate(app.appliedDate)}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={
                      isDeadlineSoon(app.deadline)
                        ? "text-amber-400 font-medium"
                        : "text-text-muted"
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
                  className="px-5 py-8 text-center text-text-main0 text-sm"
                >
                  No applications yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {applications.length > PAGE_SIZE && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-border-subtle">
          <button
            onClick={() => goToPage(safePage - 1)}
            disabled={safePage === 1}
            className="flex items-center gap-1 text-xs text-text-muted hover:text-text-main disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={14} />
            Prev
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`w-7 h-7 rounded-md text-xs font-medium transition-colors ${
                  p === safePage
                    ? "bg-indigo-500/15 text-indigo-300"
                    : "text-text-muted hover:bg-bg-hover/50 hover:text-text-main"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(safePage + 1)}
            disabled={safePage === totalPages}
            className="flex items-center gap-1 text-xs text-text-muted hover:text-text-main disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </Card>
  );
}