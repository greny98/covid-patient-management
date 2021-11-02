import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import MockupController from '@controllers/mockup.controller';

class MockupRoute implements Routes {
  public path = '/mockup';
  public router = Router();
  public mockupController = new MockupController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.mockupController.generateData);
  }
}

export default MockupRoute;
