import { DoctorEntity } from "./doctor.entity";
import { DoctorValue } from "./doctor.value";

//Creo una interfaz basado en el entity
export interface DoctorRepository {
    registerDoctor(user: DoctorEntity): Promise<string | null>;
    listDoctor(): Promise<DoctorEntity[] | null>;
    deleteDoctor(doctorId: string): Promise<boolean | null>;
    updateDoctor(doctorId: string, user: DoctorValue): Promise<boolean | null>; 
}