// src/pages/company/CompanyDashboard.jsx
//
// Same pattern as pages/tpo/TPODashboard.jsx — assumes routing wraps
// Company routes with <DashboardLayout><Outlet/></DashboardLayout>.

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import CompanyProfileCard from "../../components/company/CompanyProfileCard";
import OpportunitiesList from "../../components/company/OpportunitiesList";
import ApplicantsTable from "../../components/company/ApplicantsTable";
import PostOpportunityModal from "../../components/company/PostOpportunityModal";
import Button from "../../components/common/Button";
import { useCompanyDashboardData } from "../../hooks/useCompanyDashboardData";

export default function CompanyDashboard() {
  const {
    profile,
    opportunities,
    applicants,
    loading,
    postOpportunity,
    updateApplicantStatus,
    refresh,
  } = useCompanyDashboardData();

  const [modalOpen, setModalOpen] = useState(false);

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
          <h1 className="text-xl font-semibold text-white">Company Dashboard</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Manage your opportunities and review applicants
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CompanyProfileCard profile={profile} />
        </div>
        <div className="lg:col-span-2">
          <OpportunitiesList
            opportunities={opportunities}
            onPostNew={() => setModalOpen(true)}
          />
        </div>
      </div>

      <ApplicantsTable
        applicants={applicants}
        onStatusChange={updateApplicantStatus}
      />

      <PostOpportunityModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={postOpportunity}
      />
    </div>
  );
}
