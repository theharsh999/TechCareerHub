// src/components/company/PostOpportunityModal.jsx
//
// ASSUMPTION: no existing Modal/Dialog common component was in the files
// I received, so this ships its own lightweight overlay. If the project
// already has components/common/Modal.jsx, swap this wrapper for that and
// keep the form body as-is.

import { useState } from "react";
import { X } from "lucide-react";
import Button from "../common/Button";

const TYPES = ["Internship", "Full-time"];

export default function PostOpportunityModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    type: "Internship",
    location: "",
    stipend: "",
    deadline: "",
  });

  if (!open) return null;

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.deadline) return;
    onSubmit(form);
    setForm({ title: "", type: "Internship", location: "", stipend: "", deadline: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-2xl border border-border-subtle bg-bg-card p-5">
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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

          <div className="flex items-center justify-end gap-2 mt-2">
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
