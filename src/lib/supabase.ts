import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('[Supabase] VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
