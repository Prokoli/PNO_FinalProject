import { createClient } from '@supabase/supabase-js'

const URL = 'https://wappdkonyffnjzbnykcd.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhcHBka29ueWZmbmp6Ym55a2NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNzc4NDksImV4cCI6MjA2OTY1Mzg0OX0.x-Ov5GoXr6N-RhnYg_WmtZmcTZOvEErLSwrzR1yPkOY'

export const supabase = createClient(URL, API_KEY)