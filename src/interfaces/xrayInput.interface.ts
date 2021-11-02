import { IXrayOutput } from '@interfaces/xrayOutput.interface';

export interface IXrayInput {
  id?: number;
  patientId?: number;
  xrayOutputId?: number;
  xrayOutput?: IXrayOutput;
  filepath: string;
  status: string;
  note: string;
}

export interface IGetAllXrayInput {
  page?: number;
}

export enum EStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}
