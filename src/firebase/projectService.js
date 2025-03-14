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
    
    const currentData = projectSnapshot.data();
    let imageUrls = currentData.images || [];
    
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
      
      // Actualizar array de imágenes
      imageUrls = [...imageUrls, ...newImageUrls];
    }
    
    // Actualizar proyecto
    const updatedData = {
      ...projectData,
      images: imageUrls,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(docRef, updatedData);
    
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
  try {
    // Obtener primero las imágenes para borrarlas de Storage
    const projectRef = doc(db, 'projects', id);
    const projectSnapshot = await getDoc(projectRef);
    
    if (projectSnapshot.exists()) {
      const projectData = projectSnapshot.data();
      const images = projectData.images || [];
      
      // Eliminar cada imagen de Storage
      await Promise.all(
        images.map(async (imageUrl) => {
          try {
            // Extraer el nombre del archivo del URL
            const imagePath = decodeURIComponent(imageUrl.split('/o/')[1].split('?')[0]);
            const imageRef = ref(storage, imagePath);
            await deleteObject(imageRef);
          } catch (error) {
            console.error("Error deleting image: ", error);
            // Continuar con las siguientes imágenes incluso si falla una
          }
        })
      );
    }
    
    // Eliminar el documento del proyecto
    await deleteDoc(projectRef);
    return id;
  } catch (error) {
    console.error("Error deleting project: ", error);
    throw error;
  }
};