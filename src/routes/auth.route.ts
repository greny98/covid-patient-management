import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateDoctorDto } from '@/dtos/doctor.dto';

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }
  //TODO: VALIDATE WITH MIDDLEWARE
  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, validationMiddleware(CreateDoctorDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}/login`, this.authController.logIn);
    // this.router.post(`${this.path}/logout`, authMiddleware, this.authController.logOut);
    this.router.post(`${this.path}/logout`, this.authController.logOut);
  }
}

export default AuthRoute;
