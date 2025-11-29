
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// TODO: Replace these with your actual Supabase project URL and Anon Key
// Your Project URL is likely: https://mckqnzinfnnsduhzlaht.supabase.co
// You can find this in Settings > API > Project URL
const supabaseUrl = 'https://mckqnzinfnnsduhzlaht.supabase.co'

// Use the "anon" / "public" key here. It usually starts with "eyJ..."
// Find it in Settings > API > Project API keys
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ja3FuemluZm5uc2R1aHpsYWh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MjQ0NjAsImV4cCI6MjA4MDAwMDQ2MH0._2zA3DBTNJBXT3LErJk1ZgHKQoT220CGwKN0xdJA9ew'

export const supabase = createClient(supabaseUrl, supabaseKey)
