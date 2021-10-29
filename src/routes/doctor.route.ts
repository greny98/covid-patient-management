import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import DoctorController from '@/controllers/doctor.controller';
import { CreateDoctorDto } from '@/dtos/doctor.dto';

class DoctorRoute implements Routes {
  public path = '/doctors';
  public router = Router();
  public doctorController = new DoctorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.doctorController.getAllDoctors);
    this.router.post(`${this.path}`, validationMiddleware(CreateDoctorDto, 'body'), this.doctorController.createDoctor);
  }
}

export default DoctorRoute;
