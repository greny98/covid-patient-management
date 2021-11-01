import { CreateDeviceDto } from '@/dtos/device.dto';
import { IDevice, IGetAllDevices } from '@/interfaces/device.interface';
import DeviceService from '@/services/device.service';
import { NextFunction, Request, Response, RequestHandler } from 'express';

class DeviceController {
  public deviceService = new DeviceService();

  public getAllDevices: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 0 } = req.query as IGetAllDevices;
      const findDeviceData: IDevice[] = await this.deviceService.findAllDevices(page);
      res.status(200).json({ data: findDeviceData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createDevices: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deviceData: CreateDeviceDto = req.body;
      const createDeviceData = await this.deviceService.createDevices(deviceData);
      res.status(201).json({ data: createDeviceData, message: 'device created' });
    } catch (error) {
      next(error);
    }
  };

  public updateDevice: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deviceId = Number(req.params.id);
      const deviceData: CreateDeviceDto = req.body;
      const updateDeviceData: IDevice = await this.deviceService.updateDevice(deviceId, deviceData);
      res.json({ data: updateDeviceData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default DeviceController;
