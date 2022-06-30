/* src/client.js */
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(import.meta.env.VITE_URL_SUPBASE, import.meta.env.VITE_KEY_SUPBASE)

export {supabase}