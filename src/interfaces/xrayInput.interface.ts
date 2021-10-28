export interface IXrayInput {
  id?: number;
  patientId?: number;
  xrayOutputId?: number;
  filepath: string;
  status: string;
  note: string;
}
