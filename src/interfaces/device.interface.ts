export interface IDevice {
  id?: number;
  doctorId?: number;
  token: string;
  expiredAt: Date;
}
