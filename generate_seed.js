const fs = require('fs');

const students = [];
for(let i=1; i<=15; i++) {
  students.push({
    email: `demo.student${i}@example.com`,
    name: `Student Name ${i}`,
    roll: `CS${100+i}`,
    branch: i%2===0 ? 'Computer Science' : 'IT',
    cgpa: (7.0 + (i%3)).toFixed(1)
  });
}

const companies = [];
for(let i=1; i<=7; i++) {
  companies.push({
    email: `demo.company${i}@example.com`,
    name: `Demo Company ${i}`,
    industry: i%2===0 ? 'Technology' : 'Finance'
  });
}

let sql = `-- TechCareerHub Demo Seed Data\n\n`;

// Profiles
sql += `-- 1. UPDATE PROFILES\n`;
students.forEach(s => {
  sql += `UPDATE public.profiles SET full_name = '${s.name}' WHERE email = '${s.email}';\n`;
});
companies.forEach(c => {
  sql += `UPDATE public.profiles SET full_name = '${c.name}' WHERE email = '${c.email}';\n`;
});
sql += `UPDATE public.profiles SET full_name = 'TPO Officer 1' WHERE email = 'demo.tpo1@example.com';\n`;
sql += `UPDATE public.profiles SET full_name = 'TPO Officer 2' WHERE email = 'demo.tpo2@example.com';\n\n`;

// Students
sql += `-- 2. INSERT STUDENTS\n`;
students.forEach(s => {
  sql += `INSERT INTO public.students (id, roll_no, branch, academic_year, cgpa, location, bio, resume_url)
SELECT id, '${s.roll}', '${s.branch}', '3rd Year', ${s.cgpa}, 'Mumbai', 'Passionate demo student.', '#'
FROM auth.users WHERE email = '${s.email}'
ON CONFLICT (id) DO UPDATE SET roll_no = EXCLUDED.roll_no, cgpa = EXCLUDED.cgpa, branch = EXCLUDED.branch;\n`;
});
sql += `\n`;

// Companies
sql += `-- 3. INSERT COMPANIES\n`;
companies.forEach((c, i) => {
  sql += `INSERT INTO public.companies (id, profile_id, company_name, industry, location, website, about)
SELECT 'b0000000-0000-0000-0000-00000000000${i+1}', id, '${c.name}', '${c.industry}', 'Bangalore', 'https://example.com', 'Leading demo company.'
FROM auth.users WHERE email = '${c.email}'
ON CONFLICT (id) DO NOTHING;\n`;
});
sql += `\n`;

// Opportunities
sql += `-- 4. INSERT OPPORTUNITIES\n`;
let oppIndex = 1;
companies.forEach((c, i) => {
  const companyId = `b0000000-0000-0000-0000-00000000000${i+1}`;
  for(let j=1; j<=3; j++) {
    const oppId = `c0000000-0000-0000-0000-0000000000${oppIndex < 10 ? '0'+oppIndex : oppIndex}`;
    sql += `INSERT INTO public.opportunities (id, company_id, title, type, location, mode, minimum_cgpa, application_deadline, stipend, status)
VALUES ('${oppId}', '${companyId}', 'Role ${j} at ${c.name}', '${j%2===0 ? 'internship' : 'job'}', 'Remote', 'Hybrid', 7.0, '2026-12-31', '₹30,000/mo', 'Open')
ON CONFLICT (id) DO NOTHING;\n`;
    oppIndex++;
  }
});
sql += `\n`;

// Applications
sql += `-- 5. INSERT APPLICATIONS\n`;
const statuses = ['applied', 'shortlisted', 'interview_scheduled', 'offered', 'rejected'];
let appId = 1;
for(let i=0; i<50; i++) {
  const student = students[i % 15];
  const oppIndexStr = (i % 20) + 1;
  const oppId = `c0000000-0000-0000-0000-0000000000${oppIndexStr < 10 ? '0'+oppIndexStr : oppIndexStr}`;
  const status = statuses[i % 5];
  const aid = `a0000000-0000-0000-0000-0000000000${appId < 10 ? '0'+appId : appId}`;
  
  sql += `INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT '${aid}', u.id, '${oppId}', '${status}', 85
FROM auth.users u WHERE u.email = '${student.email}'
ON CONFLICT (id) DO NOTHING;\n`;
  appId++;
}
sql += `\n`;

fs.writeFileSync('supabase/seed_demo_data.sql', sql);
