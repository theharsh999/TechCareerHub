// src/components/company/ApplicantsTable.jsx

import Card from "../common/Card";
import Badge from "../common/Badge";
import { APPLICANT_STATUSES } from "../../constants/companyMockData";

const STATUS_STYLES = {
  [APPLICANT_STATUSES.APPLIED]: "bg-slate-500/10 text-slate-300 border-slate-500/30",
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
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80">
        <h3 className="text-sm font-semibold text-white">Applicants</h3>
        <span className="text-xs text-slate-500">{applicants.length} total</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-500 border-b border-slate-800/80">
              <th className="px-5 py-3 font-medium">Student</th>
              <th className="px-5 py-3 font-medium">Opportunity</th>
              <th className="px-5 py-3 font-medium">Applied</th>
              <th className="px-5 py-3 font-medium">Resume</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((a) => (
              <tr
                key={a.id}
                className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors"
              >
                <td className="px-5 py-3">
                  <div className="text-slate-200 font-medium">{a.studentName}</div>
                  <div className="text-xs text-slate-500">{a.rollNo}</div>
                </td>
                <td className="px-5 py-3 text-slate-300">{a.opportunity}</td>
                <td className="px-5 py-3 text-slate-400">{formatDate(a.appliedDate)}</td>
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
                      <option key={s} value={s} className="bg-[#111622] text-slate-200">
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}

            {applicants.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-slate-500 text-sm">
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
