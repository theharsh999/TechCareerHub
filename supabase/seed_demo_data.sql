-- TechCareerHub Demo Seed Data

-- 1. UPDATE PROFILES (Assuming auth triggers create profiles)
UPDATE public.profiles SET full_name = 'Student Name 1' WHERE email = 'demo.student1@example.com';
UPDATE public.profiles SET full_name = 'Student Name 2' WHERE email = 'demo.student2@example.com';
UPDATE public.profiles SET full_name = 'Student Name 3' WHERE email = 'demo.student3@example.com';
UPDATE public.profiles SET full_name = 'Student Name 4' WHERE email = 'demo.student4@example.com';
UPDATE public.profiles SET full_name = 'Student Name 5' WHERE email = 'demo.student5@example.com';
UPDATE public.profiles SET full_name = 'Student Name 6' WHERE email = 'demo.student6@example.com';
UPDATE public.profiles SET full_name = 'Student Name 7' WHERE email = 'demo.student7@example.com';
UPDATE public.profiles SET full_name = 'Student Name 8' WHERE email = 'demo.student8@example.com';
UPDATE public.profiles SET full_name = 'Student Name 9' WHERE email = 'demo.student9@example.com';
UPDATE public.profiles SET full_name = 'Student Name 10' WHERE email = 'demo.student10@example.com';
UPDATE public.profiles SET full_name = 'Student Name 11' WHERE email = 'demo.student11@example.com';
UPDATE public.profiles SET full_name = 'Student Name 12' WHERE email = 'demo.student12@example.com';
UPDATE public.profiles SET full_name = 'Student Name 13' WHERE email = 'demo.student13@example.com';
UPDATE public.profiles SET full_name = 'Student Name 14' WHERE email = 'demo.student14@example.com';
UPDATE public.profiles SET full_name = 'Student Name 15' WHERE email = 'demo.student15@example.com';
UPDATE public.profiles SET full_name = 'Demo Company 1' WHERE email = 'demo.company1@example.com';
UPDATE public.profiles SET full_name = 'Demo Company 2' WHERE email = 'demo.company2@example.com';
UPDATE public.profiles SET full_name = 'Demo Company 3' WHERE email = 'demo.company3@example.com';
UPDATE public.profiles SET full_name = 'Demo Company 4' WHERE email = 'demo.company4@example.com';
UPDATE public.profiles SET full_name = 'Demo Company 5' WHERE email = 'demo.company5@example.com';
UPDATE public.profiles SET full_name = 'Demo Company 6' WHERE email = 'demo.company6@example.com';
UPDATE public.profiles SET full_name = 'Demo Company 7' WHERE email = 'demo.company7@example.com';
UPDATE public.profiles SET full_name = 'TPO Officer 1' WHERE email = 'demo.tpo1@example.com';
UPDATE public.profiles SET full_name = 'TPO Officer 2' WHERE email = 'demo.tpo2@example.com';

