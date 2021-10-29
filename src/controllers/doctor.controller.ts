import { CreateDoctorDto } from '@/dtos/doctor.dto';
import { IDoctor } from '@/interfaces/doctor.interface';
import DoctorService from '@/services/doctor.service';
import { NextFunction, Request, Response, RequestHandler } from 'express';

class DoctorController {
  public doctorService = new DoctorService();

  public getAllDoctors: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllDoctorsData: IDoctor[] = await this.doctorService.findAllDoctor();
      res.status(200).json({ data: findAllDoctorsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createDoctor: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorData: CreateDoctorDto = req.body;
      const createDoctorData: IDoctor = await this.doctorService.createDoctor(doctorData);
      res.status(201).json({ data: createDoctorData, message: 'doctor created' });
    } catch (error) {
      next(error);
    }
  };
}

export default DoctorController;
