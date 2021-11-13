import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import XrayDiagnosisController from '@/controllers/xrayDiagnosis.controller';
import { CreateXrayDiagnosisDto } from '@/dtos/xrayDiagnosis.dto';

class XrayDiagnosisRoute implements Routes {
  public path = '/xrayDiagnosis';
  public router = Router();
  public xrayDiagnosisController = new XrayDiagnosisController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.xrayDiagnosisController.getAllXrayDiagnosis);
    this.router.get(`${this.path}/getById`, this.xrayDiagnosisController.getDiagnosisByXrayId);
    this.router.post(`${this.path}`, validationMiddleware(CreateXrayDiagnosisDto, 'body'), this.xrayDiagnosisController.createXrayDiagnosis);
  }
}

export default XrayDiagnosisRoute;
