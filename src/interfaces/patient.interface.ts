export interface IPatient {
  id?: number;
  fullname: string;
  phone: string;
  note: string;
  status?: string;
}

export interface IGetAllPatients {
  page?: number;
}

export interface IFilterPatients {
  date: Date;
  doctorId: number;
}
