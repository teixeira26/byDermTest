import { Request, Response } from "express";
import { DoctorUseCase } from "../../application/doctorUseCase";

export class doctorController {

    private readonly doctorUseCase: DoctorUseCase;

    //inyecto doctordoctorCase para poder facilitar las pruebas unitarias
    constructor(doctorUseCase: DoctorUseCase) {
      this.doctorUseCase = doctorUseCase;
    }

    //Register
    async registerDoctor(req: Request, res: Response){
        const {name, license, lastName} = req.body;

        try {
            const doctorCreated = await this.doctorUseCase.registrarDoctor({name, license, lastName, quantityOfRecipes:[]})
            res.status(201).json(doctorCreated);
        } catch (error) {
            console.log(error);
            res.status(500).send("Error del servidor, Registerdoctor")
        }
    }

    //List
    async listDoctors(req: Request, res: Response){
        try{
            const doctor = await this.doctorUseCase.obtenerDoctors();
            res.status(200).json(doctor) 
        }catch(error){
            res.status(500).send("Error del Servidor, Listdoctor")
        }
    }

    //Delete
    async deleteDoctor(req: Request, res: Response){
        const doctorId = req.params.id;

        try{
            const deleted = await this.doctorUseCase.eliminarDoctor(doctorId);

            if(deleted){
                res.status(200).send("Se elimino el Doctor con exito");
            }else{
                res.status(404).send("Doctor no encontrado");
            }
        }catch(error){
            console.log(error);
            res.status(500).send("Error del servidor, deletedoctor");
        }
    }

    //Update
    async updateDoctor(req: Request, res: Response) {
        const doctorId = req.params.id;
        const { name, license, lastName, quantityOfRecipes } = req.body;
    
        try {
          const updated = await this.doctorUseCase.actualizarDoctor(doctorId, {
            name,
            license,
            lastName,
            quantityOfRecipes,
          });
    
          if (updated) {
            res.status(200).send("Se actualizo el Doctor con exito");
          } else {
            res.status(404).send("Doctor no encontrado");
          }
        } catch (error) {
          console.log(error);
          res.status(500).send("Error del servidor, updatedoctor");
        }
      }
  

}