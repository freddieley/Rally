import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase, normalizeIdentifier } from './supabase';

export type Profile = {
  id: string;
  username: string;
  display_name: string;
  email_added: boolean | null;
  recovery_email: string | null;
  created_at: string;
  updated_at: string;
};

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (identifier: string, password: string) => Promise<void>;
  signUp: (username: string, displayName: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<Profile | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function loadProfile(userId: string) {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
  if (error) throw error;
  return data as Profile;
}

async function readEdgeError(response: Response) {
  try {
    const body = await response.json();
    return body.error || 'Request failed (' + response.status + ').';
  } catch {
    return 'Request failed (' + response.status + ').';
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    if (!session?.user) {
      setProfile(null);
      return null;
    }
    const next = await loadProfile(session.user.id);
    setProfile(next);
    return next;
  };

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(async ({ data: { session: current } }) => {
      if (!mounted) return;
      setSession(current);
      if (current?.user) {
        try { setProfile(await loadProfile(current.user.id)); } catch { setProfile(null); }
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, next) => {
      setSession(next);
      if (event === 'SIGNED_OUT' || !next) setProfile(null);
      else if (next.user) loadProfile(next.user.id).then(setProfile).catch(() => setProfile(null));
    });

    return () => { mounted = false; subscription.unsubscribe(); };
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    session,
    user: session?.user ?? null,
    profile,
    loading,
    signIn: async (identifier, password) => {
      const { error } = await supabase.auth.signInWithPassword({ email: normalizeIdentifier(identifier), password });
      if (error) throw error;
    },
    signUp: async (username, displayName, password) => {
      const response = await fetch(process.env.EXPO_PUBLIC_SUPABASE_URL + '/functions/v1/username-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, displayName, password }),
      });
      if (!response.ok) throw new Error(await readEdgeError(response));
      const { error } = await supabase.auth.signInWithPassword({ email: normalizeIdentifier(username), password });
      if (error) throw error;
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    refreshProfile,
  }), [session, profile, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
