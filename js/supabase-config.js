import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your actual Supabase configuration
// 1. Go to app.supabase.com and create a project
// 2. Go to Project Settings -> API
// 3. Copy the URL and the anon public key
const supabaseUrl = 'https://zyiddtifkamhxguanriu.supabase.co';
const supabaseAnonKey = 'sb_publishable_5hKtHa_4f7PtmPPemzGT5A_C2zOYkc6';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log("Supabase initialized (using placeholder config).");

export { supabase };
