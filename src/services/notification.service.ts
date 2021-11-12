import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { INotification } from '@/interfaces/notification.interface';
import { CreateNotificationDto } from '@/dtos/notification.dto';
import { DoctorModel } from '@/models/doctor.model';
import DeviceService from '@services/device.service';
import axios from 'axios';

class NotificationService {
  public notification = DB.Notifications;
  public deviceService = new DeviceService();

  public async findAllNotifications(page: number): Promise<INotification[]> {
    const limit = 10;
    const offset = page * limit;
    const allNotifications: INotification[] = await this.notification.findAll({
      limit,
      offset,
      include: {
        model: DoctorModel,
        as: 'doctor',
      },
    });
    return allNotifications;
  }

  public async createNotification(notificationData: CreateNotificationDto): Promise<INotification> {
    if (isEmpty(notificationData)) throw new HttpException(400, "You're not notificationData");
    // TODO: should check exist or not
    const noti = await this.notification.create({ ...notificationData });
    const device = await this.deviceService.findByDoctorId(notificationData.doctorId);
    const data = {
      to: device.token,
      sound: 'default',
      title: 'Thông báo',
      body: noti.content,
    };
    await axios.post('https://exp.host/--/api/v2/push/send', data);
    return noti;
  }

  public async updateNotification(notificationId: number, notificationData: CreateNotificationDto): Promise<INotification> {
    if (isEmpty(notificationData)) throw new HttpException(400, "You're not notiData");

    const findNotification: INotification = await this.notification.findByPk(notificationId);

    if (!findNotification) {
      throw new HttpException(400, "You're not a noti");
    }
    await this.notification.update({ ...notificationData }, { where: { id: notificationId } });

    const updateNotification: INotification = await this.notification.findByPk(notificationId);
    return updateNotification;
  }
  // TODO: Search by date, Delete
}

export default NotificationService;
