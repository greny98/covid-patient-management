export interface INotification {
  id?: number;
  doctorId?: number;
  content: string;
  status: string;
}

export interface IGetAllNoti {
  page?: number;
}
