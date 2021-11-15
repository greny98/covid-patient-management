import { CreateXrayDiagnosisDto } from '@/dtos/xrayDiagnosis.dto';
import { IGetAllXrayDiagnosis, IXrayDiagnosis } from '@/interfaces/xrayDiagnosis.interface';
import XrayDiagnosisService from '@/services/xrayDiagnosis.service';
import { NextFunction, Request, Response, RequestHandler } from 'express';

class XrayDiagnosisController {
  public xrayDiagnosisService = new XrayDiagnosisService();

  public getAllXrayDiagnosis: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 0 } = req.query as IGetAllXrayDiagnosis;
      const findXrayDiagnosis: IXrayDiagnosis[] = await this.xrayDiagnosisService.findAllXrayDiagnosis(page);
      res.status(200).json({ data: findXrayDiagnosis, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getDiagnosisByXrayId: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { xrayInputId } = req.query as any;
      const findXrayDiagnosis: IXrayDiagnosis = await this.xrayDiagnosisService.findXrayDiagnosisByXrayId(xrayInputId);
      res.status(200).json({ data: findXrayDiagnosis, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createXrayDiagnosis: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const xrayDiagnosisData: CreateXrayDiagnosisDto = req.body;
      const createXrayDiagnosisData = await this.xrayDiagnosisService.createXrayDiagnosis(xrayDiagnosisData);
      res.status(201).json({ data: createXrayDiagnosisData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateXrayDiagnosis: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const xrayDiagnosisId = Number(req.params.id);
      const xrayDiagnosisData: CreateXrayDiagnosisDto = req.body;
      const updateXrayDiagnosisData: IXrayDiagnosis = await this.xrayDiagnosisService.updateXrayDiagnosis(xrayDiagnosisId, xrayDiagnosisData);
      res.json({ data: updateXrayDiagnosisData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default XrayDiagnosisController;
