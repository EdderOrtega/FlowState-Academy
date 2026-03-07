import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext(null);

/**
 * AuthProvider — wraps the app to provide auth state globally.
 * Listens to Supabase auth changes and hydrates a `profiles` row.
 * Gracefully handles the case where Supabase is not configured.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile row for a given user id
  const fetchProfile = async (userId) => {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.warn('[useAuth] Profile fetch error:', error.message);
        return null;
      }
      return data;
    } catch (err) {
      console.warn('[useAuth] Unexpected error:', err);
      return null;
    }
  };

  useEffect(() => {
    // If Supabase is not configured, skip auth entirely
    if (!supabase) {
      setLoading(false);
      return;
    }

    // 1. Get initial session
    const initSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const profileData = await fetchProfile(currentUser.id);
        setProfile(profileData);
      }
      setLoading(false);
    };

    initSession();

    // 2. Listen for auth changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          const profileData = await fetchProfile(currentUser.id);
          setProfile(profileData);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setProfile(null);
  };

  // Re-fetch profile data (e.g. after onboarding completes)
  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user.id);
      setProfile(profileData);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth — custom hook to access auth state anywhere in the tree.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an <AuthProvider>');
  }
  return context;
}
