// src/lib/driveEngine.js

/**
 * Calculates eligibility and match percentage based on TPO-verified student data
 */
export function calculateTalentMatch(students = [], criteria = {}) {
  const { minCgpa = 0, allowBacklogs = false, requiredSkills = [] } = criteria;

  // Filter verified eligible candidates
  const eligibleStudents = students.filter((student) => {
    if (!student.isVerifiedByTPO) return false;
    if (student.cgpa < minCgpa) return false;
    if (!allowBacklogs && student.backlogs > 0) return false;
    return true;
  });

  // Calculate Match Score per student
  const studentMatches = eligibleStudents.map((student) => {
    if (requiredSkills.length === 0) return { ...student, matchScore: 100 };

    const matchedSkills = student.skills.filter((skill) =>
      requiredSkills.some((req) => req.toLowerCase() === skill.toLowerCase())
    );

    const score = Math.round((matchedSkills.length / requiredSkills.length) * 100);
    return {
      ...student,
      matchScore: score,
    };
  });

  const avgMatch =
    studentMatches.length > 0
      ? Math.round(
          studentMatches.reduce((acc, curr) => acc + curr.matchScore, 0) / studentMatches.length
        )
      : 0;

  return {
    eligibleCount: studentMatches.length,
    averageMatchScore: avgMatch,
    students: studentMatches,
  };
}