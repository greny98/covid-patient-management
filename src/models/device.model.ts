import { IDevice } from '@/interfaces/device.interface';
import { Sequelize, DataTypes, Model } from 'sequelize';
import { DoctorModel } from './doctor.model';

export class DeviceModel extends Model<IDevice> implements IDevice {
  id?: number;
  doctorId: number;
  token: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof DeviceModel {
  DeviceModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'devices',
      sequelize,
    },
  );

  DeviceModel.belongsTo(DoctorModel, { foreignKey: { name: 'doctorId' }, as: 'doctor' });

  return DeviceModel;
}
