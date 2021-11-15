import { CreateNotificationDto } from '@/dtos/notification.dto';
import { IGetAllNoti, INotification } from '@/interfaces/notification.interface';
import NotificationService from '@/services/notification.service';
import { NextFunction, Request, Response, RequestHandler } from 'express';

class NotificationController {
  public notiService = new NotificationService();

  public getAllNotificationsByDoctorId: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { doctorId = 1, page = 0 } = req.query as IGetAllNoti;
      const findAllNotificationsData: INotification[] = await this.notiService.findAllNotifications(doctorId, page);
      res.status(200).json({ data: findAllNotificationsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCountUnseen: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { doctorId = 1 } = req.query as IGetAllNoti;
      const findAllNotificationsData: INotification[] = await this.notiService.countAllUnseenNoti(doctorId);
      res.status(200).json({ data: findAllNotificationsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createNoti: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notiData: CreateNotificationDto = req.body;
      const createnotiData: INotification = await this.notiService.createNotification(notiData);
      res.status(201).json({ data: createnotiData, message: 'noti created' });
    } catch (error) {
      next(error);
    }
  };

  public updateNoti: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notificationId = Number(req.params.id);
      const notiData: CreateNotificationDto = req.body;
      const updateNotiData: INotification = await this.notiService.updateNotification(notificationId, notiData);
      res.json({ data: updateNotiData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default NotificationController;
