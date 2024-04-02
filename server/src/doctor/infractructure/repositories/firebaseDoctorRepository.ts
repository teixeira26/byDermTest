
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';

import { db } from '../../../firebase/firebase.config';
import { DoctorEntity } from '../../domain/doctor.entity';
import { DoctorValue } from '../../domain/doctor.value';

export class FirebaseDoctorRepository {

  //Register
    async registerDoctor(DoctorValue: DoctorValue): Promise<string | null> {
        try {
          // Convierte DoctorValue a un objeto plano
          const doctorData = {
            name: DoctorValue.name,
            license: DoctorValue.license,
            lastName: DoctorValue.lastName,
            quantityOfRecipes: []
          };
    
          const doctorsCollection = collection(db, 'doctors');
          const docRef = await addDoc(doctorsCollection, doctorData);
          return docRef.id;
        } catch (error) {
          console.error('Error registering doctor:', error);
          return null;
        }
      }

  //List
  async listDoctor(): Promise<DoctorEntity[] | null> {
    try {
      const doctorsCollection = collection(db, 'doctors');
      const querySnapshot = await getDocs(doctorsCollection);
      const doctors: DoctorEntity[] = [];

      querySnapshot.forEach((doc: any) => {
        const doctorData = doc.data() as DoctorEntity;
        const doctor: DoctorEntity = { ...doctorData, id: doc.id };
        doctors.push(doctor);
      });

      return doctors;
    } catch (error) {
      console.error('Error listing doctors:', error);
      return null;
    }
  }

  //Delete
  async deleteDoctor(doctorId: string): Promise<boolean | null> {
    try {
        const doctorDocRef = doc(db, 'doctors', doctorId);
        await deleteDoc(doctorDocRef);
        return true;
    } catch (error) {
        console.error('Error deleting doctor:', error);
        return false;  
    }
}

//Update
async updateDoctor(doctorId: string, DoctorValue: DoctorValue): Promise<boolean | null> {
  try {

    const doctorsCollection = collection(db, 'doctors');
    const doctorDoc = doc(doctorsCollection, doctorId);
    const doctorSnapshot = await getDoc(doctorDoc);
    
    const doctorRecipes = doctorSnapshot.data()?.quantityOfRecipes;
    let quantityOfRecipes = doctorRecipes;

    DoctorValue.quantityOfRecipes.forEach((recipe: any) => {
      const indiceCoincidencia = doctorRecipes.findIndex((item: any) => item.name === recipe.name && item.quantity === recipe.quantity);
      
      console.log(doctorRecipes)
      if (indiceCoincidencia !== -1) {
        doctorRecipes[indiceCoincidencia].count++;
      } else {
          doctorRecipes.push({count: 1, name: recipe.name, quantity: recipe.quantity});
      }
  });

  console.log( doctorRecipes);



    const doctorDocRef = doc(db, 'doctors', doctorId);
    const doctorData = {
      name: DoctorValue.name,
      license: DoctorValue.license,
      lastName: DoctorValue.lastName,
      quantityOfRecipes: doctorRecipes
    };
    console.log(doctorData)

    await updateDoc(doctorDocRef, doctorData);
    return true;
  } catch (error) {
    console.error('Error updating doctor:', error);
    return false; 
  }
}
}
