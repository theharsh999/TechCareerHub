import { useState } from "react";
import { RefreshCw, Edit2 } from "lucide-react";
import CompanyProfileCard from "../../components/company/CompanyProfileCard";
import EditCompanyProfileModal from "../../components/company/EditCompanyProfileModal";
import Button from "../../components/common/Button";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useCompanyProfileData } from "../../hooks/useCompanyProfileData";

export default function CompanyProfile() {
  const { profile, loading, error, updateProfile, refresh } = useCompanyProfileData();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-main">Company Profile</h1>
            <p className="text-text-muted text-sm mt-1">Manage your company's public information.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" className="gap-2" onClick={refresh} disabled={loading}>
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </Button>
            <Button variant="primary" className="gap-2" onClick={() => setModalOpen(true)} disabled={loading || !profile}>
              <Edit2 size={16} />
              Edit Profile
            </Button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error.message || String(error)}
          </div>
        )}

        {loading && !profile ? (
          <div className="h-40 flex items-center justify-center text-text-main0">
            <RefreshCw size={24} className="animate-spin" />
          </div>
        ) : profile ? (
          <div className="max-w-3xl">
            <CompanyProfileCard profile={profile} />
          </div>
        ) : (
          <div className="p-8 text-center text-text-muted bg-bg-card/40 rounded-xl border border-border-subtle">
            No profile data found. Please ensure your account is set up.
          </div>
        )}

        <EditCompanyProfileModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={updateProfile}
          initialData={profile?.raw}
        />
      </div>
    </DashboardLayout>
  );
}
