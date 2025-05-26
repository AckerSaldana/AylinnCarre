import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { getProfile } from '../firebase/profileService';

// Create context
const ProfileContext = createContext();

// Profile Provider
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);
  const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes cache for profile
  
  // Load profile with caching
  const loadProfile = useCallback(async (force = false) => {
    // Check cache validity
    if (!force && lastFetch && Date.now() - lastFetch < CACHE_DURATION) {
      return;
    }
    
    try {
      setLoading(true);
      
      // Check sessionStorage cache first
      const cachedData = sessionStorage.getItem('profileCache');
      const cachedTime = sessionStorage.getItem('profileCacheTime');
      
      if (!force && cachedData && cachedTime) {
        const cacheAge = Date.now() - parseInt(cachedTime);
        if (cacheAge < CACHE_DURATION) {
          setProfile(JSON.parse(cachedData));
          setLastFetch(parseInt(cachedTime));
          setLoading(false);
          return;
        }
      }
      
      // Fetch fresh data
      const data = await getProfile();
      setProfile(data);
      setLastFetch(Date.now());
      
      // Update cache
      if (data) {
        sessionStorage.setItem('profileCache', JSON.stringify(data));
        sessionStorage.setItem('profileCacheTime', Date.now().toString());
      }
      
      setError(null);
    } catch (err) {
      console.error('Error loading profile:', err);
      setError('No se pudo cargar el perfil.');
    } finally {
      setLoading(false);
    }
  }, [lastFetch]);
  
  // Initial load
  useEffect(() => {
    loadProfile();
  }, []);
  
  // Force refresh profile
  const refreshProfile = useCallback(async () => {
    await loadProfile(true);
  }, [loadProfile]);
  
  // Memoized context value
  const value = useMemo(() => ({
    profile,
    loading,
    error,
    refreshProfile
  }), [profile, loading, error, refreshProfile]);
  
  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook to use profile context
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};