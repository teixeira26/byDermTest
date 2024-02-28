
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

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

      querySnapshot.forEach((doc) => {
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
    const doctorDocRef = doc(db, 'doctors', doctorId);
    const doctorData = {
      name: DoctorValue.name,
      license: DoctorValue.license,
    };

    await updateDoc(doctorDocRef, doctorData);
    return true;
  } catch (error) {
    console.error('Error updating doctor:', error);
    return false; 
  }
}
}
