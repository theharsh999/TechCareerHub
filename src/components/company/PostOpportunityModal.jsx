// src/components/company/PostOpportunityModal.jsx
import { useState, useMemo } from "react";
import { X, Plus, XCircle, Calendar, Users, Award } from "lucide-react";
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
    minimum_cgpa: "",
    eligible_branches: [],
    eligible_years: [],
    required_skills: [],
    scheduleDrive: true,
    pptDate: "",
    oaDate: "",
  });

  const [branchInput, setBranchInput] = useState("");
  const [yearInput, setYearInput] = useState("");
  const [skillInput, setSkillInput] = useState("");

  // Calculate live talent match based on TPO-verified data
  const talentMatch = useMemo(() => {
    return calculateTalentMatch(mockStudentProfiles, {
      minCgpa: parseFloat(form.minimum_cgpa) || 0,
      allowBacklogs: false,
      requiredSkills: form.required_skills,
    });
  }, [form.minimum_cgpa, form.required_skills]);

  if (!open) return null;

  const update = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = (field, input, setInput) => {
    if (!input.trim()) return;
    setForm((prev) => ({
      ...prev,
      [field]: [...new Set([...prev[field], input.trim()])]
    }));
    setInput("");
  };

  const removeTag = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((item) => item !== value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.deadline) return;
    
    onSubmit({
      ...form,
      minimum_cgpa: form.minimum_cgpa ? parseFloat(form.minimum_cgpa) : null,
      eligibleStudentsCount: talentMatch.eligibleCount,
      avgMatchScore: talentMatch.averageMatchScore,
    });
    
    setForm({ 
      title: "", type: "Internship", location: "", stipend: "", deadline: "",
      minimum_cgpa: "", eligible_branches: [], eligible_years: [], required_skills: [],
      scheduleDrive: true, pptDate: "", oaDate: ""
    });
    setBranchInput("");
    setYearInput("");
    setSkillInput("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-border-subtle bg-bg-card p-6">
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* BASIC INFORMATION */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-text-main border-b border-border-subtle pb-1">Basic Information</h4>
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

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-text-muted">Stipend / CTC</label>
                <input
                  value={form.stipend}
                  onChange={update("stipend")}
                  placeholder="₹25,000/mo or 6 LPA"
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
            </div>

            {/* Campus Drive Slot Booking Sub-section */}
            <div className="p-3 border border-border-subtle rounded-xl bg-bg-card/40 flex flex-col gap-3 mt-2">
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
          </div>

          {/* ELIGIBILITY & REQUIREMENTS */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-text-main border-b border-border-subtle pb-1">Eligibility & Requirements</h4>
            
            <div className="flex flex-col gap-1">
              <label className="text-xs text-text-muted">Minimum CGPA</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={form.minimum_cgpa}
                onChange={update("minimum_cgpa")}
                placeholder="e.g. 7.5"
                className="bg-bg-card/60 border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary"
              />
            </div>

            {/* Eligible Branches */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-text-muted">Eligible Branches</label>
              <div className="flex gap-2">
                <input
                  value={branchInput}
                  onChange={(e) => setBranchInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag('eligible_branches', branchInput, setBranchInput); } }}
                  placeholder="e.g. CSE, IT"
                  className="flex-1 bg-bg-card/60 border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary"
                />
                <button type="button" onClick={() => addTag('eligible_branches', branchInput, setBranchInput)} className="bg-primary/20 text-primary p-2 rounded-lg hover:bg-primary/30">
                  <Plus size={18} />
                </button>
              </div>
              {form.eligible_branches.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {form.eligible_branches.map(branch => (
                    <span key={branch} className="flex items-center gap-1 bg-bg-card border border-border-subtle text-xs px-2 py-1 rounded-md">
                      {branch} <button type="button" onClick={() => removeTag('eligible_branches', branch)} className="text-text-muted hover:text-red-400"><XCircle size={12} /></button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Eligible Academic Years */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-text-muted">Eligible Academic Years</label>
              <div className="flex gap-2">
                <select
                  value={yearInput}
                  onChange={(e) => setYearInput(e.target.value)}
                  className="flex-1 bg-bg-card/60 border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary"
                >
                  <option value="">Select Year...</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
                <button type="button" onClick={() => addTag('eligible_years', yearInput, setYearInput)} className="bg-primary/20 text-primary p-2 rounded-lg hover:bg-primary/30">
                  <Plus size={18} />
                </button>
              </div>
              {form.eligible_years.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {form.eligible_years.map(year => (
                    <span key={year} className="flex items-center gap-1 bg-bg-card border border-border-subtle text-xs px-2 py-1 rounded-md">
                      {year} <button type="button" onClick={() => removeTag('eligible_years', year)} className="text-text-muted hover:text-red-400"><XCircle size={12} /></button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Required Skills */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-text-muted">Required Skills</label>
              <div className="flex gap-2">
                <input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag('required_skills', skillInput, setSkillInput); } }}
                  placeholder="e.g. React, Node.js"
                  className="flex-1 bg-bg-card/60 border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary"
                />
                <button type="button" onClick={() => addTag('required_skills', skillInput, setSkillInput)} className="bg-primary/20 text-primary p-2 rounded-lg hover:bg-primary/30">
                  <Plus size={18} />
                </button>
              </div>
              {form.required_skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {form.required_skills.map(skill => (
                    <span key={skill} className="flex items-center gap-1 bg-bg-card border border-border-subtle text-xs px-2 py-1 rounded-md">
                      {skill} <button type="button" onClick={() => removeTag('required_skills', skill)} className="text-text-muted hover:text-red-400"><XCircle size={12} /></button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-border-subtle">
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