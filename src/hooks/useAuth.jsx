import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, setState] = useState({
    user: null,
    profile: null,
    loading: true,
  });

  // Fetch profile with a strict 5-second timeout so it NEVER hangs the app
  const fetchProfile = async (userId) => {
    if (!supabase) return null;

    const fetchPromise = supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          // PGRST116 means row not found, which is normal for new users
          if (error.code !== 'PGRST116') {
            console.warn('[useAuth] Profile fetch error:', error.message);
          }
          return null; // Don't throw, just return null profile
        }
        return data;
      })
      .catch((err) => {
        console.warn('[useAuth] Unexpected fetchProfile error:', err);
        return null;
      });

    const timeoutPromise = new Promise((resolve) =>
      setTimeout(() => {
        console.error('[useAuth] Profile fetch timed out (5s)! Returning null fallback.');
        resolve(null);
      }, 5000)
    );

    return Promise.race([fetchPromise, timeoutPromise]);
  };

  useEffect(() => {
    let mounted = true;

    if (!supabase) {
      setState({ user: null, profile: null, loading: false });
      return;
    }

    const loadSession = async () => {
      try {
        // Enforce a strict 3-second timeout on getSession so the app NEVER hangs on the loading screen
        const sessionPromise = supabase.auth.getSession();
        const sessionTimeoutObj = new Promise((resolve) =>
          setTimeout(() => {
            console.error('[useAuth] getSession timed out (3s)! Proceeding with null session.');
            resolve({ data: { session: null }, error: new Error('Timeout') });
          }, 3000)
        );

        const { data: { session }, error } = await Promise.race([sessionPromise, sessionTimeoutObj]);
        
        if (error) {
          console.warn('[useAuth] getSession error or timeout:', error.message);
        }

        const currentUser = session?.user ?? null;

        if (currentUser) {
          const profileData = await fetchProfile(currentUser.id);
          if (mounted) {
            // Update all states synchronously
            setState({ user: currentUser, profile: profileData, loading: false });
          }
        } else {
          if (mounted) setState({ user: null, profile: null, loading: false });
        }
      } catch (err) {
        console.error('[useAuth] Critical load error:', err);
        if (mounted) setState({ user: null, profile: null, loading: false });
      }
    };

    // 1. Load initial session
    loadSession();

    // 2. Listen to changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        // If the user logs out or session drops
        if (event === 'SIGNED_OUT' || !session?.user) {
          setState({ user: null, profile: null, loading: false });
          return;
        }

        // If the user logs in or token refreshes
        if (session?.user) {
          const profileData = await fetchProfile(session.user.id);
          if (mounted) {
            setState({ user: session.user, profile: profileData, loading: false });
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut();
    setState({ user: null, profile: null, loading: false });
  };

  const refreshProfile = async () => {
    const currentUser = state.user;
    if (!currentUser) return;
    
    // Explicitly do not set loading=true here to avoid flashing the screen
    const profileData = await fetchProfile(currentUser.id);
    setState(prev => ({ ...prev, profile: profileData }));
  };

  const updateProfileLocally = (updates) => {
    setState(prev => ({
      ...prev,
      profile: { ...prev.profile, ...updates }
    }));
  };

  return (
    <AuthContext.Provider value={{ 
      user: state.user, 
      profile: state.profile, 
      loading: state.loading, 
      signOut, 
      refreshProfile,
      updateProfileLocally
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within <AuthProvider>');
  return context;
}
