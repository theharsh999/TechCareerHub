// src/lib/supabase.js
//
// STUB — points at env vars your integration lead will fill in.
// Not called by the mock-data-backed hooks yet; wire it in when
// replacing mock data with real queries.

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
