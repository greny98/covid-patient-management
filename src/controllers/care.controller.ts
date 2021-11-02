import { CreateCareDto } from '@/dtos/care.dto';
import { ICare, IGetAllCares } from '@/interfaces/care.interface';
import CareService from '@/services/care.service';
import { NextFunction, Request, Response, RequestHandler } from 'express';
import { IFilterPatients, IPatient } from '@interfaces/patient.interface';

class CareController {
  public careService = new CareService();

  public getByDate: RequestHandler<any, any, IFilterPatients, any> = async (req, res, next) => {
    try {
      const { date = new Date(), doctorId = 0 } = req.query as IFilterPatients;
      const findAllPatientsData: ICare[] = await this.careService.filterPatients(doctorId, date);
      res.status(200).json({ data: findAllPatientsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getAllCares: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 0 } = req.query as IGetAllCares;
      const findAllCaresData: ICare[] = await this.careService.findAllCares(page);
      res.status(200).json({ data: findAllCaresData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createCare: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const careData: CreateCareDto = req.body;
      const createCareData: ICare = await this.careService.createCares(careData);
      res.status(201).json({ data: createCareData, message: 'care created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCare: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const careId = Number(req.params.id);
      const careData: CreateCareDto = req.body;
      const updateCareData: ICare = await this.careService.updateCare(careId, careData);
      res.json({ data: updateCareData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default CareController;
