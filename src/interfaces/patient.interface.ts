import { IAuthReq } from './doctor.interface';

export interface IPatient {
  id?: number;
  fullname: string;
  phone: string;
  note: string;
  status?: string;
  createdAt?: Date;
}

export interface IGetAllPatients {
  page?: number;
}

export interface IFilterPatients {
  date: Date;
  doctorId: number;
}

export interface ICreatePatientBody {
  patientData: IPatient;
  doctorId: number;
}
