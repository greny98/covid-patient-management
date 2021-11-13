import { CreateXrayInputDto, UpdateXrayInputDto } from '@/dtos/xrayInput.dto';
import { IGetAllXrayInput, IXrayInput } from '@/interfaces/xrayInput.interface';
import XrayInputService from '@/services/xrayInput.service';
import { NextFunction, Request, Response, RequestHandler } from 'express';
import NotificationService from '@services/notification.service';
import CareService from '@services/care.service';
import { ENotiStatus } from '@interfaces/notification.interface';

class XrayInputController {
  public xrayInputService = new XrayInputService();
  public notificationService = new NotificationService();
  public careService = new CareService();

  public getAllXrayInput: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 0 } = req.query as IGetAllXrayInput;
      const findXrayInput: IXrayInput[] = await this.xrayInputService.findAllXrayInput(page);
      res.status(200).json({ data: findXrayInput, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createXrayInput: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const xrayInputData: CreateXrayInputDto = req.body;
      const createXrayInputData = await this.xrayInputService.createXrayInput(xrayInputData);
      res.status(201).json({ data: createXrayInputData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateXrayInput: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const xrayInputId = Number(req.params.id);
      const updateXrayInputData: IXrayInput = await this.xrayInputService.updateXrayInput(xrayInputId);
      const { doctor, patient } = await this.careService.findByPatientId(updateXrayInputData.patientId);
      await this.notificationService.createNotification({
        doctorId: doctor.id,
        status: ENotiStatus.UNSEEN,
        content: `Một ảnh x-quang của bệnh nhân ${patient.fullname} đã được chuẩn đoán.`,
        patientId: updateXrayInputData.patientId,
      });
      res.json({ data: updateXrayInputData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default XrayInputController;
