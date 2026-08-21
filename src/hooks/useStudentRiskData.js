import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { rankStudentsByRisk } from "../lib/riskEngine";

export function useStudentRiskData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRiskData = useCallback(async () => {
    // 1. All students
    const { data: students, error: studentsError } = await supabase
      .from("students")
      .select("id, roll_no, cgpa, resume_url");

    if (studentsError) throw studentsError;
    const studentList = students || [];

    // 2. Profiles (full_name) — students.id === profiles.id per seed data
    const studentIds = studentList.map((s) => s.id);
    let profiles = [];
    if (studentIds.length > 0) {
      const { data: pData, error: profError } = await supabase
        .from("profiles")
        .select("id, full_name")
        .in("id", studentIds);
      if (profError) throw profError;
      profiles = pData || [];
    }

    // 3. All applications for these students
    let applications = [];
    if (studentIds.length > 0) {
      const { data: aData, error: appError } = await supabase
        .from("applications")
        .select("student_id, opportunity_id, status, match_percentage")
        .in("student_id", studentIds);
      if (appError) throw appError;
      applications = aData || [];
    }

    // 4. minimum_cgpa for the opportunities actually applied to
    const oppIds = [...new Set(applications.map((a) => a.opportunity_id))];
    let opportunities = [];
    if (oppIds.length > 0) {
      const { data: oData, error: oppError } = await supabase
        .from("opportunities")
        .select("id, minimum_cgpa")
        .in("id", oppIds);
      if (oppError) throw oppError;
      opportunities = oData || [];
    }

    const profileMap = new Map(profiles.map((p) => [p.id, p]));
    const oppMap = new Map(opportunities.map((o) => [o.id, o]));

    // 5. Group applications by student
    const appsByStudent = new Map();
    applications.forEach((a) => {
      const list = appsByStudent.get(a.student_id) || [];
      list.push({
        status: a.status,
        matchPercentage: a.match_percentage,
        minimumCgpa: oppMap.get(a.opportunity_id)?.minimum_cgpa ?? null,
      });
      appsByStudent.set(a.student_id, list);
    });

    // 6. Build raw student input for the risk engine
    const rawStudents = studentList.map((s) => ({
      id: s.id,
      name: profileMap.get(s.id)?.full_name || `Student (Roll No: ${s.roll_no})`,
      rollNo: s.roll_no,
      cgpa: s.cgpa,
      resumeUrl: s.resume_url,
      applications: appsByStudent.get(s.id) || [],
    }));

    return rankStudentsByRisk(rawStudents);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const ranked = await fetchRiskData();
      setData(ranked);
    } catch (err) {
      console.error("Student risk data error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchRiskData]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refresh: load };
}