-- 2. INSERT STUDENTS
INSERT INTO public.students (id, roll_no, branch, academic_year, cgpa, location, bio, resume_url)
SELECT id, 'CS101', 'IT', '3rd Year', 8.0, 'Mumbai', 'Passionate demo student.', '#'
FROM auth.users WHERE email = 'demo.student1@example.com'
ON CONFLICT (id) DO UPDATE SET roll_no = EXCLUDED.roll_no, cgpa = EXCLUDED.cgpa, branch = EXCLUDED.branch;
INSERT INTO public.students (id, roll_no, branch, academic_year, cgpa, location, bio, resume_url)
SELECT id, 'CS102', 'Computer Science', '3rd Year', 9.0, 'Mumbai', 'Passionate demo student.', '#'
FROM auth.users WHERE email = 'demo.student2@example.com'
ON CONFLICT (id) DO UPDATE SET roll_no = EXCLUDED.roll_no, cgpa = EXCLUDED.cgpa, branch = EXCLUDED.branch;
INSERT INTO public.students (id, roll_no, branch, academic_year, cgpa, location, bio, resume_url)
SELECT id, 'CS103', 'IT', '3rd Year', 7.0, 'Mumbai', 'Passionate demo student.', '#'
FROM auth.users WHERE email = 'demo.student3@example.com'
ON CONFLICT (id) DO UPDATE SET roll_no = EXCLUDED.roll_no, cgpa = EXCLUDED.cgpa, branch = EXCLUDED.branch;
INSERT INTO public.students (id, roll_no, branch, academic_year, cgpa, location, bio, resume_url)
SELECT id, 'CS104', 'Computer Science', '3rd Year', 8.0, 'Mumbai', 'Passionate demo student.', '#'
FROM auth.users WHERE email = 'demo.student4@example.com'
ON CONFLICT (id) DO UPDATE SET roll_no = EXCLUDED.roll_no, cgpa = EXCLUDED.cgpa, branch = EXCLUDED.branch;
INSERT INTO public.students (id, roll_no, branch, academic_year, cgpa, location, bio, resume_url)
SELECT id, 'CS105', 'IT', '3rd Year', 9.0, 'Mumbai', 'Passionate demo student.', '#'
FROM auth.users WHERE email = 'demo.student5@example.com'
ON CONFLICT (id) DO UPDATE SET roll_no = EXCLUDED.roll_no, cgpa = EXCLUDED.cgpa, branch = EXCLUDED.branch;
INSERT INTO public.students (id, roll_no, branch, academic_year, cgpa, location, bio, resume_url)
SELECT id, 'CS106', 'Computer Science', '3rd Year', 7.0, 'Mumbai', 'Passionate demo student.', '#'
FROM auth.users WHERE email = 'demo.student6@example.com'
ON CONFLICT (id) DO UPDATE SET roll_no = EXCLUDED.roll_no, cgpa = EXCLUDED.cgpa, branch = EXCLUDED.branch;
INSERT INTO public.students (id, roll_no, branch, academic_year, cgpa, location, bio, resume_url)
SELECT id, 'CS107', 'IT', '3rd Year', 8.0, 'Mumbai', 'Passionate demo student.', '#'
FROM auth.users WHERE email = 'demo.student7@example.com'
ON CONFLICT (id) DO UPDATE SET roll_no = EXCLUDED.roll_no, cgpa = EXCLUDED.cgpa, branch = EXCLUDED.branch;
INSERT INTO public.students (id, roll_no, branch, academic_year, cgpa, location, bio, resume_url)
SELECT id, 'CS108', 'Computer Science', '3rd Year', 9.0, 'Mumbai', 'Passionate demo student.', '#'
FROM auth.users WHERE email = 'demo.student8@example.com'
ON CONFLICT (id) DO UPDATE SET roll_no = EXCLUDED.roll_no, cgpa = EXCLUDED.cgpa, branch = EXCLUDED.branch;
INSERT INTO public.students (id, roll_no, branch, academic_year, cgpa, location, bio, resume_url)
SELECT id, 'CS109', 'IT', '3rd Year', 7.0, 'Mumbai', 'Passionate demo student.', '#'
FROM auth.users WHERE email = 'demo.student9@example.com'
ON CONFLICT (id) DO UPDATE SET roll_no = EXCLUDED.roll_no, cgpa = EXCLUDED.cgpa, branch = EXCLUDED.branch;
INSERT INTO public.students (id, roll_no, branch, academic_year, cgpa, location, bio, resume_url)
SELECT id, 'CS110', 'Computer Science', '3rd Year', 8.0, 'Mumbai', 'Passionate demo student.', '#'
FROM auth.users WHERE email = 'demo.student10@example.com'
ON CONFLICT (id) DO UPDATE SET roll_no = EXCLUDED.roll_no, cgpa = EXCLUDED.cgpa, branch = EXCLUDED.branch;
INSERT INTO public.students (id, roll_no, branch, academic_year, cgpa, location, bio, resume_url)
SELECT id, 'CS111', 'IT', '3rd Year', 9.0, 'Mumbai', 'Passionate demo student.', '#'
FROM auth.users WHERE email = 'demo.student11@example.com'
ON CONFLICT (id) DO UPDATE SET roll_no = EXCLUDED.roll_no, cgpa = EXCLUDED.cgpa, branch = EXCLUDED.branch;
INSERT INTO public.students (id, roll_no, branch, academic_year, cgpa, location, bio, resume_url)
SELECT id, 'CS112', 'Computer Science', '3rd Year', 7.0, 'Mumbai', 'Passionate demo student.', '#'
FROM auth.users WHERE email = 'demo.student12@example.com'
ON CONFLICT (id) DO UPDATE SET roll_no = EXCLUDED.roll_no, cgpa = EXCLUDED.cgpa, branch = EXCLUDED.branch;
INSERT INTO public.students (id, roll_no, branch, academic_year, cgpa, location, bio, resume_url)
SELECT id, 'CS113', 'IT', '3rd Year', 8.0, 'Mumbai', 'Passionate demo student.', '#'
FROM auth.users WHERE email = 'demo.student13@example.com'
ON CONFLICT (id) DO UPDATE SET roll_no = EXCLUDED.roll_no, cgpa = EXCLUDED.cgpa, branch = EXCLUDED.branch;
INSERT INTO public.students (id, roll_no, branch, academic_year, cgpa, location, bio, resume_url)
SELECT id, 'CS114', 'Computer Science', '3rd Year', 9.0, 'Mumbai', 'Passionate demo student.', '#'
FROM auth.users WHERE email = 'demo.student14@example.com'
ON CONFLICT (id) DO UPDATE SET roll_no = EXCLUDED.roll_no, cgpa = EXCLUDED.cgpa, branch = EXCLUDED.branch;
INSERT INTO public.students (id, roll_no, branch, academic_year, cgpa, location, bio, resume_url)
SELECT id, 'CS115', 'IT', '3rd Year', 7.0, 'Mumbai', 'Passionate demo student.', '#'
FROM auth.users WHERE email = 'demo.student15@example.com'
ON CONFLICT (id) DO UPDATE SET roll_no = EXCLUDED.roll_no, cgpa = EXCLUDED.cgpa, branch = EXCLUDED.branch;

