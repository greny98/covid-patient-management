import { CreatePatientDto } from '@/dtos/patient.dto';
import { IGetAllPatients, IPatient } from '@/interfaces/patient.interface';
import PatientService from '@/services/patient.service';
import { NextFunction, Request, Response, RequestHandler } from 'express';
import XrayInputService from '@services/xrayInput.service';
import XrayOutputService from '@services/xrayOutput.service';

class PatientController {
  public patientService = new PatientService();
  public xrayInputService = new XrayInputService();
  public xrayOutputService = new XrayOutputService();

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

  public getById: RequestHandler = async (req, res, next) => {
    try {
      const patientId = Number(req.params.id);
      const patient = await this.patientService.findById(patientId);
      if (!patient) {
        return res.status(400).json({ message: "Patient Id doesn't exist!" });
      }
      const xrayInputs = await this.xrayInputService.findByPatientId(patientId);
      const xrayOutputs = await Promise.all(xrayInputs.map(inp => this.xrayOutputService.findByInput(inp.id)));
      for (let i = 0; i < xrayInputs.length; i++) {
        (xrayInputs[i] as any).dataValues.xrayOutput = xrayOutputs[i];
      }
      res.json({
        data: {
          patient,
          xrayInputs,
          // xrayOutputs,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}

export default PatientController;
