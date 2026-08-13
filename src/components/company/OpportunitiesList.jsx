// src/components/company/OpportunitiesList.jsx

import { Plus, Users, Clock } from "lucide-react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import Button from "../common/Button";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

export default function OpportunitiesList({ opportunities = [], onPostNew }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80">
        <h3 className="text-sm font-semibold text-white">Opportunities</h3>
        <Button
          variant="primary"
          className="text-xs px-3 py-1.5"
          onClick={onPostNew}
        >
          <Plus size={14} />
          Post Opportunity
        </Button>
      </div>

      <div className="flex flex-col divide-y divide-slate-800/60">
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className="px-5 py-4 flex items-center justify-between gap-4 hover:bg-slate-800/20 transition-colors"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-slate-200 font-medium text-sm">
                  {opp.title}
                </span>
                <Badge
                  className={`px-2 py-0.5 border ${
                    opp.status === "Open"
                      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                      : "bg-slate-500/10 text-slate-400 border-slate-500/30"
                  }`}
                >
                  {opp.status}
                </Badge>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {opp.type} · {opp.location} · {opp.stipend}
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Users size={13} /> {opp.applicants}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={13} /> {formatDate(opp.deadline)}
              </span>
            </div>
          </div>
        ))}

        {opportunities.length === 0 && (
          <div className="px-5 py-8 text-center text-slate-500 text-sm">
            No opportunities posted yet.
          </div>
        )}
      </div>
    </Card>
  );
}
