import { RefreshCw } from "lucide-react";
import ApplicantsTable from "../../components/company/ApplicantsTable";
import Button from "../../components/common/Button";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useCompanyApplicantsData } from "../../hooks/useCompanyApplicantsData";

export default function CompanyApplicants() {
  const { applicants, loading, error, updateApplicantStatus, refresh } = useCompanyApplicantsData();

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-main">Applicants</h1>
            <p className="text-text-muted text-sm mt-1">Review and update student application statuses.</p>
          </div>
          <Button variant="secondary" className="gap-2" onClick={refresh} disabled={loading}>
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error.message || String(error)}
          </div>
        )}

        {loading ? (
          <div className="h-40 flex items-center justify-center text-text-main0">
            <RefreshCw size={24} className="animate-spin" />
          </div>
        ) : (
          <ApplicantsTable
            applicants={applicants}
            onStatusChange={updateApplicantStatus}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
