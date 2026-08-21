import { ShieldCheck, Award } from "lucide-react";
import Card from "../common/Card";
import { APPLICANT_STATUSES } from "../../constants/companyMockData";

const STATUS_STYLES = {
  [APPLICANT_STATUSES.APPLIED]: "bg-slate-500/10 text-text-muted border-slate-500/30",
  [APPLICANT_STATUSES.SHORTLISTED]: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
  [APPLICANT_STATUSES.INTERVIEW]: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  [APPLICANT_STATUSES.OFFERED]: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  [APPLICANT_STATUSES.REJECTED]: "bg-rose-500/10 text-rose-300 border-rose-500/30",
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

export default function ApplicantsTable({ applicants = [], onStatusChange }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle">
        <h3 className="text-sm font-semibold text-text-main">Applicants</h3>
        <span className="text-xs text-text-main0">{applicants.length} total</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-text-main0 border-b border-border-subtle">
              <th className="px-5 py-3 font-medium">Student</th>
              <th className="px-5 py-3 font-medium">Opportunity</th>
              <th className="px-5 py-3 font-medium">Verification</th>
              <th className="px-5 py-3 font-medium">Match Score</th>
              <th className="px-5 py-3 font-medium">Applied</th>
              <th className="px-5 py-3 font-medium">Resume</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((a) => (
              <tr
                key={a.id}
                className="border-b border-border-subtle/50 last:border-0 hover:bg-bg-hover/30 transition-colors"
              >
                <td className="px-5 py-3">
                  <div className="text-text-main font-medium">{a.studentName}</div>
                  <div className="text-xs text-text-main0">{a.rollNo}</div>
                </td>
                <td className="px-5 py-3 text-text-muted">{a.opportunity}</td>
                <td className="px-5 py-3">
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    <ShieldCheck size={12} /> Verified
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1 font-semibold text-xs text-primary">
                    <Award size={13} className="text-emerald-400" />
                    {a.matchScore || "88"}%
                  </div>
                </td>
                <td className="px-5 py-3 text-text-muted">{formatDate(a.appliedDate)}</td>
                <td className="px-5 py-3">
                  <a
                    href={a.resumeUrl}
                    className="text-indigo-400 hover:text-indigo-300 text-xs underline underline-offset-2"
                  >
                    View
                  </a>
                </td>
                <td className="px-5 py-3">
                  <select
                    value={a.status}
                    onChange={(e) => onStatusChange(a.id, e.target.value)}
                    className={`text-xs font-medium px-2.5 py-1.5 rounded-full border bg-transparent focus:outline-none ${STATUS_STYLES[a.status] ?? STATUS_STYLES[APPLICANT_STATUSES.APPLIED]}`}
                  >
                    {Object.values(APPLICANT_STATUSES).map((s) => (
                      <option key={s} value={s} className="bg-bg-card text-text-main">
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}

            {applicants.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-text-main0 text-sm">
                  No applicants yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}