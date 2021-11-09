import { EStatus } from '@interfaces/xrayInput.interface';
import { CreateXrayInputDto } from '@dtos/xrayInput.dto';
import { CreateCareDto } from '@dtos/care.dto';
import { CreateDoctorDto } from '@dtos/doctor.dto';
import { CreatePatientDto } from '@dtos/patient.dto';
import { CreateXrayOutputDto } from '@dtos/xrayOutput.dto';

export const patients: CreatePatientDto[] = [
  { phone: '+84337676999', fullname: 'Nguyen Anh Tuan', note: '' },
  { phone: '+84337676888', fullname: 'Le Quang Anh', note: 'Fuck boy!!!' },
  { phone: '+84337676777', fullname: 'Nguyen Minh Huy', note: 'Fuck king!!!' },
  { phone: '+84337676998', fullname: 'Nguyen Anh Tuan 1', note: '' },
  { phone: '+84337676887', fullname: 'Le Quang Anh 1', note: 'Fuck boy!!!' },
  { phone: '+84337676776', fullname: 'Nguyen Minh Huy 1', note: 'Fuck king!!!' },
  { phone: '+84337676995', fullname: 'Nguyen Anh Tuan 2', note: '' },
  { phone: '+84337676884', fullname: 'Le Quang Anh 2', note: 'Fuck boy!!!' },
  { phone: '+84337676773', fullname: 'Nguyen Minh Huy 2', note: 'Fuck king!!!' },
];

export const xrayInputs: CreateXrayInputDto[] = [
  { filepath: 'img1.png', status: EStatus.IN_PROGRESS, note: '', patientId: 1 },
  { filepath: 'img2.png', status: EStatus.IN_PROGRESS, note: '', patientId: 2 },
  { filepath: 'img3.png', status: EStatus.IN_PROGRESS, note: '', patientId: 1 },
];

export const xrayOutputs: CreateXrayOutputDto[] = [
  { filepath: 'img1.png', xrayInputId: 1 },
  { filepath: 'img2.png', xrayInputId: 2 },
  { filepath: 'img3.png', xrayInputId: 3 },
];

export const doctors: CreateDoctorDto[] = [
  { phone: '+84337676999', fullname: 'Nguyen Anh Tuan', username: 'tuanna', password: 'tuan1234', position: 'Viện trưởng' },
  { phone: '+84337676888', fullname: 'Le Quang Anh', username: 'qanhfb', password: 'qanh1234', position: 'Tiến sĩ phụ sản' },
];

export const cares: CreateCareDto[] = [
  { patientId: 1, doctorId: 1 },
  { patientId: 2, doctorId: 1 },
  { patientId: 3, doctorId: 1 },
  { patientId: 4, doctorId: 1 },
  { patientId: 5, doctorId: 2 },
  { patientId: 6, doctorId: 2 },
  { patientId: 7, doctorId: 2 },
  { patientId: 8, doctorId: 2 },
  { patientId: 9, doctorId: 2 },
];
