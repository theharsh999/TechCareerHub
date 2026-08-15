import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export function useTPOStudentsData() {
  const { user } = useAuth();
  
  const [rawStudents, setRawStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [minCgpa, setMinCgpa] = useState("");

  const fetchData = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      setError(null);

      // 1. Fetch students and their skills in one go
      const { data: studentsData, error: studentsError } = await supabase
        .from("students")
        .select(`
          id,
          roll_no,
          branch,
          academic_year,
          cgpa,
          location,
          resume_url,
          student_skills (
            proficiency,
            skills ( name, category )
          )
        `);

      if (studentsError) throw studentsError;
      
      const sData = studentsData || [];
      const studentIds = sData.map(s => s.id);

      // 2. Fetch profiles
      let profilesMap = new Map();
      if (studentIds.length > 0) {
        const { data: pData, error: pError } = await supabase
          .from("profiles")
          .select("id, full_name, email")
          .in("id", studentIds);
        
        // Even if pError occurs (e.g. RLS), we don't throw, we just map what we got
        if (pData) {
          profilesMap = new Map(pData.map(p => [p.id, p]));
        }
      }

      // 3. Combine Data
      const combined = sData.map(student => {
        const profile = profilesMap.get(student.id);
        
        // Flatten skills for easier rendering and searching
        const skills = (student.student_skills || []).map(ss => ss.skills?.name).filter(Boolean);

        return {
          id: student.id,
          fullName: profile?.full_name || (student.roll_no ? `Student (Roll No: ${student.roll_no})` : "Unknown"),
          email: profile?.email || "Unknown Email",
          rollNo: student.roll_no || "N/A",
          branch: student.branch || "Not Specified",
          academicYear: student.academic_year || "Not Specified",
          cgpa: student.cgpa || null,
          location: student.location || "Not Specified",
          resumeUrl: student.resume_url || null,
          skills: skills,
        };
      });

      setRawStudents(combined);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Derived / Filtered Data
  const filteredStudents = useMemo(() => {
    return rawStudents.filter(student => {
      // 1. Search Query (matches name, rollNo, email, or skills)
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        !q ||
        student.fullName.toLowerCase().includes(q) ||
        student.email.toLowerCase().includes(q) ||
        student.rollNo.toLowerCase().includes(q) ||
        student.skills.some(skill => skill.toLowerCase().includes(q));

      // 2. Branch
      const matchesBranch = branchFilter === "All" || student.branch === branchFilter;

      // 3. Year
      const matchesYear = yearFilter === "All" || student.academicYear === yearFilter;

      // 4. CGPA
      let matchesCgpa = true;
      if (minCgpa) {
        const cgpaValue = parseFloat(student.cgpa);
        const minVal = parseFloat(minCgpa);
        if (!isNaN(minVal)) {
          matchesCgpa = !isNaN(cgpaValue) && cgpaValue >= minVal;
        }
      }

      return matchesSearch && matchesBranch && matchesYear && matchesCgpa;
    });
  }, [rawStudents, searchQuery, branchFilter, yearFilter, minCgpa]);

  // Extract unique filter options
  const branchOptions = useMemo(() => ["All", ...new Set(rawStudents.map(s => s.branch).filter(b => b !== "Not Specified"))], [rawStudents]);
  const yearOptions = useMemo(() => ["All", ...new Set(rawStudents.map(s => s.academicYear).filter(y => y !== "Not Specified"))], [rawStudents]);

  return {
    students: filteredStudents,
    loading,
    error,
    refresh: fetchData,
    // Filter controls
    searchQuery, setSearchQuery,
    branchFilter, setBranchFilter,
    yearFilter, setYearFilter,
    minCgpa, setMinCgpa,
    branchOptions,
    yearOptions,
  };
}
