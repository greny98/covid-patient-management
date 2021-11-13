import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import DeviceController from '@/controllers/device.controller';

class DeviceRoute implements Routes {
  public path = '/devices';
  public router = Router();
  public deviceController = new DeviceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.deviceController.getAllDevices);
    this.router.post(`${this.path}`, this.deviceController.createDevices);
  }
}

export default DeviceRoute;
