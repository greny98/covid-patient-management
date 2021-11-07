export interface IDoctor {
  id?: number;
  username: string;
  password: string;
  fullname: string;
  phone: string;
  position: string;
}

export interface IAuthReq {
  doctor: IDoctor;
}
