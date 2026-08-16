import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import Button from "../common/Button";

export default function EditCompanyProfileModal({ open, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({
    industry: "",
    location: "",
    website: "",
    about: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData && open) {
      setForm({
        industry: initialData.industry || "",
        location: initialData.location || "",
        website: initialData.website || "",
        about: initialData.about || "",
      });
      setError(null);
    }
  }, [initialData, open]);

  if (!open) return null;

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit(form);
      onClose();
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={!isSubmitting ? onClose : undefined}
      />
      <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-[#111622] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-sm">Edit Company Profile</h3>
          <button
            onClick={!isSubmitting ? onClose : undefined}
            className="text-slate-500 hover:text-slate-300 disabled:opacity-50"
            disabled={isSubmitting}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400">Industry</label>
            <input
              value={form.industry}
              onChange={update("industry")}
              placeholder="e.g. Technology, Finance, EdTech"
              className="bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400">Location</label>
            <input
              value={form.location}
              onChange={update("location")}
              placeholder="e.g. Mumbai, Remote"
              className="bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400">Website</label>
            <input
              type="url"
              value={form.website}
              onChange={update("website")}
              placeholder="e.g. https://yourcompany.com"
              className="bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400">About the Company</label>
            <textarea
              value={form.about}
              onChange={update("about")}
              placeholder="Describe what your company does..."
              className="bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-primary min-h-[100px] resize-y"
            />
          </div>

          <div className="flex items-center justify-end gap-2 mt-2">
            <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting} className="gap-2">
              {isSubmitting && <Loader2 size={14} className="animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
