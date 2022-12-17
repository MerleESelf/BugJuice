import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vuhrewpoefmkbcwcrfra.supabase.co";
const SUPABASE_PUBLIC_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1aHJld3BvZWZta2Jjd2NyZnJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ1NTIwOTAsImV4cCI6MTk4MDEyODA5MH0.PntSzOix0UD9qigz6pseM81kWcH9_t7kaL9MwuXKM_8";

export const supabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLIC_ANON_KEY,
  { autoRefreshToken: false }
);
