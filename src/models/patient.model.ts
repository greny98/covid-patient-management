import { IPatient } from '@/interfaces/patient.interface';
import { Sequelize, DataTypes, Model } from 'sequelize';

export class PatientModel extends Model<IPatient> implements IPatient {
  public fullname: string;
  public phone: string;
  public note: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof PatientModel {
  PatientModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
      },
    },
    {
      tableName: 'patients',
      sequelize,
    },
  );
  return PatientModel;
}