-- 3. INSERT COMPANIES
INSERT INTO public.companies (id, profile_id, company_name, industry, location, website, about)
SELECT 'b0000000-0000-0000-0000-000000000001', id, 'Demo Company 1', 'Finance', 'Bangalore', 'https://example.com', 'Leading demo company.'
FROM auth.users WHERE email = 'demo.company1@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.companies (id, profile_id, company_name, industry, location, website, about)
SELECT 'b0000000-0000-0000-0000-000000000002', id, 'Demo Company 2', 'Technology', 'Bangalore', 'https://example.com', 'Leading demo company.'
FROM auth.users WHERE email = 'demo.company2@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.companies (id, profile_id, company_name, industry, location, website, about)
SELECT 'b0000000-0000-0000-0000-000000000003', id, 'Demo Company 3', 'Finance', 'Bangalore', 'https://example.com', 'Leading demo company.'
FROM auth.users WHERE email = 'demo.company3@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.companies (id, profile_id, company_name, industry, location, website, about)
SELECT 'b0000000-0000-0000-0000-000000000004', id, 'Demo Company 4', 'Technology', 'Bangalore', 'https://example.com', 'Leading demo company.'
FROM auth.users WHERE email = 'demo.company4@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.companies (id, profile_id, company_name, industry, location, website, about)
SELECT 'b0000000-0000-0000-0000-000000000005', id, 'Demo Company 5', 'Finance', 'Bangalore', 'https://example.com', 'Leading demo company.'
FROM auth.users WHERE email = 'demo.company5@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.companies (id, profile_id, company_name, industry, location, website, about)
SELECT 'b0000000-0000-0000-0000-000000000006', id, 'Demo Company 6', 'Technology', 'Bangalore', 'https://example.com', 'Leading demo company.'
FROM auth.users WHERE email = 'demo.company6@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.companies (id, profile_id, company_name, industry, location, website, about)
SELECT 'b0000000-0000-0000-0000-000000000007', id, 'Demo Company 7', 'Finance', 'Bangalore', 'https://example.com', 'Leading demo company.'
FROM auth.users WHERE email = 'demo.company7@example.com'
ON CONFLICT (id) DO NOTHING;

