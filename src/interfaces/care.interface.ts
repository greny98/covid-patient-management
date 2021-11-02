import { IPatient } from '@interfaces/patient.interface';
import { IDoctor } from '@interfaces/doctor.interface';

export interface ICare {
  id?: number;
  patientId?: number;
  doctorId?: number;
  responsibility: string;
  createdAt?: Date;
  patient?: IPatient;
  doctor?: IDoctor;
}

export interface IGetAllCares {
  page?: number;
}
