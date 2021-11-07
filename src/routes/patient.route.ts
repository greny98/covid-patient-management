import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import PatientController from '@/controllers/patient.controller';
import { CreatePatientDto } from '@/dtos/patient.dto';

class PatientRoute implements Routes {
  public path = '/patients';
  public router = Router();
  public patientController = new PatientController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.patientController.getAllPatients);
    this.router.get(`${this.path}/:id(\\d+)`, this.patientController.getById);
    this.router.get(`${this.path}/bydate`, this.patientController.getPatientsByDate);
    this.router.post(`${this.path}`, validationMiddleware(CreatePatientDto, 'body'), this.patientController.createPatient);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreatePatientDto, 'body'), this.patientController.updatePatient);
  }
}

export default PatientRoute;
