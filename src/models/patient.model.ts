import { IPatient } from '@/interfaces/patient.interface';
import { Sequelize, DataTypes, Model } from 'sequelize';
import { EStatus } from '@interfaces/xrayInput.interface';

export class PatientModel extends Model<IPatient> implements IPatient {
  public fullname: string;
  public phone: string;
  public note: string;
  public status: string;
  public patientId?: number;

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
      status: {
        type: DataTypes.STRING,
        defaultValue: EStatus.IN_PROGRESS,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    },
    {
      tableName: 'patients',
      sequelize,
    },
  );
  return PatientModel;
}
