export interface IXrayDiagnosis {
  id?: number;
  patientId?: number;
  filepath: string;
  classify: number;
  confident: number;
  note: string;
  status: string;
}

export interface IGetAllXrayDiagnosis {
  page?: number;
}
