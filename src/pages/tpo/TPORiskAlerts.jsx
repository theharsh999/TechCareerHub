import { useState, useMemo } from "react";
import { Search, RefreshCw, ShieldAlert, ChevronLeft, ChevronRight } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { useStudentRiskData } from "../../hooks/useStudentRiskData";
import RiskAlertCard from "../../constants/RiskAlerts/RiskAlertCard";

const PAGE_SIZE = 9;

export default function TPORiskAlerts() {
  const { data, loading, error, refresh } = useStudentRiskData();

  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");
  const [sortBy, setSortBy] = useState("riskScore"); // riskScore | name
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    let result = data.filter((s) => {
      const matchesSearch =
        !q ||
        s.name?.toLowerCase().includes(q) ||
        s.rollNo?.toLowerCase().includes(q);
      const matchesLevel = levelFilter === "All" || s.riskLevel === levelFilter.toLowerCase();
      return matchesSearch && matchesLevel;
    });

    result = [...result].sort((a, b) =>
      sortBy === "riskScore" ? b.riskScore - a.riskScore : a.name.localeCompare(b.name)
    );

    return result;
  }, [data, searchQuery, levelFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const counts = useMemo(
    () => ({
      high: data.filter((s) => s.riskLevel === "high").length,
      medium: data.filter((s) => s.riskLevel === "medium").length,
      low: data.filter((s) => s.riskLevel === "low").length,
    }),
    [data]
  );

  const resetToFirstPage = (fn) => (value) => {
    fn(value);
    setCurrentPage(1);
  };

  if (loading && data.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="animate-spin text-indigo-400" size={24} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-500/10 border border-red-500/20 p-2 rounded-lg">
              <ShieldAlert size={20} className="text-red-400" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-text-main">Placement Risk Alerts</h1>
              <p className="text-sm text-text-muted mt-0.5">
                {filtered.length} student{filtered.length !== 1 ? "s" : ""} matching filters
              </p>
            </div>
          </div>
          <Button
            variant="secondary"
            className="flex items-center gap-2 text-sm"
            onClick={refresh}
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>

        {/* Summary strip */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-bg-card border border-red-500/20 p-4 text-center">
            <p className="text-2xl font-bold text-red-400">{counts.high}</p>
            <p className="text-xs text-text-muted mt-1">High Risk</p>
          </Card>
          <Card className="bg-bg-card border border-amber-500/20 p-4 text-center">
            <p className="text-2xl font-bold text-amber-400">{counts.medium}</p>
            <p className="text-xs text-text-muted mt-1">Medium Risk</p>
          </Card>
          <Card className="bg-bg-card border border-emerald-500/20 p-4 text-center">
            <p className="text-2xl font-bold text-emerald-400">{counts.low}</p>
            <p className="text-xs text-text-muted mt-1">Low Risk</p>
          </Card>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            Error loading risk data.
          </div>
        )}

        {/* Filters */}
        <Card className="bg-bg-base border border-border-subtle p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-main0" size={16} />
              <input
                type="text"
                placeholder="Search by name or roll no..."
                value={searchQuery}
                onChange={(e) => resetToFirstPage(setSearchQuery)(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-bg-card border border-border-subtle rounded-lg text-sm text-text-main placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={levelFilter}
                onChange={(e) => resetToFirstPage(setLevelFilter)(e.target.value)}
                className="bg-bg-card border border-border-subtle rounded-lg text-sm text-text-main px-3 py-2 focus:outline-none focus:border-indigo-500"
              >
                <option value="All">All Risk Levels</option>
                <option value="High">High Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="Low">Low Risk</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-bg-card border border-border-subtle rounded-lg text-sm text-text-main px-3 py-2 focus:outline-none focus:border-indigo-500"
              >
                <option value="riskScore">Sort: Risk Score (high → low)</option>
                <option value="name">Sort: Name (A → Z)</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Grid */}
        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {paginated.map((s) => (
              <RiskAlertCard key={s.id} student={s} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-bg-card border border-border-subtle rounded-2xl">
            <ShieldAlert size={48} className="text-slate-700 mb-4" />
            <h3 className="text-lg font-medium text-text-muted">No students found</h3>
            <p className="text-text-main0 max-w-sm mt-2 text-sm">
              Try adjusting your search or filters.
            </p>
            <Button
              variant="secondary"
              className="mt-6"
              onClick={() => {
                setSearchQuery("");
                setLevelFilter("All");
                setCurrentPage(1);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {filtered.length > PAGE_SIZE && (
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-text-muted">
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of{" "}
              {filtered.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg border border-border-subtle text-text-muted disabled:opacity-40 disabled:cursor-not-allowed hover:bg-bg-hover"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm text-text-main px-2">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg border border-border-subtle text-text-muted disabled:opacity-40 disabled:cursor-not-allowed hover:bg-bg-hover"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}