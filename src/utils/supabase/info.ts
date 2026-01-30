// Supabase configuration
// Replace these with your actual Supabase project credentials
export const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID || 'your-project-id';
export const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return projectId && projectId !== 'your-project-id' && publicAnonKey && publicAnonKey !== 'your-anon-key';
};