// src/components/common/Badge.jsx
//
// PLACEHOLDER — your real Badge.jsx wasn't in the files I received.
// Renders children as-is; callers (like the TPO applications table) pass
// explicit color classes via className, so this stays unopinionated.
// Drop this file when merging with your actual project.

export default function Badge({ children, className = "", ...props }) {
  return (
    <span
      className={`inline-flex items-center rounded-full text-xs font-medium ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
