// src/pages/student/StudentDashboard.jsx
//
// Same pattern as TPODashboard.jsx / CompanyDashboard.jsx — assumes
// routing wraps Student routes with <DashboardLayout>.

import { RefreshCw } from "lucide-react";
import OpportunityCard from "../../components/student/OpportunityCard";
import ApplicationsList from "../../components/student/ApplicationsList";
import Button from "../../components/common/Button";
import { useApplicationTracker } from "../../hooks/useApplicationTracker";

export default function StudentDashboard() {
  const {
    opportunities,
    applications,
    loading,
    applyToOpportunity,
    hasApplied,
    refresh,
  } = useApplicationTracker();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="animate-spin text-indigo-400" size={24} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Opportunities</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Apply to open roles and track your application status
          </p>
        </div>
        <Button
          variant="secondary"
          className="flex items-center gap-2 text-sm"
          onClick={refresh}
        >
          <RefreshCw size={14} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {opportunities.map((opp) => (
          <OpportunityCard
            key={opp.id}
            opportunity={opp}
            applied={hasApplied(opp.id)}
            onApply={applyToOpportunity}
          />
        ))}
      </div>

      <ApplicationsList applications={applications} />
    </div>
  );
}
