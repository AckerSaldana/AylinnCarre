// Prefetch utilities for optimizing navigation
import { lazy } from 'react';

// Map of route components for prefetching
const routeComponents = {
  '/': () => import('../pages/Home'),
  '/about': () => import('../pages/About'),
  '/resume': () => import('../pages/Resume'),
  '/contact': () => import('../pages/Contact'),
  '/project': () => import('../pages/ProjectDetail'),
};

// Cache for preloaded components
const preloadedComponents = new Map();

// Prefetch a specific route component
export const prefetchRoute = async (route) => {
  if (preloadedComponents.has(route)) {
    return preloadedComponents.get(route);
  }
  
  const componentLoader = routeComponents[route];
  if (!componentLoader) return null;
  
  try {
    const component = await componentLoader();
    preloadedComponents.set(route, component);
    return component;
  } catch (error) {
    console.error(`Failed to prefetch route ${route}:`, error);
    return null;
  }
};

// Prefetch multiple routes
export const prefetchRoutes = async (routes) => {
  const promises = routes.map(route => prefetchRoute(route));
  await Promise.all(promises);
};

// Prefetch all routes (for aggressive optimization)
export const prefetchAllRoutes = async () => {
  const routes = Object.keys(routeComponents);
  await prefetchRoutes(routes);
};

// Prefetch on hover with debounce
let hoverTimeout;
export const prefetchOnHover = (route) => {
  clearTimeout(hoverTimeout);
  hoverTimeout = setTimeout(() => {
    prefetchRoute(route);
  }, 100); // 100ms debounce
};

// Prefetch adjacent routes based on current route
export const prefetchAdjacentRoutes = async (currentRoute) => {
  const routeOrder = ['/', '/about', '/resume', '/contact'];
  const currentIndex = routeOrder.indexOf(currentRoute);
  
  if (currentIndex === -1) return;
  
  const adjacentRoutes = [];
  
  // Prefetch previous and next routes
  if (currentIndex > 0) {
    adjacentRoutes.push(routeOrder[currentIndex - 1]);
  }
  if (currentIndex < routeOrder.length - 1) {
    adjacentRoutes.push(routeOrder[currentIndex + 1]);
  }
  
  await prefetchRoutes(adjacentRoutes);
};

// Intersection Observer for prefetching visible links
export const setupLinkPrefetching = () => {
  if (typeof window === 'undefined') return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const link = entry.target;
          const href = link.getAttribute('href');
          if (href && routeComponents[href]) {
            prefetchRoute(href);
          }
        }
      });
    },
    {
      rootMargin: '50px',
    }
  );
  
  // Observe all navigation links
  const links = document.querySelectorAll('a[href^="/"]');
  links.forEach((link) => observer.observe(link));
  
  return () => {
    observer.disconnect();
  };
};