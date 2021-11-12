import config from 'config';
import Sequelize from 'sequelize';
import { dbConfig } from '@interfaces/db.interface';
import { logger } from '@utils/logger';
import UserModel from '@models/users.model';
import PatientModel from '@/models/patient.model';
import DoctorModel from '@/models/doctor.model';
import CareModel from '@/models/care.model';
import NotificationModel from '@/models/notification.model';
import DeviceModel from '@/models/device.model';
import XrayDiagnosisModel from '@/models/xrayDiagnosis.model';
import XrayInputModel from '@/models/xrayInput.model';
import XrayOutputModel from '@/models/xrayOutput.model';

const { host, user, password, database, pool }: dbConfig = config.get('dbConfig');
const sequelize = new Sequelize.Sequelize(database, user, password, {
  host: host,
  dialect: 'mysql',
  timezone: '+07:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: pool.min,
    max: pool.max,
  },
  logQueryParameters: process.env.NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();

const DB = {
  Users: UserModel(sequelize),
  Patients: PatientModel(sequelize),
  Doctors: DoctorModel(sequelize),
  Cares: CareModel(sequelize),
  Notifications: NotificationModel(sequelize),
  Devices: DeviceModel(sequelize),
  XrayInput: XrayInputModel(sequelize),
  XrayOutput: XrayOutputModel(sequelize),
  XrayDiagnosis: XrayDiagnosisModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
