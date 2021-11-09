import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import CareController from '@/controllers/care.controller';
import { CreateCareDto } from '@/dtos/care.dto';

class CareRoute implements Routes {
  public path = '/cares';
  public router = Router();
  public careController = new CareController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.careController.getAllCaresCount);
    this.router.get(`${this.path}/filter`, this.careController.getByDate);
    this.router.get(`${this.path}/stats`, this.careController.getCaresByLastestSixMonth);
    this.router.post(`${this.path}`, validationMiddleware(CreateCareDto, 'body'), this.careController.createCare);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateCareDto, 'body'), this.careController.updateCare);
  }
}

export default CareRoute;
