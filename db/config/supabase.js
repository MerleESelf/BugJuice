import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://vuhrewpoefmkbcwcrfra.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1aHJld3BvZWZta2Jjd2NyZnJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ1NTIwOTAsImV4cCI6MTk4MDEyODA5MH0.PntSzOix0UD9qigz6pseM81kWcH9_t7kaL9MwuXKM_8')


// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// export const supabase = createClient(supabaseUrl, supabaseAnonKey)