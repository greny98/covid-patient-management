import { ICare } from '@/interfaces/care.interface';
import { Sequelize, DataTypes, Model } from 'sequelize';
import { DoctorModel } from './doctor.model';
import { PatientModel } from './patient.model';
import { IDoctor } from '@interfaces/doctor.interface';
import { IPatient } from '@interfaces/patient.interface';

export class CareModel extends Model<ICare> implements ICare {
  // responsibility: string;
  patientId: number;
  doctorId: number;
  doctor?: IDoctor;
  patient?: IPatient;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CareModel {
  CareModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      // responsibility: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
    },
    {
      tableName: 'cares',
      sequelize,
    },
  );
  CareModel.belongsTo(DoctorModel, { foreignKey: { name: 'doctorId' }, as: 'doctor' });
  CareModel.belongsTo(PatientModel, { foreignKey: { name: 'patientId' }, as: 'patient' });

  return CareModel;
}
