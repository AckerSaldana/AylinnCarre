import { storage } from './config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// Función para redimensionar imagen antes de subir
export const resizeImage = (file, maxWidth = 1200) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      
      img.onload = () => {
        // Solo redimensionar si es más grande que el ancho máximo
        if (img.width <= maxWidth) {
          resolve(file);
          return;
        }
        
        const canvas = document.createElement('canvas');
        const ratio = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * ratio;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Convertir a Blob
        canvas.toBlob((blob) => {
          // Crear un nuevo archivo a partir del blob
          const resizedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now()
          });
          
          resolve(resizedFile);
        }, file.type, 0.85); // 85% de calidad para JPEG
      };
      
      img.onerror = (error) => {
        reject(error);
      };
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

// Función para subir imagen optimizada
export const uploadOptimizedImage = async (file, folderPath = 'projects') => {
  try {
    // Redimensionar imagen si es necesario
    const optimizedFile = await resizeImage(file);
    
    // Generar nombre único para el archivo
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const fullPath = `${folderPath}/${fileName}`;
    
    // Referencia al almacenamiento
    const storageRef = ref(storage, fullPath);
    
    // Subir archivo
    await uploadBytes(storageRef, optimizedFile);
    
    // Obtener URL de descarga
    const downloadURL = await getDownloadURL(storageRef);
    
    return {
      url: downloadURL,
      path: fullPath,
      fileName: fileName
    };
  } catch (error) {
    console.error('Error uploading optimized image:', error);
    throw error;
  }
};