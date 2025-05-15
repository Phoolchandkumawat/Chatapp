// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import Appconf from './Appconf';

// Replace these with your Supabase project URL and public API key
const supabaseUrl = Appconf.supabaseUrl
const supabaseAnonKey = Appconf.supabaseAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);