import { CreatePatientDto } from '@/dtos/patient.dto';
import { ICreatePatientBody, IGetAllPatients, IPatient } from '@/interfaces/patient.interface';
import PatientService from '@/services/patient.service';
import { NextFunction, Request, Response, RequestHandler } from 'express';
import XrayInputService from '@services/xrayInput.service';
import XrayOutputService from '@services/xrayOutput.service';
import CareService from '@/services/care.service';
import moment from 'moment';
import { CreateCareDto } from '@/dtos/care.dto';
import { ICare } from '@/interfaces/care.interface';

type FilterByDate = { date: Date; page: number };

class PatientController {
  public patientService = new PatientService();
  public careService = new CareService();
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
      const { patientData, doctorId } = req.body as ICreatePatientBody;
      //TODO: get doctorId by middleware
      // CREATE PATIENT
      const createPatientData: IPatient = await this.patientService.createPatient(patientData);
      // CREATE CARES
      const careData: CreateCareDto = {
        patientId: createPatientData.id,
        doctorId,
      };
      const createCareData: ICare = await this.careService.createCares(careData);
      res.status(201).json({ data: { createPatientData, createCareData }, message: 'patient created' });
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

  // public getPatientsByDate: RequestHandler<any, any, FilterByDate, any> = async (req, res, next) => {
  //   try {
  //     const { date, page = 0 } = req.query;
  //     const allPatients = await this.patientService.findAllByDate(moment(date).toDate(), page);
  //     res.status(200).json({ data: allPatients, message: 'findByDate' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export default PatientController;
