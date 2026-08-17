import { useState } from "react";
import { RefreshCw } from "lucide-react";
import OpportunitiesList from "../../components/company/OpportunitiesList";
import PostOpportunityModal from "../../components/company/PostOpportunityModal";
import Button from "../../components/common/Button";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useCompanyOpportunitiesData } from "../../hooks/useCompanyOpportunitiesData";

export default function CompanyOpportunities() {
  const { opportunities, loading, error, postOpportunity, refresh } = useCompanyOpportunitiesData();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-main">Opportunities</h1>
            <p className="text-text-muted text-sm mt-1">Manage your job and internship postings.</p>
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
          <div className="lg:col-span-2">
            <OpportunitiesList
              opportunities={opportunities}
              onPostNew={() => setModalOpen(true)}
            />
          </div>
        )}

        <PostOpportunityModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={postOpportunity}
        />
      </div>
    </DashboardLayout>
  );
}
