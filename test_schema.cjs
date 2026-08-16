const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function run() {
  const { error } = await supabase.from('skills').delete().eq('name', 'TestSkill');
  console.log("Cleanup:", error ? error.message : "Success");
}
run();
