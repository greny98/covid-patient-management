import { IXrayInput } from '@/interfaces/xrayInput.interface';
import { Sequelize, DataTypes, Model } from 'sequelize';
import { PatientModel } from './patient.model';

export class XrayInputModel extends Model<IXrayInput> implements IXrayInput {
  patientId: number;
  xrayOutputId?: number;
  filepath: string;
  status: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof XrayInputModel {
  XrayInputModel.init(
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
      xrayOutputId: {
        type: DataTypes.INTEGER,
        defaultValue: -1,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'xrayInput',
      sequelize,
    },
  );
  XrayInputModel.belongsTo(PatientModel, { foreignKey: { name: 'patientId' }, as: 'patient' });
  return XrayInputModel;
}
