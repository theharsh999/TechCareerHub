// src/components/student/ApplicationStatusTracker.jsx
//
// Horizontal pipeline: Applied -> Shortlisted -> Interview -> Selected.
// "Rejected" is a terminal state that can occur at any stage, so it's
// rendered as an alternate end-state rather than a 5th step in the line.

import { Check, X } from "lucide-react";
import { APPLICATION_STAGES, REJECTED } from "../../constants/applicationMockData";

export default function ApplicationStatusTracker({ status }) {
  const isRejected = status === REJECTED;
  const currentIndex = APPLICATION_STAGES.indexOf(status);

  return (
    <div className="flex items-center w-full">
      {APPLICATION_STAGES.map((stage, i) => {
        const isLast = i === APPLICATION_STAGES.length - 1;
        const reached = !isRejected && i <= currentIndex;
        const isCurrent = !isRejected && i === currentIndex;

        return (
          <div key={stage} className={`flex items-center ${isLast ? "" : "flex-1"}`}>
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold border ${
                  reached
                    ? "bg-primary border-primary text-white"
                    : "bg-slate-900 border-slate-700 text-slate-600"
                } ${isCurrent ? "ring-2 ring-primary/30" : ""}`}
              >
                {reached ? <Check size={12} /> : i + 1}
              </div>
              <span
                className={`text-[10px] whitespace-nowrap ${
                  reached ? "text-slate-300 font-medium" : "text-slate-600"
                }`}
              >
                {stage}
              </span>
            </div>

            {!isLast && (
              <div
                className={`h-0.5 flex-1 mx-1 rounded ${
                  !isRejected && i < currentIndex ? "bg-primary" : "bg-slate-800"
                }`}
              />
            )}
          </div>
        );
      })}

      {isRejected && (
        <div className="flex flex-col items-center gap-1.5 shrink-0 ml-1">
          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-rose-500/20 border border-rose-500/50 text-rose-400">
            <X size={12} />
          </div>
          <span className="text-[10px] text-rose-400 font-medium whitespace-nowrap">
            Rejected
          </span>
        </div>
      )}
    </div>
  );
}
