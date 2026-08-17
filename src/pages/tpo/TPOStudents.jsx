import { Search, Filter, ExternalLink, RefreshCw, Mail, MapPin, GraduationCap, Users } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import { useTPOStudentsData } from "../../hooks/useTPOStudentsData";

export default function TPOStudents() {
  const {
    students,
    loading,
    error,
    refresh,
    searchQuery, setSearchQuery,
    branchFilter, setBranchFilter,
    yearFilter, setYearFilter,
    minCgpa, setMinCgpa,
    branchOptions,
    yearOptions,
  } = useTPOStudentsData();

  if (loading && students.length === 0) {
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
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-text-main">Student Directory</h1>
            <p className="text-sm text-text-muted mt-0.5">
              Browse and filter all registered students ({students.length} found)
            </p>
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

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Filters Section */}
        <Card className="bg-bg-base border border-border-subtle p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-main0" size={16} />
              <input
                type="text"
                placeholder="Search by name, roll no, email, or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-bg-card border border-border-subtle rounded-lg text-sm text-text-main placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="text-text-main0 shrink-0" size={16} />
                <select
                  value={branchFilter}
                  onChange={(e) => setBranchFilter(e.target.value)}
                  className="bg-bg-card border border-border-subtle rounded-lg text-sm text-text-main px-3 py-2 focus:outline-none focus:border-indigo-500"
                >
                  {branchOptions.map(opt => (
                    <option key={opt} value={opt}>{opt === "All" ? "All Branches" : opt}</option>
                  ))}
                </select>
              </div>

              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="bg-bg-card border border-border-subtle rounded-lg text-sm text-text-main px-3 py-2 focus:outline-none focus:border-indigo-500"
              >
                {yearOptions.map(opt => (
                  <option key={opt} value={opt}>{opt === "All" ? "All Years" : opt}</option>
                ))}
              </select>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="number"
                  placeholder="Min CGPA"
                  step="0.1"
                  min="0"
                  max="10"
                  value={minCgpa}
                  onChange={(e) => setMinCgpa(e.target.value)}
                  className="w-full sm:w-28 bg-bg-card border border-border-subtle rounded-lg text-sm text-text-main px-3 py-2 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Students Grid */}
        {students.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {students.map((student) => (
              <Card key={student.id} className="bg-bg-card border border-border-subtle p-5 flex flex-col hover:border-border-subtle transition-colors">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-text-main line-clamp-1">{student.fullName}</h3>
                    <div className="text-sm text-text-muted font-medium mt-0.5">{student.rollNo}</div>
                  </div>
                  {student.cgpa && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs font-semibold shrink-0">
                      {student.cgpa} CGPA
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <Mail size={14} className="text-text-main0 shrink-0" />
                    <span className="truncate">{student.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <GraduationCap size={14} className="text-text-main0 shrink-0" />
                    <span className="truncate">{student.branch} • {student.academicYear}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <MapPin size={14} className="text-text-main0 shrink-0" />
                    <span className="truncate">{student.location}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mt-auto pt-4 border-t border-border-subtle/50">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {student.skills.slice(0, 4).map((skill, i) => (
                      <Badge key={i} variant="default" className="text-xs bg-bg-hover/50 border-border-subtle/50 text-text-muted px-2 py-0.5">
                        {skill}
                      </Badge>
                    ))}
                    {student.skills.length > 4 && (
                      <Badge variant="default" className="text-xs bg-bg-hover/50 border-border-subtle/50 text-text-muted px-2 py-0.5">
                        +{student.skills.length - 4}
                      </Badge>
                    )}
                    {student.skills.length === 0 && (
                      <span className="text-xs text-text-main0 italic">No skills listed</span>
                    )}
                  </div>
                  
                  {/* Actions */}
                  {student.resumeUrl ? (
                    <a
                      href={student.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-sm font-medium rounded-lg transition-colors border border-indigo-500/20"
                    >
                      <ExternalLink size={14} />
                      View Resume
                    </a>
                  ) : (
                    <div className="flex items-center justify-center gap-2 w-full py-2 bg-bg-hover/30 text-text-main0 text-sm font-medium rounded-lg border border-border-subtle/50 cursor-not-allowed">
                      No Resume Uploaded
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-bg-card border border-border-subtle rounded-2xl">
            <Users size={48} className="text-slate-700 mb-4" />
            <h3 className="text-lg font-medium text-text-muted">No students found</h3>
            <p className="text-text-main0 max-w-sm mt-2 text-sm">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button
              variant="secondary"
              className="mt-6"
              onClick={() => {
                setSearchQuery("");
                setBranchFilter("All");
                setYearFilter("All");
                setMinCgpa("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
