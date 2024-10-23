import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://trkbnxkkegwrhnboidwi.supabase.co'
const supabaseKey = process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRya2JueGtrZWd3cmhuYm9pZHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0MDE4MzQsImV4cCI6MjA0NDk3NzgzNH0.wlFGKI03di0llAcuqUtTC5YUDt_pt05o_VySxECj2F0
const supabase = createClient(supabaseUrl, supabaseKey)