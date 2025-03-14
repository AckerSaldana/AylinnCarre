import React, { createContext, useState, useContext, useEffect } from 'react';
import { getProjects } from '../firebase/projectService';

// Crear contexto
const ProjectContext = createContext();

// Proveedor del contexto
export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Cargar proyectos al iniciar
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data);
        
        // Extraer proyectos destacados
        const featured = data.filter(project => project.featured);
        setFeaturedProjects(featured);
        
        // Extraer categorías únicas
        const uniqueCategories = [...new Set(data.map(project => project.category))];
        setCategories(['all', ...uniqueCategories]);
        
        setError(null);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError('No se pudieron cargar los proyectos. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };
    
    loadProjects();
  }, []);
  
  // Recargar proyectos (útil después de actualizaciones)
  const refreshProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
      
      const featured = data.filter(project => project.featured);
      setFeaturedProjects(featured);
      
      const uniqueCategories = [...new Set(data.map(project => project.category))];
      setCategories(['all', ...uniqueCategories]);
      
      setError(null);
    } catch (err) {
      console.error('Error refreshing projects:', err);
      setError('No se pudieron recargar los proyectos. Por favor, intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };
  
  // Filtrar proyectos por categoría
  const filterProjectsByCategory = (category) => {
    if (category === 'all') {
      return projects;
    }
    
    return projects.filter(project => project.category === category);
  };
  
  return (
    <ProjectContext.Provider 
      value={{
        projects,
        featuredProjects,
        categories,
        loading,
        error,
        refreshProjects,
        filterProjectsByCategory
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useProjects = () => useContext(ProjectContext);