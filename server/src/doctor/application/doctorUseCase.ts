//Importo de doctorepository
import { DoctorRepository } from "../domain/doctor.repository"
import { DoctorValue } from "../domain/doctor.value"


export class DoctorUseCase {

    //Inyecto las dependencias y facilito las pruebas initarias
    constructor(private readonly doctorRepository: DoctorRepository) {}

    //Register
    public async registrarDoctor({ name, license }: { name: string; license: number; }) {
        //Creo la instancia useValue con los parametros que ingresan
        const useValue = new DoctorValue({ name, license });
        
        //Registro al Doctor utilizando doctorRepository
        const doctorCreated = await this.doctorRepository.registerDoctor(useValue)
        return doctorCreated
    }

    //List
    public async obtenerDoctors() {
        //Restorna la lista de Doctors ya registrados, tambien utilizando doctorRepository
        const doctors = await this.doctorRepository.listDoctor();
        return doctors;
    }

    //DELETE
    public async eliminarDoctor(doctorId: string): Promise<boolean | null> {
        try {
            const deleted = await this.doctorRepository.deleteDoctor(doctorId);
            return deleted !== null ? true : false;  
        } catch (error) {
            console.error('Error deleting doctor:', error);
            return null;  
        }
    }
    
    //UPDATE
    public async actualizarDoctor(
        doctorId: string,
        { name, license, }: { name: string; license: number; }
      ): Promise<boolean | null> {
        try {
          const updated = await this.doctorRepository.updateDoctor(doctorId, {
            name,
            license,
          
          });
          return updated !== null ? true : false;
        } catch (error) {
          console.error('Error updating doctor:', error);
          return null;
        }
      }


}
