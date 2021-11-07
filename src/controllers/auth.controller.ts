import { NextFunction, Request, Response, RequestHandler } from 'express';
import AuthService from '@services/auth.service';
import { CreateDoctorDto, LoginDoctorDto } from '@/dtos/doctor.dto';
import { IDoctor } from '@/interfaces/doctor.interface';

class AuthController {
  public authService = new AuthService();

  public signUp: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorData: CreateDoctorDto = req.body;
      const signUpDoctorData: IDoctor = await this.authService.signup(doctorData);

      res.status(201).json({ data: signUpDoctorData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorData: LoginDoctorDto = req.body;
      const { tokenData, findDoctor, cookie } = await this.authService.login(doctorData);
      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: { findDoctor, token: tokenData.token }, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorData: IDoctor = req.body;
      const logOutdoctorData: IDoctor = await this.authService.logout(doctorData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutdoctorData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
