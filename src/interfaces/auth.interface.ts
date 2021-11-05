import { Request } from 'express';
import { IDoctor } from './doctor.interface';

export interface DataStoredInToken {
  id?: number;
}

export interface TokenData {
  token: string;
  expiresIn?: number;
}

export interface RequestWithDoctor extends Request {
  doctor: IDoctor;
}
