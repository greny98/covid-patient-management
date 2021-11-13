export interface IDevice {
  id?: number;
  doctorId?: number;
  token: string;
}

export interface IGetAllDevices {
  page?: number;
}
