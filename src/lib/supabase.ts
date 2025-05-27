
import { createClient } from '@supabase/supabase-js';

// These env variables must be set in your deployment environment
const supabaseUrl = 'https://bohwhykdtlepssygofew.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvaHdoeWtkdGxlcHNzeWdvZmV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NDg0NDIsImV4cCI6MjA1NzAyNDQ0Mn0.YSZCNvivA2z76-P17--oxW93aKPjqUfhhqLevWoHj0k';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anon Key.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Debug log to verify initialization
console.log('Supabase client initialized with URL:', supabaseUrl);
