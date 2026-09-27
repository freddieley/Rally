import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) throw new Error('Missing Supabase environment variables.');

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { storage: AsyncStorage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: false },
});

export const AUTH_DOMAIN = 'tucasa-phi.vercel.app';

export function usernameEmail(username: string) {
  return username.trim().toLowerCase() + '@' + AUTH_DOMAIN;
}

export function normalizeIdentifier(identifier: string) {
  const value = identifier.trim().toLowerCase();
  return value.includes('@') ? value : usernameEmail(value);
}
