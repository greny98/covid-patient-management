export interface ICare {
  id?: number;
  patientId?: number;
  doctorId?: number;
  responsibility: string;
}

export interface IGetAllCares {
  page?: number;
}
