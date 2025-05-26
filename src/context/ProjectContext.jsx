import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { getProjects } from '../firebase/projectService';

// Crear contexto
const ProjectContext = createContext();

// Proveedor del contexto
export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache
  
  // Memoized featured projects
  const featuredProjects = useMemo(() => {
    return projects.filter(project => project.featured);
  }, [projects]);
  
  // Memoized categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(projects.map(project => project.category))];
    return ['all', ...uniqueCategories];
  }, [projects]);
  
  // Load projects with caching
  const loadProjects = useCallback(async (force = false) => {
    // Check cache validity
    if (!force && lastFetch && Date.now() - lastFetch < CACHE_DURATION) {
      return;
    }
    
    try {
      setLoading(true);
      
      // Check sessionStorage cache first
      const cachedData = sessionStorage.getItem('projectsCache');
      const cachedTime = sessionStorage.getItem('projectsCacheTime');
      
      if (!force && cachedData && cachedTime) {
        const cacheAge = Date.now() - parseInt(cachedTime);
        if (cacheAge < CACHE_DURATION) {
          setProjects(JSON.parse(cachedData));
          setLastFetch(parseInt(cachedTime));
          setLoading(false);
          return;
        }
      }
      
      // Fetch fresh data
      const data = await getProjects();
      setProjects(data);
      setLastFetch(Date.now());
      
      // Update cache
      sessionStorage.setItem('projectsCache', JSON.stringify(data));
      sessionStorage.setItem('projectsCacheTime', Date.now().toString());
      
      setError(null);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError('No se pudieron cargar los proyectos. Por favor, intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  }, [lastFetch]);
  
  // Initial load
  useEffect(() => {
    loadProjects();
  }, []);
  
  // Force refresh projects
  const refreshProjects = useCallback(async () => {
    await loadProjects(true);
  }, [loadProjects]);
  
  // Memoized filter function
  const filterProjectsByCategory = useCallback((category) => {
    if (category === 'all') {
      return projects;
    }
    
    return projects.filter(project => project.category === category);
  }, [projects]);
  
  // Memoized context value
  const value = useMemo(() => ({
    projects,
    featuredProjects,
    categories,
    loading,
    error,
    refreshProjects,
    filterProjectsByCategory
  }), [projects, featuredProjects, categories, loading, error, refreshProjects, filterProjectsByCategory]);
  
  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useProjects = () => useContext(ProjectContext);