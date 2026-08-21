import { useState, useMemo } from "react";
import { X, Calendar, Users, Award } from "lucide-react";
import Button from "../common/Button";
import { mockStudentProfiles } from "../../constants/tpoMockData";
import { calculateTalentMatch } from "../../lib/driveEngine";

const TYPES = ["Internship", "Full-time"];

export default function PostOpportunityModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    type: "Internship",
    location: "",
    stipend: "",
    deadline: "",
    minCgpa: "7.0",
    requiredSkills: "React, JavaScript, Node.js",
    scheduleDrive: true,
    pptDate: "",
    oaDate: "",
  });

  // Calculate live talent match based on TPO-verified data
  const talentMatch = useMemo(() => {
    const skillsArray = form.requiredSkills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    return calculateTalentMatch(mockStudentProfiles, {
      minCgpa: parseFloat(form.minCgpa) || 0,
      allowBacklogs: false,
      requiredSkills: skillsArray,
    });
  }, [form.minCgpa, form.requiredSkills]);

  if (!open) return null;

  const update = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.deadline) return;

    onSubmit({
      ...form,
      eligibleStudentsCount: talentMatch.eligibleCount,
      avgMatchScore: talentMatch.averageMatchScore,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg rounded-2xl border border-border-subtle bg-bg-card p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-text-main font-semibold text-base flex items-center gap-2">
            Post Opportunity & Request Campus Drive
          </h3>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-main"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Dynamic Talent Intelligence Badge */}
        <div className="mb-5 p-3 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="text-primary" size={18} />
            <div>
              <p className="text-xs font-semibold text-text-main">Verified Talent Match</p>
              <p className="text-[11px] text-text-muted">
                TPO Verified Pool: <span className="font-bold text-primary">{talentMatch.eligibleCount} Eligible Students</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-bg-card px-2 py-1 rounded-lg border border-border-subtle">
            <Award size={14} className="text-emerald-500" />
            <span className="text-xs font-bold text-text-main">{talentMatch.averageMatchScore}% Avg Match</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-text-muted">Role Title</label>
            <input
              value={form.title}
              onChange={update("title")}
              placeholder="e.g. Frontend Developer Intern"
              className="bg-bg-card border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-text-muted">Type</label>
              <select
                value={form.type}
                onChange={update("type")}
                className="bg-bg-card border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary"
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-text-muted">Location</label>
              <input
                value={form.location}
                onChange={update("location")}
                placeholder="Remote / City"
                className="bg-bg-card border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Eligibility Criteria Selection */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-text-muted">Min CGPA Required</label>
              <input
                type="number"
                step="0.1"
                value={form.minCgpa}
                onChange={update("minCgpa")}
                placeholder="7.0"
                className="bg-bg-card border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-text-muted">Stipend / CTC</label>
              <input
                value={form.stipend}
                onChange={update("stipend")}
                placeholder="₹25,000/mo or 6 LPA"
                className="bg-bg-card border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-text-muted">Required Skills (Comma separated)</label>
            <input
              value={form.requiredSkills}
              onChange={update("requiredSkills")}
              placeholder="e.g. React, Node.js, SQL"
              className="bg-bg-card border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-text-muted">Application Deadline</label>
            <input
              type="date"
              value={form.deadline}
              onChange={update("deadline")}
              className="bg-bg-card border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary"
              required
            />
          </div>

          {/* Campus Drive Slot Booking Sub-section */}
          <div className="p-3 border border-border-subtle rounded-xl bg-bg-card/40 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-text-main flex items-center gap-1.5">
                <Calendar size={14} className="text-primary" /> Request Campus Drive Slot
              </span>
              <input
                type="checkbox"
                checked={form.scheduleDrive}
                onChange={update("scheduleDrive")}
                className="accent-primary h-4 w-4 rounded cursor-pointer"
              />
            </div>

            {form.scheduleDrive && (
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-text-muted">PPT Preferred Date</label>
                  <input
                    type="date"
                    value={form.pptDate}
                    onChange={update("pptDate")}
                    className="bg-bg-card border border-border-subtle rounded-lg px-2.5 py-1.5 text-xs text-text-main"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-text-muted">OA / Assessment Date</label>
                  <input
                    type="date"
                    value={form.oaDate}
                    onChange={update("oaDate")}
                    className="bg-bg-card border border-border-subtle rounded-lg px-2.5 py-1.5 text-xs text-text-main"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 mt-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Submit & Request Drive Slot
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}