import { db, storage } from './config';
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// Colección de proyectos
const projectsCollection = collection(db, 'projects');

// Obtener todos los proyectos
export const getProjects = async () => {
  const projectsQuery = query(projectsCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(projectsQuery);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Obtener proyectos por categoría
export const getProjectsByCategory = async (category) => {
  const projectsQuery = query(
    projectsCollection, 
    where('category', '==', category),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(projectsQuery);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Obtener un proyecto por ID
export const getProjectById = async (id) => {
  const docRef = doc(db, 'projects', id);
  const snapshot = await getDoc(docRef);
  
  if (snapshot.exists()) {
    return {
      id: snapshot.id,
      ...snapshot.data()
    };
  } else {
    return null;
  }
};

// Añadir un nuevo proyecto
export const addProject = async (projectData, imageFiles) => {
  try {
    // Primero subir las imágenes
    const imageUrls = await Promise.all(
      imageFiles.map(async (file) => {
        const fileExtension = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExtension}`;
        const storageRef = ref(storage, `projects/${fileName}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      })
    );
    
    // Añadir los URLs de imágenes al proyecto
    const newProjectData = {
      ...projectData,
      images: imageUrls,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    // Añadir el proyecto a Firestore
    const docRef = await addDoc(projectsCollection, newProjectData);
    return {
      id: docRef.id,
      ...newProjectData
    };
  } catch (error) {
    console.error("Error adding project: ", error);
    throw error;
  }
};

// Actualizar un proyecto existente
export const updateProject = async (id, projectData, newImageFiles = []) => {
  try {
    const docRef = doc(db, 'projects', id);
    const projectSnapshot = await getDoc(docRef);
    
    if (!projectSnapshot.exists()) {
      throw new Error('Project not found');
    }
    
    // CAMBIO IMPORTANTE: Usar las imágenes del projectData directamente
    // en lugar de las del documento actual
    let imageUrls = projectData.images || [];
    
    // Subir nuevas imágenes si existen
    if (newImageFiles.length > 0) {
      const newImageUrls = await Promise.all(
        newImageFiles.map(async (file) => {
          const fileExtension = file.name.split('.').pop();
          const fileName = `${uuidv4()}.${fileExtension}`;
          const storageRef = ref(storage, `projects/${fileName}`);
          await uploadBytes(storageRef, file);
          return await getDownloadURL(storageRef);
        })
      );
      
      // Añadir nuevas imágenes al final del array existente
      imageUrls = [...imageUrls, ...newImageUrls];
    }
    
    // Crear una copia de projectData para no modificar el original
    const updatedData = {
      ...projectData,
      images: imageUrls,
      updatedAt: serverTimestamp()
    };
    
    // Actualizar el documento en Firestore
    await updateDoc(docRef, updatedData);
    
    // Devolver objeto actualizado
    return {
      id,
      ...updatedData
    };
  } catch (error) {
    console.error("Error updating project: ", error);
    throw error;
  }
};

// Eliminar una imagen de un proyecto
export const deleteProjectImage = async (projectId, imageUrl) => {
  try {
    // Obtener referencia al documento
    const docRef = doc(db, 'projects', projectId);
    const projectSnapshot = await getDoc(docRef);
    
    if (!projectSnapshot.exists()) {
      throw new Error('Project not found');
    }
    
    // Obtener array actual de imágenes
    const currentData = projectSnapshot.data();
    const images = currentData.images || [];
    
    // Filtrar la imagen a eliminar
    const updatedImages = images.filter(url => url !== imageUrl);
    
    // Actualizar el documento con el nuevo array de imágenes
    await updateDoc(docRef, { 
      images: updatedImages,
      updatedAt: serverTimestamp()
    });
    
    // Eliminar la imagen de Storage
    // Extraer el nombre del archivo del URL
    const imagePath = decodeURIComponent(imageUrl.split('/o/')[1].split('?')[0]);
    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);
    
    return updatedImages;
  } catch (error) {
    console.error("Error deleting project image: ", error);
    throw error;
  }
};

// Eliminar un proyecto
export const deleteProject = async (id) => {
  if (!id) {
    console.error("ID de proyecto no proporcionado");
    throw new Error("Se requiere un ID de proyecto válido");
  }

  console.log("projectService: Iniciando eliminación del proyecto con ID:", id);
  
  try {
    // Obtener referencia al documento
    const projectRef = doc(db, 'projects', id);
    
    // Verificar si el proyecto existe
    const projectSnapshot = await getDoc(projectRef);
    
    if (!projectSnapshot.exists()) {
      console.error("Proyecto no encontrado:", id);
      throw new Error('Proyecto no encontrado');
    }
    
    // Obtener datos del proyecto, incluyendo imágenes
    const projectData = projectSnapshot.data();
    const images = projectData.images || [];
    
    console.log(`projectService: El proyecto tiene ${images.length} imágenes para eliminar`);
    
    // Eliminar cada imagen de Storage
    if (images.length > 0) {
      for (const imageUrl of images) {
        try {
          // Extraer el path de la imagen desde la URL
          if (!imageUrl || typeof imageUrl !== 'string') {
            console.warn('URL de imagen no válida:', imageUrl);
            continue;
          }
          
          if (!imageUrl.includes('/o/') || !imageUrl.includes('?')) {
            console.warn('Formato de URL no reconocido:', imageUrl);
            continue;
          }
          
          const imagePath = decodeURIComponent(imageUrl.split('/o/')[1].split('?')[0]);
          console.log('projectService: Eliminando imagen:', imagePath);
          
          const imageRef = ref(storage, imagePath);
          await deleteObject(imageRef);
        } catch (imageError) {
          // Solo registrar el error y continuar con las siguientes imágenes
          console.error("Error al eliminar imagen:", imageError);
        }
      }
    }
    
    // Eliminar el documento del proyecto
    console.log('projectService: Eliminando documento del proyecto...');
    await deleteDoc(projectRef);
    console.log('projectService: Proyecto eliminado con ID:', id);
    
    return id;
  } catch (error) {
    console.error("projectService: Error al eliminar proyecto:", error);
    throw error;
  }
};