import {
  RISK_WEIGHTS,
  RISK_CAPS,
  RISK_THRESHOLDS,
  MATCH_PERCENTAGE_THRESHOLD,
} from '../constants/riskConfig';

// Expects an array shaped like:
// {
//   id, name, rollNo, cgpa, resumeUrl,
//   applications: [{ status, matchPercentage, minimumCgpa }]
// }
export function buildStudentRiskInputs(rawStudents) {
  return rawStudents.map((s) => {
    const rejections = s.applications.filter((a) => a.status === 'rejected').length;

    const withMatch = s.applications.filter((a) => a.matchPercentage != null);
    const avgMatchPercentage =
      withMatch.length > 0
        ? withMatch.reduce((sum, a) => sum + a.matchPercentage, 0) / withMatch.length
        : null;

    const underQualifiedApps = s.applications.filter(
      (a) => a.minimumCgpa != null && s.cgpa != null && s.cgpa < a.minimumCgpa
    );
    const avgCgpaGap =
      underQualifiedApps.length > 0
        ? underQualifiedApps.reduce((sum, a) => sum + (a.minimumCgpa - s.cgpa), 0) /
          underQualifiedApps.length
        : 0;

    const resumeIncomplete =
      !s.resumeUrl || s.resumeUrl.trim() === '' || s.resumeUrl.trim() === '#';

    return {
      id: s.id,
      name: s.name,
      rollNo: s.rollNo,
      resumeIncomplete,
      totalApplications: s.applications.length,
      rejections,
      avgMatchPercentage,
      underQualifiedCount: underQualifiedApps.length,
      avgCgpaGap,
    };
  });
}

export function calculateRiskScore(student) {
  let score = 0;
  const reasons = [];

  if (student.resumeIncomplete) {
    score += RISK_WEIGHTS.resumeIncomplete;
    reasons.push('Resume missing or incomplete');
  }

  if (student.totalApplications > 0) {
    const rejectionRatio = student.rejections / student.totalApplications;
    if (rejectionRatio > 0) {
      score += Math.round(rejectionRatio * RISK_WEIGHTS.rejectionRate);
      reasons.push(
        `${student.rejections} rejections out of ${student.totalApplications} applications`
      );
    }
  } else {
    score += RISK_WEIGHTS.noApplications;
    reasons.push('No applications yet');
  }

  if (
    student.avgMatchPercentage != null &&
    student.avgMatchPercentage < MATCH_PERCENTAGE_THRESHOLD
  ) {
    score += RISK_WEIGHTS.lowMatchPercentage;
    reasons.push(`Low avg job-match score (${Math.round(student.avgMatchPercentage)}%)`);
  }

  if (student.underQualifiedCount > 0) {
    const gapPoints = Math.min(
      student.underQualifiedCount * RISK_WEIGHTS.cgpaGapPerApp,
      RISK_CAPS.maxCgpaGapPoints
    );
    score += gapPoints;
    reasons.push(
      `Applied to ${student.underQualifiedCount} role(s) below required CGPA (avg gap ${student.avgCgpaGap.toFixed(
        1
      )})`
    );
  }

  score = Math.min(score, 100);

  let level = 'low';
  if (score >= RISK_THRESHOLDS.high) level = 'high';
  else if (score >= RISK_THRESHOLDS.medium) level = 'medium';

  return {
    ...student,
    riskScore: score,
    riskLevel: level,
    reasons,
    recommendedActions: getRecommendedActions(student),
  };
}

function getRecommendedActions(student) {
  const actions = [];
  if (student.resumeIncomplete) {
    actions.push('Complete resume profile');
  }
  if (student.totalApplications === 0) {
    actions.push('Encourage applying to open drives');
  } else if (student.rejections / student.totalApplications >= 0.5) {
    actions.push('Assign mock interview session');
  }
  if (student.avgMatchPercentage != null && student.avgMatchPercentage < MATCH_PERCENTAGE_THRESHOLD) {
    actions.push('Guide toward better-fit job postings');
  }
  if (student.underQualifiedCount > 0) {
    actions.push('Advise on CGPA-appropriate opportunities');
  }
  return actions;
}

export function rankStudentsByRisk(rawStudents) {
  return buildStudentRiskInputs(rawStudents)
    .map(calculateRiskScore)
    .sort((a, b) => b.riskScore - a.riskScore);
}