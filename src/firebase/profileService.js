// src/firebase/profileService.js
import { db } from './config';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';

// ID del documento que almacenará la información personal
const PROFILE_DOC_ID = 'main_profile';

// Obtener el perfil
export const getProfile = async () => {
  const docRef = doc(db, 'profile', PROFILE_DOC_ID);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data()
    };
  } else {
    // Si no existe, devuelve un objeto con valores predeterminados
    return {
      id: PROFILE_DOC_ID,
      name: 'Aylinn Carré',
      title: 'Estudiante de Diseño',
      email: 'aylinniglerre@gmail.com',
      phone: '232 379 64 17',
      location: 'Monterrey, Nuevo León',
      about: 'Estudiante de sexto semestre de la Licenciatura en Diseño en el Tecnológico de Monterrey. Mi enfoque profesional se centra en el diseño industrial y visual, con particular interés en crear soluciones que mejoren la vida cotidiana de las personas.',
      vision: 'Mi visión como diseñadora es crear objetos y experiencias que no solo sean estéticamente atractivos, sino que también resuelvan problemas reales y aporten valor a la sociedad.',
      approach: 'Mi enfoque de diseño se caracteriza por la atención meticulosa a los detalles, la búsqueda de soluciones innovadoras y una estética minimalista pero expresiva.',
      social: {
        instagram: 'https://www.instagram.com/itslynncarre/',
        linkedin: 'https://www.linkedin.com/in/aylinn-iglesias-carré-244b20340/',
        behance: ''
      },
      education: [],
      experience: [],
      skills: [],
      software: [],
      languages: [],
      interests: [],
      activities: []
    };
  }
};

// Guardar o actualizar el perfil
export const updateProfile = async (profileData) => {
  try {
    const docRef = doc(db, 'profile', PROFILE_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Actualizar documento existente
      await updateDoc(docRef, {
        ...profileData,
        updatedAt: serverTimestamp()
      });
    } else {
      // Crear nuevo documento
      await setDoc(docRef, {
        ...profileData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    
    return {
      id: PROFILE_DOC_ID,
      ...profileData
    };
  } catch (error) {
    console.error("Error updating profile: ", error);
    throw error;
  }
};