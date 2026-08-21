import { useState } from "react";
import { RefreshCw, ShieldAlert } from "lucide-react";
import { useStudentRiskData } from "../../hooks/useStudentRiskData";
import RiskAlertCard from "./RiskAlertCard";
import Card from "../../components/common/Card";
import { Link } from "react-router-dom";
// ... existing imports


export default function RiskAlertsList({ minLevel = "medium" }) {
  const { data, loading, error, refresh } = useStudentRiskData();
  const [expanded, setExpanded] = useState(false);

  const filtered =
    minLevel === "medium"
      ? data.filter((s) => s.riskLevel === "high" || s.riskLevel === "medium")
      : data;

  const highCount = filtered.filter((s) => s.riskLevel === "high").length;
  const visible = expanded ? filtered : filtered.slice(0, 4);

  return (
    <Card className="bg-bg-card border border-border-subtle p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShieldAlert size={18} className="text-red-400" />
          <div>
            <h3 className="text-sm font-semibold text-text-main">Placement Risk Alerts</h3>
            <p className="text-xs text-text-muted mt-0.5">
              {highCount > 0
                ? `${highCount} student${highCount > 1 ? "s" : ""} at high risk`
                : "No students at high risk"}
            </p>
          </div>
        </div>
        // header ke andar, refresh button ke pehle:
      <Link
           to="/tpo/risk-alerts"
           className="text-xs font-medium text-indigo-400 hover:text-indigo-300"
          >
          View all
        </Link>
        <button
          onClick={refresh}
          className="text-text-muted hover:text-text-main transition-colors"
          aria-label="Refresh risk alerts"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {loading && data.length === 0 && (
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="animate-spin text-indigo-400" size={20} />
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs">
          Error loading risk data.
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="py-8 text-center text-sm text-text-muted">
          No students currently at risk 🎉
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="flex flex-col gap-3">
          {visible.map((s) => (
            <RiskAlertCard key={s.id} student={s} />
          ))}

          {filtered.length > 4 && (
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 mt-1 text-center"
            >
              {expanded ? "Show less" : `Show ${filtered.length - 4} more`}
            </button>
          )}
        </div>
      )}
    </Card>
  );
}