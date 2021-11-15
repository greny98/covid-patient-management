export interface INotification {
  id?: number;
  doctorId?: number;
  patientId?: number;
  content: string;
  status: string;
}

export interface IGetAllNoti {
  doctorId?: number;
  page?: number;
}

export enum ENotiStatus {
  UNSEEN = 'UNSEEN',
  SEEN = 'SEEN',
}
