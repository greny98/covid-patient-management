export interface IXrayDiagnosis {
  id?: number;
  patientId?: number;
  negativePneumonia: number;
  typicalAppearance: number;
  indeterminateAppearance: number;
  atypicalAppearance: number;
  note: string;
  status: string;
}

export interface IGetAllXrayDiagnosis {
  page?: number;
}
