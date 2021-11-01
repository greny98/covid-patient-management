export interface IPatient {
  id?: number;
  fullname: string;
  phone: string;
  note: string;
}

export interface IGetAllPatients {
  page?: number;
}
