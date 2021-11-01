import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import DeviceController from '@/controllers/device.controller';
import { CreateDeviceDto } from '@/dtos/device.dto';

class DeviceRoute implements Routes {
  public path = '/devices';
  public router = Router();
  public deviceController = new DeviceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.deviceController.getAllDevices);
    this.router.post(`${this.path}`, validationMiddleware(CreateDeviceDto, 'body'), this.deviceController.createDevices);
  }
}

export default DeviceRoute;
