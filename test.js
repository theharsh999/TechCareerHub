import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://wutlinppvmvlshobhjlw.supabase.co', 'sb_publishable_FnCmjPXwoDQgjJx7Zjq9mg_2m0xPtWV');

async function test() {
  const { data, error } = await supabase.from('profiles').select('*').limit(5);
  console.log("Profiles:", data);
  console.log("Error:", error);
}
test();
