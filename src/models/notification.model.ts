import { INotification } from '@/interfaces/notification.interface';
import { Sequelize, DataTypes, Model } from 'sequelize';
import { DoctorModel } from './doctor.model';

export class NotificationModel extends Model<INotification> implements INotification {
  doctorId: number;
  content: string;
  status: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof NotificationModel {
  NotificationModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'notifications',
      sequelize,
    },
  );

  NotificationModel.belongsTo(DoctorModel, { foreignKey: { name: 'doctorId' }, as: 'doctor' });

  return NotificationModel;
}
