// Phase 1 — zero schema change. Weights redistributed since skills/interview
// score aren't available yet (add back in Phase 2 when those columns exist).

export const RISK_WEIGHTS = {
  resumeIncomplete: 25,     // resume_url missing or placeholder ('#')
  rejectionRate: 35,        // scaled by rejections/applications ratio
  lowMatchPercentage: 20,   // avg match_percentage < threshold
  cgpaGapPerApp: 10,        // per application where student.cgpa < opportunity.minimum_cgpa
  noApplications: 20,       // student has 0 applications at all
};

export const RISK_CAPS = {
  maxCgpaGapPoints: 20,     // cap cgpa-gap contribution
};

export const RISK_THRESHOLDS = {
  high: 70,
  medium: 40,
  // below medium = low risk
};

export const MATCH_PERCENTAGE_THRESHOLD = 50; // %, below this = weak-fit applications

// ── Phase 2 (uncomment when skills + interview_score columns exist) ──────
// export const RISK_WEIGHTS_PHASE2 = {
//   skillsGapPerSkill: 8,
//   maxSkillsGapPoints: 24,
//   lowInterviewScore: 20,
//   interviewScoreThreshold: 5,
// };