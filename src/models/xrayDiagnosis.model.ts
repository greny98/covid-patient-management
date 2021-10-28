import { IXrayDiagnosis } from '@/interfaces/xrayDiagnosis.interface';
import { Sequelize, DataTypes, Model } from 'sequelize';
import { PatientModel } from './patient.model';

export class XrayDiagnosisModel extends Model<IXrayDiagnosis> implements IXrayDiagnosis {
  patientId: number;
  filepath: string;
  classify: number;
  confident: number;
  note: string;
  status: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof XrayDiagnosisModel {
  XrayDiagnosisModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      filepath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      classify: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      confident: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'xrayDiagnosis',
      sequelize,
    },
  );
  XrayDiagnosisModel.belongsTo(PatientModel, { foreignKey: { name: 'patientId' }, as: 'patient' });

  return XrayDiagnosisModel;
}
