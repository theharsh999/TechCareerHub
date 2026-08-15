// src/components/student/OpportunityCard.jsx

import { MapPin, Wallet, Clock, CheckCircle2 } from "lucide-react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import Button from "../common/Button";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

export default function OpportunityCard({ opportunity, applied, onApply }) {
  return (
    <Card className="p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-white truncate">
            {opportunity.title}
          </h3>
          <p className="text-xs text-slate-400">{opportunity.company}</p>
        </div>
        <Badge className="px-2 py-0.5 border bg-indigo-500/10 text-indigo-300 border-indigo-500/30 shrink-0">
          {opportunity.type}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <MapPin size={12} /> {opportunity.location}
        </span>
        <span className="flex items-center gap-1">
          <Wallet size={12} /> {opportunity.stipend}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={12} /> Deadline {formatDate(opportunity.deadline)}
        </span>
      </div>

      <p className="text-xs text-slate-500 border-t border-slate-800/70 pt-2">
        Eligibility: {opportunity.eligibility}
      </p>

      <Button
        variant={applied ? "secondary" : "primary"}
        className="w-full text-sm mt-1"
        disabled={applied}
        onClick={() => onApply(opportunity)}
      >
        {applied ? (
          <>
            <CheckCircle2 size={14} />
            Applied
          </>
        ) : (
          "Apply"
        )}
      </Button>
    </Card>
  );
}
