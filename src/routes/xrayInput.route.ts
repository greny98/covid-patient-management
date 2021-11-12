import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import XrayInputController from '@controllers/xrayInput.controller';

class XrayInputRoute implements Routes {
  public path = '/xrayInput';
  public router = Router();
  public xrayInputController = new XrayInputController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.put(`${this.path}/:id(\\d+)`, this.xrayInputController.updateXrayInput);
  }
}

export default XrayInputRoute;
