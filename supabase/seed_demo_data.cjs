const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const crypto = require('crypto');

// Load .env
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("ERROR: Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  console.error("Please add SUPABASE_SERVICE_ROLE_KEY to your local .env file. Do NOT commit it!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const DEMO_PASSWORD = "Demo@Password123!";

async function runSeed() {
  console.log("🚀 Starting TechCareerHub Demo Seeding...");

  // --- 1. AUTH USERS ---
  const usersToCreate = [];
  
  // Students
  for (let i = 1; i <= 15; i++) {
    usersToCreate.push({ email: `demo.student${i}@example.com`, role: 'student', name: `Demo Student ${i}` });
  }
  // Companies
  for (let i = 1; i <= 7; i++) {
    usersToCreate.push({ email: `demo.company${i}@example.com`, role: 'company', name: `Demo Company ${i}` });
  }
  // TPOs
  for (let i = 1; i <= 2; i++) {
    usersToCreate.push({ email: `demo.tpo${i}@example.com`, role: 'tpo', name: `Demo TPO ${i}` });
  }

  const authUserIds = {}; // email -> uuid

  console.log(`\n👤 Processing ${usersToCreate.length} Auth Users...`);
  for (const user of usersToCreate) {
    // Check if user exists
    let { data: existingUser, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) throw new Error(`Failed to list users: ${listError.message}`);

    let found = existingUser.users.find(u => u.email === user.email);

    let uid;
    if (found) {
      uid = found.id;
    } else {
      const { data, error } = await supabase.auth.admin.createUser({
        email: user.email,
        password: DEMO_PASSWORD,
        email_confirm: true,
        user_metadata: { role: user.role, full_name: user.name }
      });
      if (error) {
        throw new Error(`Failed to create ${user.email}: ${error.message}`);
      }
      uid = data.user.id;
    }
    authUserIds[user.email] = uid;

    // Force role and name in profiles (overwriting trigger defaults to ensure correctness)
    const { error: profileError } = await supabase.from('profiles').upsert({
      id: uid,
      email: user.email,
      full_name: user.name,
      role: user.role
    }, { onConflict: 'id' });
    
    if (profileError) throw new Error(`Failed to upsert profile for ${user.email}: ${profileError.message}`);
  }

  // --- 2. STUDENTS ---
  console.log("🎓 Upserting Students...");
  const branches = ["Computer Science", "Information Technology", "AI & Data Science", "Electronics & Telecommunication"];
  const locations = ["Mumbai, MH", "Pune, MH", "Bangalore, KA", "Hyderabad, TS", "Remote"];
  
  for (let i = 1; i <= 15; i++) {
    const email = `demo.student${i}@example.com`;
    const uid = authUserIds[email];
    if (!uid) continue;

    const { error: studentError } = await supabase.from('students').upsert({
      id: uid,
      roll_no: `100${i}`,
      branch: branches[i % branches.length],
      academic_year: i % 3 === 0 ? "4th Year" : "3rd Year",
      cgpa: parseFloat((7.5 + (i * 0.15)).toFixed(2)),
      location: locations[i % locations.length],
      bio: `Highly motivated engineering student passionate about building scalable solutions. Looking for exciting opportunities in the tech industry.`,
      resume_url: null
    }, { onConflict: 'id' });

    if (studentError) throw new Error(`Failed to upsert student ${email}: ${studentError.message}`);
  }

  // --- 3. COMPANIES ---
  console.log("🏢 Upserting Companies...");
  const companyData = [
    { name: "TechNova Solutions", industry: "IT Services", loc: "Mumbai, MH", site: "https://technova.demo" },
    { name: "CloudScale Innovations", industry: "Cloud Computing", loc: "Bangalore, KA", site: "https://cloudscale.demo" },
    { name: "DataStack AI", industry: "Artificial Intelligence", loc: "Hyderabad, TS", site: "https://datastack.demo" },
    { name: "FinTech Dynamics", industry: "Finance Technology", loc: "Pune, MH", site: "https://fintech.demo" },
    { name: "EduSmart Global", industry: "EdTech", loc: "Delhi, DL", site: "https://edusmart.demo" },
    { name: "CyberSecure Networks", industry: "Cybersecurity", loc: "Chennai, TN", site: "https://cybersecure.demo" },
    { name: "NextGen Robotics", industry: "Robotics & Hardware", loc: "Ahmedabad, GJ", site: "https://nextgen.demo" }
  ];

  const companyDbIds = {}; // email -> company table ID

  for (let i = 1; i <= 7; i++) {
    const email = `demo.company${i}@example.com`;
    const uid = authUserIds[email];
    if (!uid) continue;

    const data = companyData[i - 1];

    // Safe lookup without relying on unique constraint for profile_id
    const { data: existingCompany, error: findErr } = await supabase.from('companies').select('id').eq('profile_id', uid).limit(1);
    if (findErr) throw new Error(`Failed to check existing company for ${email}: ${findErr.message}`);

    let dbCompanyId;
    if (existingCompany && existingCompany.length > 0) {
      dbCompanyId = existingCompany[0].id;
      // Optional: Update the existing company if needed
      const { error: updateErr } = await supabase.from('companies').update({
        company_name: data.name,
        industry: data.industry,
        location: data.loc,
        website: data.site,
        about: `Leading the industry in ${data.industry} with innovative solutions and cutting-edge technology.`
      }).eq('id', dbCompanyId);
      if (updateErr) throw new Error(`Failed to update company ${email}: ${updateErr.message}`);
    } else {
      const { data: inserted, error: insertErr } = await supabase.from('companies').insert({
        id: uid,
        profile_id: uid,
        company_name: data.name,
        industry: data.industry,
        location: data.loc,
        website: data.site,
        about: `Leading the industry in ${data.industry} with innovative solutions and cutting-edge technology.`
      }).select('id').single();
      if (insertErr) throw new Error(`Failed to insert company ${email}: ${insertErr.message}`);
      dbCompanyId = inserted.id;
    }
    
    companyDbIds[email] = dbCompanyId;
  }

  // --- 4. OPPORTUNITIES ---
  console.log("💼 Upserting Opportunities...");
  const oppTypes = ['job', 'internship'];
  const oppModes = ['remote', 'hybrid', 'onsite'];
  const opportunityIds = [];

  for (let i = 1; i <= 7; i++) {
    const email = `demo.company${i}@example.com`;
    const cId = companyDbIds[email];
    if (!cId) continue;

    for (let j = 1; j <= 3; j++) {
      const type = oppTypes[(i + j) % 2];
      const mode = oppModes[(i + j) % 3];
      
      const title = type === 'job' 
        ? `Software Engineer - Level ${j}` 
        : `Summer Intern 2026 - Track ${j}`;

      const { data: existing, error: findOppErr } = await supabase.from('opportunities').select('id').eq('company_id', cId).eq('title', title).limit(1);
      if (findOppErr) throw new Error(`Failed to check opportunity ${title}: ${findOppErr.message}`);
      
      if (existing && existing.length > 0) {
        opportunityIds.push(existing[0].id);
      } else {
        const { data: opp, error: insertOppErr } = await supabase.from('opportunities').insert({
          company_id: cId,
          title: title,
          type: type,
          location: companyData[i-1].loc,
          mode: mode,
          minimum_cgpa: 7.0 + (j * 0.5),
          required_skills: ["React", "Node.js", "Python"],
          application_deadline: `2026-12-${10 + j}T23:59:59Z`,
          stipend: type === 'job' ? `₹${10 + j} LPA` : `₹${20 + j * 5},000/month`,
          status: 'Open'
        }).select('id').single();

        if (insertOppErr) throw new Error(`Error inserting opportunity ${title}: ${insertOppErr.message}`);
        if (opp) opportunityIds.push(opp.id);
      }
    }
  }

  // --- 5. APPLICATIONS ---
  console.log("📄 Upserting Applications...");
  const statuses = ['applied', 'shortlisted', 'interview_scheduled', 'offered', 'rejected'];
  let appCount = 0;

  for (let i = 0; i < 50; i++) {
    const studentEmail = `demo.student${(i % 15) + 1}@example.com`;
    const sId = authUserIds[studentEmail];
    const oId = opportunityIds[i % opportunityIds.length];

    if (!sId || !oId) continue;

    const { data: existing, error: findAppErr } = await supabase.from('applications').select('id').eq('student_id', sId).eq('opportunity_id', oId).limit(1);
    if (findAppErr) throw new Error(`Failed to check application: ${findAppErr.message}`);

    if (!existing || existing.length === 0) {
      const { error: insertAppErr } = await supabase.from('applications').insert({
        student_id: sId,
        opportunity_id: oId,
        status: statuses[i % 5],
        match_percentage: 60 + (i % 40)
      });
      if (insertAppErr) throw new Error(`Failed to insert application: ${insertAppErr.message}`);
      appCount++;
    }
  }

  // --- 6. SKILLS & STUDENT SKILLS ---
  console.log("🛠 Upserting Skills...");
  const baseSkills = [
    { name: 'React', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python', category: 'Language' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'AWS', category: 'Cloud' }
  ];

  const skillIds = [];
  for (const sk of baseSkills) {
    const { data: existingSkill, error: checkSkillErr } = await supabase.from('skills').select('id').eq('name', sk.name).limit(1);
    if (checkSkillErr) throw new Error(`Failed to check skill ${sk.name}: ${checkSkillErr.message}`);

    if (existingSkill && existingSkill.length > 0) {
      skillIds.push(existingSkill[0].id);
    } else {
      const { data, error: insertSkillErr } = await supabase.from('skills').insert(sk).select('id').single();
      if (insertSkillErr) throw new Error(`Failed to insert skill ${sk.name}: ${insertSkillErr.message}`);
      skillIds.push(data.id);
    }
  }

  if (skillIds.length > 0) {
    for (let i = 1; i <= 15; i++) {
      const email = `demo.student${i}@example.com`;
      const sId = authUserIds[email];
      if (!sId) continue;

      for (let j = 0; j < 3; j++) {
        const skillId = skillIds[(i + j) % skillIds.length];
        const { data: existing, error: checkSS } = await supabase.from('student_skills').select('student_id').eq('student_id', sId).eq('skill_id', skillId).limit(1);
        if (checkSS) throw new Error(`Failed to check student_skill: ${checkSS.message}`);
        
        if (!existing || existing.length === 0) {
          const { error: insertSS } = await supabase.from('student_skills').insert({
            student_id: sId,
            skill_id: skillId,
            proficiency: (i % 3) === 0 ? 'advanced' : 'intermediate'
          });
          if (insertSS) throw new Error(`Failed to insert student skill: ${insertSS.message}`);
        }
      }
    }
  }

  // --- 7. NOTIFICATIONS ---
  console.log("🔔 Upserting TPO Notifications...");
  for (let i = 1; i <= 2; i++) {
    const tpoEmail = `demo.tpo${i}@example.com`;
    const tpoId = authUserIds[tpoEmail];
    if (!tpoId) continue;

    const { data: existing, error: checkNotif } = await supabase.from('notifications').select('id').eq('recipient_id', tpoId).limit(1);
    if (checkNotif) throw new Error(`Failed to check notifications: ${checkNotif.message}`);
    
    if (existing && existing.length > 0) continue;

    for (let j = 1; j <= 5; j++) {
      const { error: insertNotif } = await supabase.from('notifications').insert({
        recipient_id: tpoId,
        type: 'system',
        title: `Demo Alert ${j}`,
        message: `System notification ${j} regarding recent platform activity.`,
        read: j % 2 === 0,
        priority: j % 3 === 0 ? 'high' : 'normal'
      });
      if (insertNotif) throw new Error(`Failed to insert notification: ${insertNotif.message}`);
    }
  }

  // --- VALIDATION COUNTS ---
  console.log("\n✅ SEEDING COMPLETE. Validating Database Counts...");
  
  // Helper for safe count querying
  async function safeCount(table, filters = {}) {
    let query = supabase.from(table).select('*', { count: 'exact', head: true });
    for (const [key, value] of Object.entries(filters)) {
      query = query.eq(key, value);
    }
    const { count, error } = await query;
    if (error) throw new Error(`Count error on ${table}: ${error.message}`);
    return count;
  }

  const studentProfiles = await safeCount('profiles', { role: 'student' });
  const companyProfiles = await safeCount('profiles', { role: 'company' });
  const tpoProfiles = await safeCount('profiles', { role: 'tpo' });
  const students = await safeCount('students');
  const companies = await safeCount('companies');
  const opps = await safeCount('opportunities');
  const apps = await safeCount('applications');
  const stuSkills = await safeCount('student_skills');
  const notifs = await safeCount('notifications');

  console.log(`\n📊 FINAL COUNTS:`);
  console.log(`- Profiles (Students): ${studentProfiles}`);
  console.log(`- Profiles (Companies): ${companyProfiles}`);
  console.log(`- Profiles (TPOs): ${tpoProfiles}`);
  console.log(`- Students Table: ${students}`);
  console.log(`- Companies Table: ${companies}`);
  console.log(`- Opportunities Table: ${opps}`);
  console.log(`- Applications Table: ${apps}`);
  console.log(`- Student Skills Table: ${stuSkills}`);
  console.log(`- Notifications Table: ${notifs}`);
  
  console.log("\n✨ Demo data seeded perfectly! You may now safely start the app.");
}

runSeed().catch(err => {
  console.error("\n❌ FATAL ERROR DURING SEEDING:");
  console.error(err.message);
  process.exit(1);
});
