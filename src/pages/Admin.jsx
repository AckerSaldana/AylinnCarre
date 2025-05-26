import React, { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  IconButton,
  ImageList,
  ImageListItem,
  Tooltip,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Divider,
  Tabs,
  Tab,
  InputAdornment,
  Badge,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Breadcrumbs,
  Link
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Image as ImageIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  GridView as GridViewIcon,
  ViewList as ViewListIcon,
  AccountCircle as AccountCircleIcon,
  Work as WorkIcon,
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Upload as UploadIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { getProjects, addProject, updateProject, deleteProject, deleteProjectImage } from '../firebase/projectService';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import ArrayField from '../components/ArrayField';
import ProfileEdit from '../components/ProfileEdit';

const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [authenticated, setAuthenticated] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [imageManagementOpen, setImageManagementOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recent');

  // Formulario inicial vacío
  const emptyForm = {
    title: '',
    category: '',
    description: '',
    year: '',
    mentors: [],
    materials: [],
    challenge: '',
    solution: '',
    designProcess: '',
    awards: [],
    featured: false
  };

  const [formData, setFormData] = useState(emptyForm);

  const handleSectionChange = (event, newValue) => {
    setActiveSection(newValue);
  };

  // Filtrar y ordenar proyectos
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Aplicar búsqueda
    if (searchQuery) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Aplicar filtro de categoría
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(project => project.category === categoryFilter);
    }

    // Aplicar ordenamiento
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return b.createdAt?.seconds - a.createdAt?.seconds || 0;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [projects, searchQuery, categoryFilter, sortBy]);

  // Estadísticas del dashboard
  const stats = useMemo(() => ({
    total: projects.length,
    featured: projects.filter(p => p.featured).length,
    byCategory: projects.reduce((acc, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1;
      return acc;
    }, {})
  }), [projects]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setAuthenticated(!!user);
      if (user) {
        fetchProjects();
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (imageFiles.length > 0) {
      const newPreviewImages = Array.from(imageFiles).map(file => URL.createObjectURL(file));
      setPreviewImages(newPreviewImages);
      return () => {
        newPreviewImages.forEach(url => URL.revokeObjectURL(url));
      };
    }
  }, [imageFiles]);

  // Cargar proyectos
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const projectsData = await getProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects: ", error);
      setSnackbar({
        open: true,
        message: 'Error al cargar proyectos',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Manejar login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
      setSnackbar({
        open: true,
        message: 'Inicio de sesión exitoso',
        severity: 'success'
      });
    } catch (error) {
      console.error("Login error: ", error);
      setSnackbar({
        open: true,
        message: 'Error de inicio de sesión: credenciales incorrectas',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Manejar logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setSnackbar({
        open: true,
        message: 'Sesión cerrada',
        severity: 'info'
      });
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  // Abrir formulario para añadir nuevo proyecto
  const handleAddNew = () => {
    setEditingProject(null);
    setFormData(emptyForm);
    setImageFiles([]);
    setPreviewImages([]);
    setCurrentImages([]);
    setFormOpen(true);
  };

  // Abrir formulario para editar proyecto existente
  const handleEdit = (project) => {
    setEditingProject(project.id);
    const mentors = Array.isArray(project.mentors)
      ? project.mentors
      : (project.mentors ? String(project.mentors).split(',').map(item => item.trim()) : []);
    const materials = Array.isArray(project.materials)
      ? project.materials
      : (project.materials ? String(project.materials).split(',').map(item => item.trim()) : []);
    const awards = Array.isArray(project.awards)
      ? project.awards
      : (project.awards ? String(project.awards).split(',').map(item => item.trim()) : []);
    const projectData = {
      ...project,
      mentors,
      materials,
      awards,
      featured: Boolean(project.featured)
    };
    setFormData(projectData);
    setImageFiles([]);
    setPreviewImages([]);
    setCurrentImages(project.images || []);
    setFormOpen(true);
  };

  // Confirmar eliminación de proyecto
  const confirmDelete = (project) => {
    setProjectToDelete(project);
    setDeleteConfirmOpen(true);
  };

  // Eliminar proyecto
  const handleDelete = async () => {
    if (!projectToDelete || !projectToDelete.id) {
      console.error("No hay proyecto para eliminar o ID inválido");
      return;
    }
    try {
      setLoading(true);
      console.log("Intentando eliminar proyecto con ID:", projectToDelete.id);
      const deletedId = await deleteProject(projectToDelete.id);
      console.log("Proyecto eliminado con ID:", deletedId);
      setProjects(projects.filter(p => p.id !== deletedId));
      setSnackbar({
        open: true,
        message: 'Proyecto eliminado correctamente',
        severity: 'success'
      });
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
      setSnackbar({
        open: true,
        message: `Error al eliminar el proyecto: ${error.message || 'Error desconocido'}`,
        severity: 'error'
      });
    } finally {
      setLoading(false);
      setDeleteConfirmOpen(false);
      setProjectToDelete(null);
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  // Manejar selección de imágenes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  // Eliminar una imagen del proyecto
  const handleDeleteImage = async (imageUrl) => {
    if (!editingProject) return;
    try {
      setLoading(true);
      await deleteProjectImage(editingProject, imageUrl);
      setCurrentImages(currentImages.filter(url => url !== imageUrl));
      setSnackbar({
        open: true,
        message: 'Imagen eliminada correctamente',
        severity: 'success'
      });
    } catch (error) {
      console.error("Error deleting image: ", error);
      setSnackbar({
        open: true,
        message: 'Error al eliminar la imagen',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Reordenar imágenes
  const moveImageUp = (index) => {
    if (index === 0) return;
    const newImages = [...currentImages];
    const temp = newImages[index];
    newImages[index] = newImages[index - 1];
    newImages[index - 1] = temp;
    setCurrentImages(newImages);
  };

  const moveImageDown = (index) => {
    if (index === currentImages.length - 1) return;
    const newImages = [...currentImages];
    const temp = newImages[index];
    newImages[index] = newImages[index + 1];
    newImages[index + 1] = temp;
    setCurrentImages(newImages);
  };

  const setAsPrimaryImage = (index) => {
    if (index === 0) return;
    const newImages = [...currentImages];
    const primaryImage = newImages[index];
    newImages.splice(index, 1);
    newImages.unshift(primaryImage);
    setCurrentImages(newImages);
    setFormData(prevData => ({
      ...prevData,
      images: newImages
    }));
    setSnackbar({
      open: true,
      message: 'Imagen establecida como principal',
      severity: 'success'
    });
  };

  // Cerrar diálogo de gestión de imágenes
  const handleImageManagementClose = () => {
    setFormData(prevData => ({
      ...prevData,
      images: currentImages
    }));
    setImageManagementOpen(false);
  };

  // Toggle featured status
  const toggleFeatured = async (project) => {
    try {
      const updatedProject = { ...project, featured: !project.featured };
      await updateProject(project.id, updatedProject);
      await fetchProjects();
      setSnackbar({
        open: true,
        message: project.featured ? 'Proyecto desmarcado como destacado' : 'Proyecto marcado como destacado',
        severity: 'success'
      });
    } catch (error) {
      console.error("Error updating featured status:", error);
      setSnackbar({
        open: true,
        message: 'Error al actualizar el estado destacado',
        severity: 'error'
      });
    }
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const submitData = {
        ...formData,
        images: currentImages
      };
      if (editingProject) {
        const updated = await updateProject(editingProject, submitData, imageFiles);
        setProjects(projects.map(p => p.id === editingProject ? updated : p));
        setSnackbar({
          open: true,
          message: 'Proyecto actualizado correctamente',
          severity: 'success'
        });
      } else {
        const newProject = await addProject(submitData, imageFiles);
        setProjects([newProject, ...projects]);
        setSnackbar({
          open: true,
          message: 'Proyecto añadido correctamente',
          severity: 'success'
        });
      }
      setFormData(emptyForm);
      setImageFiles([]);
      setPreviewImages([]);
      setCurrentImages([]);
      setFormOpen(false);
      setEditingProject(null);
    } catch (error) {
      console.error("Error saving project: ", error);
      setSnackbar({
        open: true,
        message: 'Error al guardar el proyecto: ' + error.message,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: '#f8f9fa' }}>
        <Container maxWidth="sm">
          <Paper 
            elevation={1} 
            sx={{ 
              p: 6,
              borderRadius: 2
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <AccountCircleIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                Panel de Administración
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ingresa tus credenciales para continuar
              </Typography>
            </Box>
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                margin="normal"
                label="Correo electrónico"
                name="email"
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Contraseña"
                name="password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
                variant="outlined"
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ 
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem'
                }}
                disabled={loading}
                startIcon={loading && <CircularProgress size={20} color="inherit" />}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </Button>
            </form>
          </Paper>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          >
            <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        {/* Header con breadcrumbs */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Panel de Administración
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" underline="hover">
              Inicio
            </Link>
            <Typography color="primary" fontWeight="medium">
              Administración
            </Typography>
            <Typography color="text.primary">
              {activeSection === 'dashboard' ? 'Dashboard' : 
               activeSection === 'projects' ? 'Proyectos' : 'Perfil'}
            </Typography>
          </Breadcrumbs>
        </Box>

        {/* Navegación principal */}
        <Paper elevation={0} sx={{ borderRadius: 2, mb: 6, bgcolor: 'grey.50', border: 'none' }}>
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 4,
            py: 2
          }}>
            <Tabs 
              value={activeSection} 
              onChange={handleSectionChange}
              sx={{
                '& .MuiTabs-indicator': {
                  height: 2,
                  backgroundColor: 'primary.main'
                },
                '& .MuiTabs-flexContainer': {
                  gap: 1
                },
                '& .MuiTab-root': {
                  transition: 'all 0.2s ease',
                  fontWeight: 500,
                  color: 'text.secondary',
                  minWidth: 'auto',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'transparent'
                  },
                  '&.Mui-selected': {
                    color: 'primary.main',
                    fontWeight: 600
                  },
                  '&.Mui-focusVisible': {
                    backgroundColor: 'transparent'
                  }
                },
                '& .MuiTabs-scroller': {
                  '& .MuiTabs-indicator': {
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: 'transparent'
                  },
                  '& .MuiTabs-indicatorSpan': {
                    maxWidth: 40,
                    width: '100%',
                    backgroundColor: 'primary.main'
                  }
                }
              }}
            >
              <Tab 
                icon={<DashboardIcon />} 
                iconPosition="start" 
                label="Dashboard" 
                value="dashboard"
                disableRipple
                sx={{ 
                  textTransform: 'none',
                  px: 3,
                  fontSize: '0.95rem',
                  gap: 1,
                  '& .MuiSvgIcon-root': {
                    fontSize: 20
                  },
                  '&:hover': {
                    backgroundColor: 'transparent !important',
                    color: 'primary.main'
                  }
                }}
              />
              <Tab 
                icon={
                  <Badge 
                    badgeContent={projects.length} 
                    color="primary"
                    sx={{
                      '& .MuiBadge-badge': {
                        fontSize: '0.7rem',
                        height: 18,
                        minWidth: 18
                      }
                    }}
                  >
                    <WorkIcon />
                  </Badge>
                } 
                iconPosition="start" 
                label="Proyectos" 
                value="projects"
                disableRipple
                sx={{ 
                  textTransform: 'none',
                  px: 3,
                  fontSize: '0.95rem',
                  gap: 1,
                  '& .MuiSvgIcon-root': {
                    fontSize: 20
                  },
                  '&:hover': {
                    backgroundColor: 'transparent !important',
                    color: 'primary.main'
                  }
                }}
              />
              <Tab 
                icon={<AccountCircleIcon />} 
                iconPosition="start" 
                label="Perfil" 
                value="profile"
                disableRipple
                sx={{ 
                  textTransform: 'none',
                  px: 3,
                  fontSize: '0.95rem',
                  gap: 1,
                  '& .MuiSvgIcon-root': {
                    fontSize: 20
                  },
                  '&:hover': {
                    backgroundColor: 'transparent !important',
                    color: 'primary.main'
                  }
                }}
              />
            </Tabs>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {activeSection === 'projects' && (
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />} 
                  onClick={handleAddNew} 
                  size="small"
                  sx={{ 
                    px: 2.5,
                    py: 1,
                    borderRadius: 1.5,
                    textTransform: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  Nuevo Proyecto
                </Button>
              )}
              <Button
                variant="text"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                size="small"
                sx={{
                  color: 'text.secondary',
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  '&:hover': {
                    color: 'error.main',
                    bgcolor: 'rgba(211, 47, 47, 0.04)'
                  }
                }}
              >
                Salir
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Dashboard Section */}
        {activeSection === 'dashboard' && (
          <Box>
            <Grid container spacing={4}>
              {/* Estadísticas */}
              <Grid item xs={12} md={3}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 4, 
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    height: '100%'
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <WorkIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                    <Typography variant="h2" fontWeight="bold">{stats.total}</Typography>
                    <Typography variant="body1">Total de Proyectos</Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 4, 
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    color: 'white',
                    height: '100%'
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <StarIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                    <Typography variant="h2" fontWeight="bold">{stats.featured}</Typography>
                    <Typography variant="body1">Proyectos Destacados</Typography>
                  </Box>
                </Paper>
              </Grid>
              {Object.entries(stats.byCategory).slice(0, 2).map(([category, count], index) => (
                <Grid item xs={12} md={3} key={category}>
                  <Paper 
                    elevation={1} 
                    sx={{ 
                      p: 4, 
                      borderRadius: 2,
                      background: index === 0 
                        ? 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
                        : 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
                      color: 'white',
                      height: '100%'
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <ImageIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                      <Typography variant="h2" fontWeight="bold">{count}</Typography>
                      <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                        {category}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
              
              {/* Proyectos recientes */}
              <Grid item xs={12}>
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                    Proyectos Recientes
                  </Typography>
                  <Paper elevation={1} sx={{ p: 4, borderRadius: 2 }}>
                    {projects.slice(0, 5).map((project, index) => (
                      <Box 
                        key={project.id} 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          py: 3,
                          px: 2,
                          borderBottom: index < 4 ? '1px solid rgba(0,0,0,0.08)' : 'none',
                          '&:hover': {
                            bgcolor: 'grey.50',
                            borderRadius: 1
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          {project.images?.[0] ? (
                            <img 
                              src={project.images[0]} 
                              alt={project.title}
                              style={{ 
                                width: 40, 
                                height: 40, 
                                borderRadius: 8, 
                                objectFit: 'cover' 
                              }}
                            />
                          ) : (
                            <Box 
                              sx={{ 
                                width: 40, 
                                height: 40, 
                                borderRadius: 1, 
                                bgcolor: 'grey.200',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <ImageIcon color="action" />
                            </Box>
                          )}
                          <Box>
                            <Typography variant="body1" fontWeight="medium">
                              {project.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {project.category} • {project.year}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {project.featured && (
                            <Chip 
                              icon={<StarIcon fontSize="small" />} 
                              label="Destacado" 
                              size="small" 
                              color="primary"
                            />
                          )}
                          <IconButton size="small" onClick={() => handleEdit(project)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    ))}
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Projects Section */}
        {activeSection === 'projects' && (
          loading && !formOpen && !deleteConfirmOpen ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box>
              {/* Barra de herramientas */}
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 4, 
                  mb: 5, 
                  borderRadius: 2,
                  bgcolor: 'white'
                }}
              >
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Buscar proyectos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Categoría</InputLabel>
                      <Select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        label="Categoría"
                        startAdornment={
                          <InputAdornment position="start">
                            <FilterIcon color="action" fontSize="small" />
                          </InputAdornment>
                        }
                      >
                        <MenuItem value="all">Todas las categorías</MenuItem>
                        <MenuItem value="diseño industrial">Diseño Industrial</MenuItem>
                        <MenuItem value="diseño visual">Diseño Visual</MenuItem>
                        <MenuItem value="dirección de arte">Dirección de Arte</MenuItem>
                        <MenuItem value="ilustración">Ilustración</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Ordenar por</InputLabel>
                      <Select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        label="Ordenar por"
                      >
                        <MenuItem value="recent">Más recientes</MenuItem>
                        <MenuItem value="title">Título</MenuItem>
                        <MenuItem value="featured">Destacados primero</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <ToggleButtonGroup
                      value={viewMode}
                      exclusive
                      onChange={(e, newMode) => newMode && setViewMode(newMode)}
                      size="small"
                      fullWidth
                    >
                      <ToggleButton value="grid">
                        <GridViewIcon />
                      </ToggleButton>
                      <ToggleButton value="list">
                        <ViewListIcon />
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                </Grid>
              </Paper>

              {/* Contador de resultados */}
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Mostrando {filteredProjects.length} de {projects.length} proyectos
                </Typography>
                {(searchQuery || categoryFilter !== 'all') && (
                  <Button 
                    size="small" 
                    variant="text"
                    onClick={() => {
                      setSearchQuery('');
                      setCategoryFilter('all');
                    }}
                    sx={{
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.lighter'
                      }
                    }}
                  >
                    Limpiar filtros
                  </Button>
                )}
              </Box>

              <Grid container spacing={4}>
                {filteredProjects.map(project => (
                  <Grid item xs={12} md={6} lg={4} key={project.id}>
                    <Paper
                      elevation={1}
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        '&:hover': {
                          borderColor: 'primary.main',
                          boxShadow: 2
                        }
                      }}
                    >
                      <Box
                        sx={{
                          position: 'relative',
                          height: 200,
                          overflow: 'hidden',
                          backgroundColor: '#f5f5f5'
                        }}
                      >
                        {project.featured && (
                          <Chip
                            icon={<StarIcon fontSize="small" />}
                            label="Destacado"
                            color="primary"
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 8,
                              left: 8,
                              zIndex: 1
                            }}
                          />
                        )}
                        {project.images && project.images.length > 0 ? (
                          <CardMedia
                            component="img"
                            height="200"
                            image={project.images[0]}
                            alt={project.title}
                            sx={{
                              objectFit: 'cover'
                            }}
                          />
                        ) : (
                          <Paper
                            sx={{
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: '#eee'
                            }}
                          >
                            <ImageIcon sx={{ fontSize: 60, color: '#bbb' }} />
                          </Paper>
                        )}
                      </Box>
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Typography variant="h6" gutterBottom fontWeight="medium">
                          {project.title}
                        </Typography>
                        <Box sx={{ display: 'flex', mb: 2 }}>
                          <Chip label={project.category} size="small" sx={{ mr: 1 }} color="secondary" variant="outlined" />
                          <Chip label={project.year} size="small" variant="outlined" />
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            mb: 2
                          }}
                        >
                          {project.description}
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                          {project.images && (
                            <Typography variant="caption" display="block" color="text.secondary">
                              Imágenes: {project.images.length}
                            </Typography>
                          )}
                        </Box>
                      </CardContent>
                      <Divider />
                      <CardActions sx={{ p: 2, justifyContent: 'space-between' }}>
                        <Box>
                          <IconButton 
                            size="small" 
                            onClick={() => toggleFeatured(project)}
                            color={project.featured ? "primary" : "default"}
                          >
                            {project.featured ? <StarIcon /> : <StarBorderIcon />}
                          </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Editar proyecto">
                            <IconButton
                              onClick={() => handleEdit(project)}
                              size="small"
                              color="primary"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar proyecto">
                            <IconButton
                              color="error"
                              onClick={() => confirmDelete(project)}
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </CardActions>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              
              {/* Mensaje cuando no hay resultados */}
              {filteredProjects.length === 0 && (
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 8, 
                    textAlign: 'center',
                    borderRadius: 2,
                    bgcolor: 'white',
                    mt: 4
                  }}
                >
                  <SearchIcon sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No se encontraron proyectos
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {searchQuery ? `No hay resultados para "${searchQuery}"` : 'No hay proyectos en esta categoría'}
                  </Typography>
                </Paper>
              )}
            </Box>
          )
        )}

        {/* Profile Section */}
        {activeSection === 'profile' && (
          <Box>
            <ProfileEdit />
          </Box>
        )}

        {/* Diálogo para agregar/editar proyecto */}
        <Dialog 
          open={formOpen} 
          onClose={() => !loading && setFormOpen(false)} 
          fullWidth 
          maxWidth="lg" 
          scroll="paper"
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h5" fontWeight="bold">
                {editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
              </Typography>
              <IconButton 
                onClick={() => setFormOpen(false)} 
                disabled={loading}
                size="small"
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent dividers sx={{ p: 5 }}>
            <form onSubmit={handleSubmit}>
              {/* Sección 1: Información Básica */}
              <Box sx={{ mb: 5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                  <Box 
                    sx={{ 
                      width: 10, 
                      height: 40, 
                      bgcolor: 'primary.main',
                      borderRadius: 1
                    }}
                  />
                  <Typography variant="h6" fontWeight="bold">
                    Información Básica
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Título del Proyecto"
                      name="title"
                      value={formData.title || ''}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Categoría</InputLabel>
                      <Select 
                        name="category" 
                        value={formData.category || ''} 
                        onChange={handleChange} 
                        label="Categoría" 
                        required
                      >
                        <MenuItem value="diseño industrial">Diseño Industrial</MenuItem>
                        <MenuItem value="diseño visual">Diseño Visual</MenuItem>
                        <MenuItem value="dirección de arte">Dirección de Arte</MenuItem>
                        <MenuItem value="ilustración">Ilustración</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Año"
                      name="year"
                      value={formData.year || ''}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: formData.featured ? 'warning.main' : 'divider',
                        bgcolor: formData.featured ? 'warning.light' : 'background.paper'
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.featured || false}
                            onChange={handleChange}
                            name="featured"
                            color="warning"
                            icon={<StarBorderIcon />}
                            checkedIcon={<StarIcon />}
                          />
                        }
                        label={
                          <Typography variant="body1">
                            Proyecto Destacado
                          </Typography>
                        }
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Descripción"
                      name="description"
                      value={formData.description || ''}
                      onChange={handleChange}
                      multiline
                      rows={4}
                      required
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 5 }} />
              
              {/* Sección 2: Detalles del Proyecto */}
              <Box sx={{ mb: 5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                  <Box 
                    sx={{ 
                      width: 10, 
                      height: 40, 
                      bgcolor: 'secondary.main',
                      borderRadius: 1
                    }}
                  />
                  <Typography variant="h6" fontWeight="bold">
                    Detalles del Proyecto
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Desafío"
                      name="challenge"
                      value={formData.challenge || ''}
                      onChange={handleChange}
                      multiline
                      rows={4}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Solución"
                      name="solution"
                      value={formData.solution || ''}
                      onChange={handleChange}
                      multiline
                      rows={4}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Proceso de Diseño"
                      name="designProcess"
                      value={formData.designProcess || ''}
                      onChange={handleChange}
                      multiline
                      rows={4}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 5 }} />
              
              {/* Sección 3: Información Adicional */}
              <Box sx={{ mb: 5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                  <Box 
                    sx={{ 
                      width: 10, 
                      height: 40, 
                      bgcolor: 'info.main',
                      borderRadius: 1
                    }}
                  />
                  <Typography variant="h6" fontWeight="bold">
                    Información Adicional
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <ArrayField
                      label="Mentores"
                      values={formData.mentors || []}
                      onChange={(newValues) => setFormData({ ...formData, mentors: newValues })}
                      helperText="Añade los nombres de los mentores"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <ArrayField
                      label="Materiales"
                      values={formData.materials || []}
                      onChange={(newValues) => setFormData({ ...formData, materials: newValues })}
                      helperText="Lista los materiales utilizados"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <ArrayField
                      label="Reconocimientos"
                      values={formData.awards || []}
                      onChange={(newValues) => setFormData({ ...formData, awards: newValues })}
                      helperText="Premios o menciones recibidas"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 5 }} />
              
              {/* Sección 4: Imágenes */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                  <Box 
                    sx={{ 
                      width: 10, 
                      height: 40, 
                      bgcolor: 'success.main',
                      borderRadius: 1
                    }}
                  />
                  <Typography variant="h6" fontWeight="bold">
                    Imágenes del Proyecto
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    {currentImages && currentImages.length > 0 && (
                      <>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                          <Typography variant="body1" color="text.secondary">
                            {currentImages.length} imágenes existentes
                          </Typography>
                          <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            onClick={() => setImageManagementOpen(true)}
                            startIcon={<ImageIcon />}
                          >
                            Gestionar imágenes
                          </Button>
                        </Box>
                        {currentImages.length > 0 && (
                          <Box sx={{ mb: 4 }}>
                            <Typography variant="subtitle2" gutterBottom sx={{ mb: 2 }}>
                              Imagen principal:
                            </Typography>
                            <Card sx={{ maxWidth: 300, border: '2px solid', borderColor: 'primary.main' }}>
                              <CardMedia
                                component="img"
                                height="180"
                                image={currentImages[0]}
                                alt="Imagen principal"
                              />
                              <CardContent sx={{ p: 2 }}>
                                <Typography variant="caption" color="text.secondary">
                                  Esta imagen se muestra como principal en el catálogo
                                </Typography>
                              </CardContent>
                            </Card>
                          </Box>
                        )}
                      </>
                    )}
                    <Box sx={{ mb: 3 }}>
                      <Box
                        component="label"
                        sx={{ 
                          display: 'block',
                          p: 6,
                          borderRadius: 2,
                          border: '2px dashed',
                          borderColor: imageFiles.length > 0 ? 'success.main' : 'grey.300',
                          bgcolor: imageFiles.length > 0 ? 'success.light' : 'background.paper',
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: 'grey.100'
                          }
                        }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          hidden
                          onChange={handleImageChange}
                        />
                        <UploadIcon sx={{ fontSize: 48, color: imageFiles.length > 0 ? 'success.main' : 'grey.400', mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                          {imageFiles.length > 0
                            ? `${imageFiles.length} nuevas imágenes seleccionadas`
                            : 'Arrastra imágenes aquí'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          o haz clic para seleccionar archivos
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                          PNG, JPG, GIF hasta 10MB cada una
                        </Typography>
                      </Box>
                      {previewImages.length > 0 && (
                        <Box sx={{ mt: 3 }}>
                          <Typography variant="subtitle2" gutterBottom>
                            Vista previa de nuevas imágenes:
                          </Typography>
                          <ImageList cols={4} rowHeight={120} sx={{ maxHeight: 250, overflow: 'auto' }}>
                            {previewImages.map((img, index) => (
                              <ImageListItem key={index}>
                                <img
                                  src={img}
                                  alt={`Preview ${index + 1}`}
                                  loading="lazy"
                                  style={{ height: '100%', objectFit: 'cover' }}
                                />
                              </ImageListItem>
                            ))}
                          </ImageList>
                        </Box>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={() => setFormOpen(false)} 
              disabled={loading}
              startIcon={<CancelIcon />}
              size="large"
              variant="outlined"
              sx={{
                '&:hover': {
                  bgcolor: 'grey.50'
                }
              }}
            >
              Cancelar
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSubmit} 
              disabled={loading} 
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
              size="large"
            >
              {loading ? 'Guardando...' : 'Guardar proyecto'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Diálogo para gestionar imágenes existentes */}
        <Dialog open={imageManagementOpen} onClose={handleImageManagementClose} fullWidth maxWidth="md">
          <DialogTitle>
            Gestionar imágenes
            <IconButton
              aria-label="close"
              onClick={handleImageManagementClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500]
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Typography variant="body2" paragraph>
              La primera imagen será utilizada como la principal en el catálogo y vista de detalle. 
              Puedes reorganizar o eliminar imágenes según sea necesario.
            </Typography>
            <Grid container spacing={2}>
              {currentImages.map((image, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper elevation={3} sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image={image}
                      alt={`Imagen ${index + 1}`}
                    />
                    {index === 0 && (
                      <Chip
                        icon={<StarIcon fontSize="small" />}
                        label="Principal"
                        color="primary"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          zIndex: 1
                        }}
                      />
                    )}
                    <Box sx={{ position: 'absolute', bottom: 8, right: 8, display: 'flex', gap: 1 }}>
                      <Tooltip title="Mover arriba">
                        <IconButton
                          size="small"
                          color="inherit"
                          onClick={() => moveImageUp(index)}
                          disabled={index === 0}
                          sx={{ bgcolor: 'rgba(255,255,255,0.8)' }}
                        >
                          <ArrowUpwardIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Mover abajo">
                        <IconButton
                          size="small"
                          color="inherit"
                          onClick={() => moveImageDown(index)}
                          disabled={index === currentImages.length - 1}
                          sx={{ bgcolor: 'rgba(255,255,255,0.8)' }}
                        >
                          <ArrowDownwardIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {index !== 0 && (
                        <Tooltip title="Establecer como principal">
                          <IconButton 
                            size="small" 
                            color="inherit" 
                            onClick={() => setAsPrimaryImage(index)}
                            sx={{ bgcolor: 'rgba(255,255,255,0.8)' }}
                          >
                            <StarBorderIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Eliminar imagen">
                        <IconButton 
                          size="small" 
                          color="inherit" 
                          onClick={() => handleDeleteImage(image)}
                          sx={{ bgcolor: 'rgba(255,255,255,0.8)' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleImageManagementClose} variant="contained">
              Guardar cambios
            </Button>
          </DialogActions>
        </Dialog>

        {/* Diálogo de confirmación para eliminar proyecto */}
        <Dialog 
          open={deleteConfirmOpen} 
          onClose={() => setDeleteConfirmOpen(false)} 
          fullWidth 
          maxWidth="sm"
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ErrorIcon color="error" />
              <Typography variant="h6">Confirmar eliminación</Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
              ¿Estás seguro de eliminar el proyecto <strong>"{projectToDelete?.title}"</strong>?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Esta acción no se puede deshacer. Se eliminarán todas las imágenes y datos asociados.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setDeleteConfirmOpen(false)} 
              disabled={loading}
              variant="outlined"
              sx={{
                '&:hover': {
                  bgcolor: 'grey.50'
                }
              }}
            >
              Cancelar
            </Button>
            <Button onClick={handleDelete} variant="contained" color="error" disabled={loading}>
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => setSnackbar({ ...snackbar, open: false })} 
            severity={snackbar.severity}
            variant="filled"
            elevation={6}
            icon={snackbar.severity === 'success' ? <CheckCircleIcon /> : undefined}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Admin;