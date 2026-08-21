import { AlertTriangle, AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";

const LEVEL_CONFIG = {
  high: {
    icon: AlertTriangle,
    label: "High Risk",
    text: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  medium: {
    icon: AlertCircle,
    label: "Medium Risk",
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  low: {
    icon: CheckCircle2,
    label: "Low Risk",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
};

export default function RiskAlertCard({ student }) {
  const level = LEVEL_CONFIG[student.riskLevel] || LEVEL_CONFIG.low;
  const Icon = level.icon;

  return (
    <Card className={`bg-bg-card border ${level.border} p-4`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Icon size={16} className={level.text} />
            <h4 className="text-sm font-semibold text-text-main truncate">
              {student.name}
            </h4>
          </div>
          <p className="text-xs text-text-muted mt-0.5">{student.rollNo}</p>
        </div>

        <div className={`shrink-0 ${level.bg} ${level.text} px-2.5 py-1 rounded-full text-xs font-semibold`}>
          {student.riskScore}%
        </div>
      </div>

      {student.reasons?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {student.reasons.map((reason, idx) => (
            <Badge
              key={idx}
              variant="default"
              className="text-xs bg-bg-hover/50 border-border-subtle/50 text-text-muted px-2 py-0.5"
            >
              {reason}
            </Badge>
          ))}
        </div>
      )}

      {student.recommendedActions?.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border-subtle/50">
          <p className="text-xs font-medium text-text-muted mb-1.5">Recommended</p>
          <ul className="flex flex-col gap-1">
            {student.recommendedActions.map((action, idx) => (
              <li key={idx} className={`flex items-center gap-1.5 text-xs ${level.text}`}>
                <ChevronRight size={12} className="shrink-0" />
                {action}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}