process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import DoctorRoute from './routes/doctor.route';
import PatientRoute from './routes/patient.route';
import CareRoute from './routes/care.route';
import NotificationRoute from './routes/notification.route';
import DeviceRoute from './routes/device.route';
import XrayDiagnosisRoute from './routes/xrayDiagnosis.route';
import MockupRoute from '@routes/mockup.route';
import UploadRoute from '@routes/upload.routes';
import XrayInputRoute from '@routes/xrayInput.route';

import validateEnv from '@utils/validateEnv';
validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new DoctorRoute(),
  new PatientRoute(),
  new CareRoute(),
  new NotificationRoute(),
  new DeviceRoute(),
  new XrayDiagnosisRoute(),
  new MockupRoute(),
  new UploadRoute(),
  new XrayInputRoute(),
]);

app.listen();
