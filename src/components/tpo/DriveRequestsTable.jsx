import { useState } from "react";
import { Calendar, Check, Clock, RefreshCw, Users, ShieldCheck } from "lucide-react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import Button from "../common/Button";
import { DRIVE_STATUSES, mockCampusDrives } from "../../constants/companyMockData";

export default function DriveRequestsTable() {
  const [drives, setDrives] = useState(mockCampusDrives);

  const handleStatusChange = (id, newStatus) => {
    setDrives((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
    );
  };

  return (
    <Card className="bg-bg-card border border-border-subtle rounded-2xl overflow-hidden mb-6">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-primary" />
          <h3 className="text-sm font-semibold text-text-main">
            Incoming Campus Drive Requests
          </h3>
        </div>
        <span className="text-xs text-text-main0">
          {drives.length} Pending Actions
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-text-main0 border-b border-border-subtle">
              <th className="px-5 py-3 font-medium">Drive Title</th>
              <th className="px-5 py-3 font-medium">Eligibility & Match</th>
              <th className="px-5 py-3 font-medium">Requested Slots (PPT / OA)</th>
              <th className="px-5 py-3 font-medium">Drive Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drives.map((drive) => (
              <tr
                key={drive.id}
                className="border-b border-border-subtle/50 last:border-0 hover:bg-bg-hover/30 transition-colors"
              >
                <td className="px-5 py-3">
                  <div className="text-text-main font-medium">{drive.title}</div>
                  <div className="text-xs text-text-main0 flex items-center gap-1 mt-0.5">
                    <ShieldCheck size={12} className="text-emerald-400" /> TPO-Verified Criteria
                  </div>
                </td>

                <td className="px-5 py-3">
                  <div className="text-text-muted text-xs">
                    Min CGPA: <span className="text-text-main font-semibold">{drive.minCgpa}</span>
                  </div>
                  <div className="text-xs text-primary font-medium flex items-center gap-1 mt-0.5">
                    <Users size={12} /> {drive.eligibleCount} Eligible Candidates
                  </div>
                </td>

                <td className="px-5 py-3 text-xs text-text-muted">
                  <div>
                    <span className="font-semibold text-text-main">PPT:</span>{" "}
                    {new Date(drive.pptSlot).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </div>
                  <div>
                    <span className="font-semibold text-text-main">OA:</span>{" "}
                    {new Date(drive.oaSlot).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </div>
                </td>

                <td className="px-5 py-3">
                  <Badge
                    className={
                      drive.status === DRIVE_STATUSES.APPROVED
                        ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs px-2.5 py-1 rounded-full"
                        : "bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs px-2.5 py-1 rounded-full"
                    }
                  >
                    {drive.status}
                  </Badge>
                </td>

                <td className="px-5 py-3 text-right">
                  {drive.status !== DRIVE_STATUSES.APPROVED ? (
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleStatusChange(drive.id, DRIVE_STATUSES.APPROVED)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 text-xs font-medium flex items-center gap-1 transition-colors"
                      >
                        <Check size={12} /> Approve Slot
                      </button>
                      <button
                        onClick={() => handleStatusChange(drive.id, DRIVE_STATUSES.RESCHEDULED)}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 text-xs font-medium flex items-center gap-1 transition-colors"
                      >
                        <RefreshCw size={12} /> Reschedule
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-text-main0 flex items-center justify-end gap-1">
                      <Clock size={12} /> Calendar Synced
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}