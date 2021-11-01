import { CreatePatientDto } from '@/dtos/patient.dto';
import { IGetAllPatients, IPatient } from '@/interfaces/patient.interface';
import PatientService from '@/services/patient.service';
import { NextFunction, Request, Response, RequestHandler } from 'express';

class PatientController {
  public patientService = new PatientService();

  public getAllPatients: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 0 } = req.query as IGetAllPatients;
      const findAllPatientsData: IPatient[] = await this.patientService.findAllPatient(page);
      res.status(200).json({ data: findAllPatientsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createPatient: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const patientData: CreatePatientDto = req.body;
      const createPatientData: IPatient = await this.patientService.createPatient(patientData);
      res.status(201).json({ data: createPatientData, message: 'patient created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePatient: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const patientId = Number(req.params.id);
      const patientData: CreatePatientDto = req.body;
      const updatePatientData: IPatient = await this.patientService.updatePatient(patientId, patientData);
      res.json({ data: updatePatientData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default PatientController;