-- 4. INSERT OPPORTUNITIES
INSERT INTO public.opportunities (id, company_id, title, type, location, mode, minimum_cgpa, application_deadline, stipend, status)
VALUES ('c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'Role 1 at Demo Company 1', 'job', 'Remote', 'Hybrid', 7.0, '2026-12-31', '₹30,000/mo', 'Open')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.opportunities (id, company_id, title, type, location, mode, minimum_cgpa, application_deadline, stipend, status)
VALUES ('c0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 'Role 2 at Demo Company 1', 'internship', 'Remote', 'Hybrid', 7.0, '2026-12-31', '₹30,000/mo', 'Open')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.opportunities (id, company_id, title, type, location, mode, minimum_cgpa, application_deadline, stipend, status)
VALUES ('c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', 'Role 3 at Demo Company 1', 'job', 'Remote', 'Hybrid', 7.0, '2026-12-31', '₹30,000/mo', 'Open')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.opportunities (id, company_id, title, type, location, mode, minimum_cgpa, application_deadline, stipend, status)
VALUES ('c0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000002', 'Role 1 at Demo Company 2', 'job', 'Remote', 'Hybrid', 7.0, '2026-12-31', '₹30,000/mo', 'Open')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.opportunities (id, company_id, title, type, location, mode, minimum_cgpa, application_deadline, stipend, status)
VALUES ('c0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000002', 'Role 2 at Demo Company 2', 'internship', 'Remote', 'Hybrid', 7.0, '2026-12-31', '₹30,000/mo', 'Open')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.opportunities (id, company_id, title, type, location, mode, minimum_cgpa, application_deadline, stipend, status)
VALUES ('c0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000002', 'Role 3 at Demo Company 2', 'job', 'Remote', 'Hybrid', 7.0, '2026-12-31', '₹30,000/mo', 'Open')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.opportunities (id, company_id, title, type, location, mode, minimum_cgpa, application_deadline, stipend, status)
VALUES ('c0000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000003', 'Role 1 at Demo Company 3', 'job', 'Remote', 'Hybrid', 7.0, '2026-12-31', '₹30,000/mo', 'Open')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.opportunities (id, company_id, title, type, location, mode, minimum_cgpa, application_deadline, stipend, status)
VALUES ('c0000000-0000-0000-0000-000000000008', 'b0000000-0000-0000-0000-000000000003', 'Role 2 at Demo Company 3', 'internship', 'Remote', 'Hybrid', 7.0, '2026-12-31', '₹30,000/mo', 'Open')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.opportunities (id, company_id, title, type, location, mode, minimum_cgpa, application_deadline, stipend, status)
VALUES ('c0000000-0000-0000-0000-000000000009', 'b0000000-0000-0000-0000-000000000003', 'Role 3 at Demo Company 3', 'job', 'Remote', 'Hybrid', 7.0, '2026-12-31', '₹30,000/mo', 'Open')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.opportunities (id, company_id, title, type, location, mode, minimum_cgpa, application_deadline, stipend, status)
VALUES ('c0000000-0000-0000-0000-000000000010', 'b0000000-0000-0000-0000-000000000004', 'Role 1 at Demo Company 4', 'job', 'Remote', 'Hybrid', 7.0, '2026-12-31', '₹30,000/mo', 'Open')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.opportunities (id, company_id, title, type, location, mode, minimum_cgpa, application_deadline, stipend, status)
VALUES ('c0000000-0000-0000-0000-000000000011', 'b0000000-0000-0000-0000-000000000004', 'Role 2 at Demo Company 4', 'internship', 'Remote', 'Hybrid', 7.0, '2026-12-31', '₹30,000/mo', 'Open')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.opportunities (id, company_id, title, type, location, mode, minimum_cgpa, application_deadline, stipend, status)
VALUES ('c0000000-0000-0000-0000-000000000012', 'b0000000-0000-0000-0000-000000000004', 'Role 3 at Demo Company 4', 'job', 'Remote', 'Hybrid', 7.0, '2026-12-31', '₹30,000/mo', 'Open')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.opportunities (id, company_id, title, type, location, mode, minimum_cgpa, application_deadline, stipend, status)
VALUES ('c0000000-0000-0000-0000-000000000013', 'b0000000-0000-0000-0000-000000000005', 'Role 1 at Demo Company 5', 'job', 'Remote', 'Hybrid', 7.0, '2026-12-31', '₹30,000/mo', 'Open')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.opportunities (id, company_id, title, type, location, mode, minimum_cgpa, application_deadline, stipend, status)
VALUES ('c0000000-0000-0000-0000-000000000014', 'b0000000-0000-0000-0000-000000000005', 'Role 2 at Demo Company 5', 'internship', 'Remote', 'Hybrid', 7.0, '2026-12-31', '₹30,000/mo', 'Open')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.opportunities (id, company_id, title, type, location, mode, minimum_cgpa, application_deadline, stipend, status)
VALUES ('c0000000-0000-0000-0000-000000000015', 'b0000000-0000-0000-0000-000000000005', 'Role 3 at Demo Company 5', 'job', 'Remote', 'Hybrid', 7.0, '2026-12-31', '₹30,000/mo', 'Open')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.opportunities (id, company_id, title, type, location, mode, minimum_cgpa, application_deadline, stipend, status)
VALUES ('c0000000-0000-0000-0000-000000000016', 'b0000000-0000-0000-0000-000000000006', 'Role 1 at Demo Company 6', 'job', 'Remote', 'Hybrid', 7.0, '2026-12-31', '₹30,000/mo', 'Open')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.opportunities (id, company_id, title, type, location, mode, minimum_cgpa, application_deadline, stipend, status)
VALUES ('c0000000-0000-0000-0000-000000000017', 'b0000000-0000-0000-0000-000000000006', 'Role 2 at Demo Company 6', 'internship', 'Remote', 'Hybrid', 7.0, '2026-12-31', '₹30,000/mo', 'Open')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.opportunities (id, company_id, title, type, location, mode, minimum_cgpa, application_deadline, stipend, status)
VALUES ('c0000000-0000-0000-0000-000000000018', 'b0000000-0000-0000-0000-000000000006', 'Role 3 at Demo Company 6', 'job', 'Remote', 'Hybrid', 7.0, '2026-12-31', '₹30,000/mo', 'Open')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.opportunities (id, company_id, title, type, location, mode, minimum_cgpa, application_deadline, stipend, status)
VALUES ('c0000000-0000-0000-0000-000000000019', 'b0000000-0000-0000-0000-000000000007', 'Role 1 at Demo Company 7', 'job', 'Remote', 'Hybrid', 7.0, '2026-12-31', '₹30,000/mo', 'Open')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.opportunities (id, company_id, title, type, location, mode, minimum_cgpa, application_deadline, stipend, status)
VALUES ('c0000000-0000-0000-0000-000000000020', 'b0000000-0000-0000-0000-000000000007', 'Role 2 at Demo Company 7', 'internship', 'Remote', 'Hybrid', 7.0, '2026-12-31', '₹30,000/mo', 'Open')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.opportunities (id, company_id, title, type, location, mode, minimum_cgpa, application_deadline, stipend, status)
VALUES ('c0000000-0000-0000-0000-000000000021', 'b0000000-0000-0000-0000-000000000007', 'Role 3 at Demo Company 7', 'job', 'Remote', 'Hybrid', 7.0, '2026-12-31', '₹30,000/mo', 'Open')
ON CONFLICT (id) DO NOTHING;

-- 5. INSERT APPLICATIONS
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000001', u.id, 'c0000000-0000-0000-0000-000000000001', 'applied', 85
FROM auth.users u WHERE u.email = 'demo.student1@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000002', u.id, 'c0000000-0000-0000-0000-000000000002', 'shortlisted', 85
FROM auth.users u WHERE u.email = 'demo.student2@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000003', u.id, 'c0000000-0000-0000-0000-000000000003', 'interview_scheduled', 85
FROM auth.users u WHERE u.email = 'demo.student3@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000004', u.id, 'c0000000-0000-0000-0000-000000000004', 'offered', 85
FROM auth.users u WHERE u.email = 'demo.student4@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000005', u.id, 'c0000000-0000-0000-0000-000000000005', 'rejected', 85
FROM auth.users u WHERE u.email = 'demo.student5@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000006', u.id, 'c0000000-0000-0000-0000-000000000006', 'applied', 85
FROM auth.users u WHERE u.email = 'demo.student6@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000007', u.id, 'c0000000-0000-0000-0000-000000000007', 'shortlisted', 85
FROM auth.users u WHERE u.email = 'demo.student7@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000008', u.id, 'c0000000-0000-0000-0000-000000000008', 'interview_scheduled', 85
FROM auth.users u WHERE u.email = 'demo.student8@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000009', u.id, 'c0000000-0000-0000-0000-000000000009', 'offered', 85
FROM auth.users u WHERE u.email = 'demo.student9@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000010', u.id, 'c0000000-0000-0000-0000-000000000010', 'rejected', 85
FROM auth.users u WHERE u.email = 'demo.student10@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000011', u.id, 'c0000000-0000-0000-0000-000000000011', 'applied', 85
FROM auth.users u WHERE u.email = 'demo.student11@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000012', u.id, 'c0000000-0000-0000-0000-000000000012', 'shortlisted', 85
FROM auth.users u WHERE u.email = 'demo.student12@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000013', u.id, 'c0000000-0000-0000-0000-000000000013', 'interview_scheduled', 85
FROM auth.users u WHERE u.email = 'demo.student13@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000014', u.id, 'c0000000-0000-0000-0000-000000000014', 'offered', 85
FROM auth.users u WHERE u.email = 'demo.student14@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000015', u.id, 'c0000000-0000-0000-0000-000000000015', 'rejected', 85
FROM auth.users u WHERE u.email = 'demo.student15@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000016', u.id, 'c0000000-0000-0000-0000-000000000016', 'applied', 85
FROM auth.users u WHERE u.email = 'demo.student1@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000017', u.id, 'c0000000-0000-0000-0000-000000000017', 'shortlisted', 85
FROM auth.users u WHERE u.email = 'demo.student2@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000018', u.id, 'c0000000-0000-0000-0000-000000000018', 'interview_scheduled', 85
FROM auth.users u WHERE u.email = 'demo.student3@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000019', u.id, 'c0000000-0000-0000-0000-000000000019', 'offered', 85
FROM auth.users u WHERE u.email = 'demo.student4@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000020', u.id, 'c0000000-0000-0000-0000-000000000020', 'rejected', 85
FROM auth.users u WHERE u.email = 'demo.student5@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000021', u.id, 'c0000000-0000-0000-0000-000000000001', 'applied', 85
FROM auth.users u WHERE u.email = 'demo.student6@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000022', u.id, 'c0000000-0000-0000-0000-000000000002', 'shortlisted', 85
FROM auth.users u WHERE u.email = 'demo.student7@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000023', u.id, 'c0000000-0000-0000-0000-000000000003', 'interview_scheduled', 85
FROM auth.users u WHERE u.email = 'demo.student8@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000024', u.id, 'c0000000-0000-0000-0000-000000000004', 'offered', 85
FROM auth.users u WHERE u.email = 'demo.student9@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000025', u.id, 'c0000000-0000-0000-0000-000000000005', 'rejected', 85
FROM auth.users u WHERE u.email = 'demo.student10@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000026', u.id, 'c0000000-0000-0000-0000-000000000006', 'applied', 85
FROM auth.users u WHERE u.email = 'demo.student11@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000027', u.id, 'c0000000-0000-0000-0000-000000000007', 'shortlisted', 85
FROM auth.users u WHERE u.email = 'demo.student12@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000028', u.id, 'c0000000-0000-0000-0000-000000000008', 'interview_scheduled', 85
FROM auth.users u WHERE u.email = 'demo.student13@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000029', u.id, 'c0000000-0000-0000-0000-000000000009', 'offered', 85
FROM auth.users u WHERE u.email = 'demo.student14@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000030', u.id, 'c0000000-0000-0000-0000-000000000010', 'rejected', 85
FROM auth.users u WHERE u.email = 'demo.student15@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000031', u.id, 'c0000000-0000-0000-0000-000000000011', 'applied', 85
FROM auth.users u WHERE u.email = 'demo.student1@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000032', u.id, 'c0000000-0000-0000-0000-000000000012', 'shortlisted', 85
FROM auth.users u WHERE u.email = 'demo.student2@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000033', u.id, 'c0000000-0000-0000-0000-000000000013', 'interview_scheduled', 85
FROM auth.users u WHERE u.email = 'demo.student3@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000034', u.id, 'c0000000-0000-0000-0000-000000000014', 'offered', 85
FROM auth.users u WHERE u.email = 'demo.student4@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000035', u.id, 'c0000000-0000-0000-0000-000000000015', 'rejected', 85
FROM auth.users u WHERE u.email = 'demo.student5@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000036', u.id, 'c0000000-0000-0000-0000-000000000016', 'applied', 85
FROM auth.users u WHERE u.email = 'demo.student6@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000037', u.id, 'c0000000-0000-0000-0000-000000000017', 'shortlisted', 85
FROM auth.users u WHERE u.email = 'demo.student7@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000038', u.id, 'c0000000-0000-0000-0000-000000000018', 'interview_scheduled', 85
FROM auth.users u WHERE u.email = 'demo.student8@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000039', u.id, 'c0000000-0000-0000-0000-000000000019', 'offered', 85
FROM auth.users u WHERE u.email = 'demo.student9@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000040', u.id, 'c0000000-0000-0000-0000-000000000020', 'rejected', 85
FROM auth.users u WHERE u.email = 'demo.student10@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000041', u.id, 'c0000000-0000-0000-0000-000000000001', 'applied', 85
FROM auth.users u WHERE u.email = 'demo.student11@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000042', u.id, 'c0000000-0000-0000-0000-000000000002', 'shortlisted', 85
FROM auth.users u WHERE u.email = 'demo.student12@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000043', u.id, 'c0000000-0000-0000-0000-000000000003', 'interview_scheduled', 85
FROM auth.users u WHERE u.email = 'demo.student13@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000044', u.id, 'c0000000-0000-0000-0000-000000000004', 'offered', 85
FROM auth.users u WHERE u.email = 'demo.student14@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000045', u.id, 'c0000000-0000-0000-0000-000000000005', 'rejected', 85
FROM auth.users u WHERE u.email = 'demo.student15@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000046', u.id, 'c0000000-0000-0000-0000-000000000006', 'applied', 85
FROM auth.users u WHERE u.email = 'demo.student1@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000047', u.id, 'c0000000-0000-0000-0000-000000000007', 'shortlisted', 85
FROM auth.users u WHERE u.email = 'demo.student2@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000048', u.id, 'c0000000-0000-0000-0000-000000000008', 'interview_scheduled', 85
FROM auth.users u WHERE u.email = 'demo.student3@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000049', u.id, 'c0000000-0000-0000-0000-000000000009', 'offered', 85
FROM auth.users u WHERE u.email = 'demo.student4@example.com'
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.applications (id, student_id, opportunity_id, status, match_percentage)
SELECT 'a0000000-0000-0000-0000-000000000050', u.id, 'c0000000-0000-0000-0000-000000000010', 'rejected', 85
FROM auth.users u WHERE u.email = 'demo.student5@example.com'
ON CONFLICT (id) DO NOTHING;

