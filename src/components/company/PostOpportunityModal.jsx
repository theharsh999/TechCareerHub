// src/components/company/PostOpportunityModal.jsx
//
// ASSUMPTION: no existing Modal/Dialog common component was in the files
// I received, so this ships its own lightweight overlay. If the project
// already has components/common/Modal.jsx, swap this wrapper for that and
// keep the form body as-is.

import { useState } from "react";
import { X, Plus, XCircle } from "lucide-react";
import Button from "../common/Button";

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
  });

  const [branchInput, setBranchInput] = useState("");
  const [yearInput, setYearInput] = useState("");
  const [skillInput, setSkillInput] = useState("");

  if (!open) return null;

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

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
    });
    
    setForm({ 
      title: "", type: "Internship", location: "", stipend: "", deadline: "",
      minimum_cgpa: "", eligible_branches: [], eligible_years: [], required_skills: []
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
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-border-subtle bg-bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-text-main font-semibold text-sm">Post New Opportunity</h3>
          <button
            onClick={onClose}
            className="text-text-main0 hover:text-text-muted"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* BASIC INFORMATION */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-text-main border-b border-border-subtle pb-1">Basic Information</h4>
            <div className="flex flex-col gap-1">
            <label className="text-xs text-text-muted">Role title</label>
            <input
              value={form.title}
              onChange={update("title")}
              placeholder="e.g. Frontend Developer Intern"
              className="bg-bg-card/60 border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-text-muted">Type</label>
              <select
                value={form.type}
                onChange={update("type")}
                className="bg-bg-card/60 border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary"
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
                className="bg-bg-card/60 border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary"
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
                className="bg-bg-card/60 border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-text-muted">Deadline</label>
              <input
                type="date"
                value={form.deadline}
                onChange={update("deadline")}
                className="bg-bg-card/60 border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary"
                required
              />
            </div>
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
              Post Opportunity
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
