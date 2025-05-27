
import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';
import { useToast } from './use-toast';

// Define the context type
type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Effect to handle auth state changes
  useEffect(() => {
    const setupAuth = async () => {
      try {
        console.log('Setting up auth listener');
        
        // Get initial session
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Error getting session:', sessionError);
          setIsLoading(false);
          return;
        }
        
        if (initialSession) {
          console.log('Initial session found:', initialSession);
          setSession(initialSession);
          setUser(initialSession.user);
        }
        
        // Set up listener for auth changes
        const { data: { subscription } } = await supabase.auth.onAuthStateChange(
          (event, currentSession) => {
            console.log('Auth state change event:', event);
            setSession(currentSession);
            setUser(currentSession?.user ?? null);
            
            if (event === 'SIGNED_IN') {
              console.log('User signed in:', currentSession?.user);
              
              // If signing in from login page, redirect to home
              if (location.pathname === '/login') {
                navigate('/');
              }
              
              toast({
                title: "Signed in successfully",
                description: "Welcome back!",
              });
            }
            
            if (event === 'SIGNED_OUT') {
              console.log('User signed out');
              toast({
                title: "Signed out",
                description: "You have been signed out successfully.",
              });
              
              // Redirect to home page after sign out
              if (location.pathname === '/profile' || location.pathname === '/api-vault') {
                navigate('/');
              }
            }
          }
        );
        
        setIsLoading(false);
        
        // Cleanup function
        return () => {
          console.log('Cleaning up auth listener');
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error in auth setup:', error);
        setIsLoading(false);
      }
    };
    
    setupAuth();
  }, [navigate, location.pathname, toast]);

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      console.log('Starting Google sign-in flow');
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/login`,
        },
      });
      
      if (error) {
        console.error('Google sign-in error:', error);
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      console.log('Redirecting to Google auth URL:', data);
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      toast({
        title: "Sign in failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in with GitHub
  const signInWithGithub = async () => {
    try {
      setIsLoading(true);
      console.log('Starting GitHub sign-in flow');
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/login`,
        },
      });
      
      if (error) {
        console.error('GitHub sign-in error:', error);
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      console.log('Redirecting to GitHub auth URL:', data);
    } catch (error) {
      console.error('Error during GitHub sign-in:', error);
      toast({
        title: "Sign in failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setIsLoading(true);
      console.log('Signing out user');
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        toast({
          title: "Sign out failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      // User is signed out automatically by the onAuthStateChange listener
    } catch (error) {
      console.error('Error during sign out:', error);
      toast({
        title: "Sign out failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Provide the auth context to children
  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signInWithGoogle,
        signInWithGithub,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
