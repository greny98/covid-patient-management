import { IXrayOutput } from '@/interfaces/xrayOutput.interface';
import { Sequelize, DataTypes, Model } from 'sequelize';
import { XrayInputModel } from './xrayInput.model';

export class XrayOutputModel extends Model<IXrayOutput> implements IXrayOutput {
  xrayInputId: number;
  filepath: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof XrayOutputModel {
  XrayOutputModel.init(
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
    },
    {
      tableName: 'xrayOutput',
      sequelize,
    },
  );
  XrayOutputModel.belongsTo(XrayInputModel, { foreignKey: { name: 'xrayInputId' }, as: 'xrayInput' });

  return XrayOutputModel;
}
