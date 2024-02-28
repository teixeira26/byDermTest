import express from 'express';
import { FirebaseDoctorRepository } from '../repositories/firebaseDoctorRepository';
import { DoctorUseCase } from '../../application/doctorUseCase';
import { doctorController } from '../controller/useController';

//creo las instancias.
const doctorRepository = new FirebaseDoctorRepository(); 
const doctorUseCase = new DoctorUseCase(doctorRepository);
const DoctorController = new doctorController(doctorUseCase);

const useRouter = express.Router();

useRouter.post('/register', (req, res) => DoctorController.registerDoctor(req, res));
useRouter.get('/list', (req, res) => DoctorController.listDoctors(req, res));
useRouter.delete('/delete/:id', (req, res) => DoctorController.deleteDoctor(req, res));
useRouter.put('/update/:id', (req, res) => DoctorController.updateDoctor(req, res));

export default useRouter;