export interface IXrayDiagnosis {
  id?: number;
  xrayInputId?: number;
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
export interface IGetXrayDiagnosisByXrayId {
  xrayInputId: number;
}
