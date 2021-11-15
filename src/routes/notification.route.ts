import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import NotificationController from '@/controllers/notification.controller';
import { CreateNotificationDto } from '@/dtos/notification.dto';

class NotificationRoute implements Routes {
  public path = '/notifications';
  public router = Router();
  public notificationController = new NotificationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.notificationController.getAllNotificationsByDoctorId);
    this.router.get(`${this.path}/unseen`, this.notificationController.getCountUnseen);
    this.router.post(`${this.path}`, validationMiddleware(CreateNotificationDto, 'body'), this.notificationController.createNoti);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateNotificationDto, 'body'), this.notificationController.updateNoti);
  }
}

export default NotificationRoute;
