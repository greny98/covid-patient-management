import { IDoctor } from '@/interfaces/doctor.interface';
import { Sequelize, DataTypes, Model } from 'sequelize';

export class DoctorModel extends Model<IDoctor> implements IDoctor {
  username: string;
  password: string;
  fullname: string;
  phone: string;
  position: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof DoctorModel {
  DoctorModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'doctors',
      sequelize,
    },
  );
  return DoctorModel;
}
