// src/components/common/Button.jsx
//
// PLACEHOLDER — your real Button.jsx wasn't in the files I received.
// This matches the dark/indigo design system described in the brief.
// Drop this file when merging with your actual project.

const VARIANTS = {
  primary:
    "bg-primary text-white hover:bg-indigo-500 border border-transparent",
  secondary:
    "bg-slate-800/60 text-slate-200 hover:bg-slate-800 border border-slate-700",
  ghost:
    "bg-transparent text-slate-300 hover:text-white border border-transparent",
  danger:
    "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant] ?? VARIANTS.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
