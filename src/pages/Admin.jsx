// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
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
  DialogActions
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { getProjects, addProject, updateProject, deleteProject } from '../firebase/projectService';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [authenticated, setAuthenticated] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  
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

  // Verificar autenticación al cargar
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
    setFormOpen(true);
  };

  // Abrir formulario para editar proyecto existente
  const handleEdit = (project) => {
    setEditingProject(project.id);
    // Convertir arrays almacenados como string a arrays reales si es necesario
    const projectData = {
      ...project,
      mentors: Array.isArray(project.mentors) ? project.mentors : [],
      materials: Array.isArray(project.materials) ? project.materials : [],
      awards: Array.isArray(project.awards) ? project.awards : []
    };
    setFormData(projectData);
    setImageFiles([]);
    setFormOpen(true);
  };

  // Confirmar eliminación de proyecto
  const confirmDelete = (project) => {
    setProjectToDelete(project);
    setDeleteConfirmOpen(true);
  };

  // Eliminar proyecto
  const handleDelete = async () => {
    if (!projectToDelete) return;
    
    try {
      setLoading(true);
      await deleteProject(projectToDelete.id);
      setProjects(projects.filter(p => p.id !== projectToDelete.id));
      setSnackbar({
        open: true,
        message: 'Proyecto eliminado correctamente',
        severity: 'success'
      });
    } catch (error) {
      console.error("Error deleting project: ", error);
      setSnackbar({
        open: true,
        message: 'Error al eliminar el proyecto',
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
    
    // Manejar checkboxes
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
      return;
    }
    
    setFormData({ ...formData, [name]: value });
  };

  // Manejar cambios en campos de array (coma separados)
  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    
    // Convertir string separado por comas a array
    const arrayValue = value.split(',').map(item => item.trim()).filter(Boolean);
    
    setFormData({ ...formData, [name]: arrayValue });
  };

  // Manejar selección de imágenes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (editingProject) {
        // Actualizar proyecto existente
        const updated = await updateProject(editingProject, formData, imageFiles);
        
        setProjects(projects.map(p => p.id === editingProject ? updated : p));
        setSnackbar({
          open: true,
          message: 'Proyecto actualizado correctamente',
          severity: 'success'
        });
      } else {
        // Añadir nuevo proyecto
        const newProject = await addProject(formData, imageFiles);
        
        setProjects([newProject, ...projects]);
        setSnackbar({
          open: true,
          message: 'Proyecto añadido correctamente',
          severity: 'success'
        });
      }
      
      // Resetear formulario y cerrar
      setFormData(emptyForm);
      setImageFiles([]);
      setFormOpen(false);
      setEditingProject(null);
    } catch (error) {
      console.error("Error saving project: ", error);
      setSnackbar({
        open: true,
        message: 'Error al guardar el proyecto',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Si no está autenticado, mostrar formulario de login
  if (!authenticated) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Administración de Proyectos
          </Typography>
          
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              margin="normal"
              label="Correo electrónico"
              name="email"
              type="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
              required
            />
            
            <TextField
              fullWidth
              margin="normal"
              label="Contraseña"
              name="password"
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
              required
            />
            
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </form>
        </Paper>
        
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({...snackbar, open: false})}
        >
          <Alert 
            onClose={() => setSnackbar({...snackbar, open: false})} 
            severity={snackbar.severity}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Administración de Proyectos
        </Typography>
        
        <Box>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleAddNew}
            sx={{ mr: 2 }}
          >
            Nuevo Proyecto
          </Button>
          
          <Button 
            variant="outlined" 
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </Box>
      </Box>
      
      {/* Lista de proyectos */}
      {loading ? (
        <Typography>Cargando proyectos...</Typography>
      ) : (
        <Grid container spacing={3}>
          {projects.map(project => (
            <Grid item xs={12} md={6} lg={4} key={project.id}>
              <Paper 
                elevation={2}
                sx={{ 
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Box 
                  sx={{ 
                    height: 200, 
                    backgroundImage: `url(${project.images && project.images.length > 0 ? project.images[0] : ''})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    mb: 2
                  }}
                />
                
                <Typography variant="h6" gutterBottom>
                  {project.title}
                </Typography>
                
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Chip 
                    label={project.category} 
                    size="small" 
                    sx={{ mr: 1 }}
                  />
                  <Chip 
                    label={project.year} 
                    size="small" 
                    variant="outlined"
                  />
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
                
                <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  <Button 
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(project)}
                    size="small"
                  >
                    Editar
                  </Button>
                  
                  <Button 
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => confirmDelete(project)}
                    size="small"
                  >
                    Eliminar
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Formulario (diálogo) para añadir/editar proyecto */}
      <Dialog 
        open={formOpen} 
        onClose={() => setFormOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
        </DialogTitle>
        
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} sx={{ mt: 0 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Título"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Categoría</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    label="Categoría"
                    required
                  >
                    <MenuItem value="diseño industrial">Diseño Industrial</MenuItem>
                    <MenuItem value="diseño visual">Diseño Visual</MenuItem>
                    <MenuItem value="dirección de arte">Dirección de Arte</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Año"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Desafío"
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleChange}
                  multiline
                  rows={2}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Solución"
                  name="solution"
                  value={formData.solution}
                  onChange={handleChange}
                  multiline
                  rows={2}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Proceso de Diseño"
                  name="designProcess"
                  value={formData.designProcess}
                  onChange={handleChange}
                  multiline
                  rows={2}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mentores (separados por comas)"
                  name="mentors"
                  value={formData.mentors.join(', ')}
                  onChange={handleArrayChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Materiales (separados por comas)"
                  name="materials"
                  value={formData.materials.join(', ')}
                  onChange={handleArrayChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Reconocimientos (separados por comas)"
                  name="awards"
                  value={formData.awards.join(', ')}
                  onChange={handleArrayChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                >
                  {imageFiles.length > 0 
                    ? `${imageFiles.length} imágenes seleccionadas` 
                    : 'Seleccionar Imágenes'}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={handleImageChange}
                  />
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setFormOpen(false)}>
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Diálogo de confirmación para eliminar */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro que deseas eliminar el proyecto "{projectToDelete?.title}"? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleDelete}
            color="error"
            variant="contained"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({...snackbar, open: false})}
      >
        <Alert 
          onClose={() => setSnackbar({...snackbar, open: false})} 
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Admin;