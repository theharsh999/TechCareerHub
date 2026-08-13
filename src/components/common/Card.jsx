// src/components/common/Card.jsx
//
// PLACEHOLDER — your real Card.jsx wasn't in the files I received.
// Accepts className + children, matching the API assumed by the TPO module.
// Drop this file when merging with your actual project.

export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-[#111622] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
