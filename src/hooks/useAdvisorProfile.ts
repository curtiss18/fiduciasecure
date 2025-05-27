// Hook for managing advisor profiles
import { useEffect, useState, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase-client';
import type { AdvisorProfile } from '@/types/database.types';

export function useAdvisorProfile() {
  const [profile, setProfile] = useState<AdvisorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = useMemo(() => createClient(), []);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      
      // Try the new table name first, fallback to old name during migration
      let { data, error } = await supabase
        .from('representatives')
        .select('*')
        .single();
        
      // If representatives table doesn't exist yet, try the old table name
      if (error && error.message.includes('relation "public.representatives" does not exist')) {
        const fallback = await supabase
          .from('advisor_profiles')
          .select('*')
          .single();
        data = fallback.data;
        error = fallback.error;
      }

      if (error) throw error;
      
      // Temporary compatibility: handle both old and new column names
      if (data && !data.registration_states && 'registration_state' in data) {
        const legacyData = data as AdvisorProfile & { registration_state?: string };
        if (legacyData.registration_state) {
          data.registration_states = [legacyData.registration_state];
        }
      }
      
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (updates: Partial<AdvisorProfile>) => {
    try {
      // Try the new table name first, fallback to old name during migration
      let { data, error } = await supabase
        .from('representatives')
        .update(updates)
        .eq('id', profile?.id)
        .select()
        .single();
        
      // If representatives table doesn't exist yet, try the old table name
      if (error && error.message.includes('relation "public.representatives" does not exist')) {
        const fallback = await supabase
          .from('advisor_profiles')
          .update(updates)
          .eq('id', profile?.id)
          .select()
          .single();
        data = fallback.data;
        error = fallback.error;
      }

      if (error) throw error;
      setProfile(data);
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    refetch: fetchProfile
  };
}