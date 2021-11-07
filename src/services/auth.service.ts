import config from 'config';
import jwt from 'jsonwebtoken';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { TokenData } from '@interfaces/auth.interface';
import { isEmpty } from '@utils/util';
import { CreateDoctorDto, LoginDoctorDto } from '@/dtos/doctor.dto';
import { IDoctor } from '@/interfaces/doctor.interface';

class AuthService {
  public doctors = DB.Doctors;

  public async signup(doctorData: CreateDoctorDto): Promise<IDoctor> {
    if (isEmpty(doctorData)) throw new HttpException(400, "You're not doctorData");
    const findDoctor: IDoctor = await this.doctors.findOne({ where: { username: doctorData.username } });
    if (findDoctor) {
      throw new HttpException(409, `You're username ${doctorData.username} already exists`);
    }
    const createUserData: IDoctor = await this.doctors.create({ ...doctorData });

    return createUserData;
  }

  public async login(doctorData: LoginDoctorDto): Promise<{ tokenData: TokenData; findDoctor: IDoctor; cookie: string }> {
    if (isEmpty(doctorData)) throw new HttpException(400, "You're not doctorData");

    const findDoctor: IDoctor = await this.doctors.findOne({ where: { username: doctorData.username }, raw: true });
    if (!findDoctor) throw new HttpException(409, `Tài khoản ${doctorData.username} không hợp lệ`);

    const isPasswordMatching: boolean = findDoctor.password === doctorData.password;
    if (!isPasswordMatching) throw new HttpException(409, 'Mật khẩu không hợp lệ');

    const tokenData = this.createToken(findDoctor);
    const cookie = this.createCookie(tokenData);

    return { tokenData, findDoctor, cookie };
  }

  public async logout(doctorData: IDoctor): Promise<IDoctor> {
    if (isEmpty(doctorData)) throw new HttpException(400, "You're not doctorData");

    const findDoctor: IDoctor = await this.doctors.findOne({ where: { username: doctorData.username, password: doctorData.password } });
    if (!findDoctor) throw new HttpException(409, "You're not user");

    return findDoctor;
  }

  public createToken(doctor: IDoctor): TokenData {
    const secretKey: string = config.get('secretKey');
    return { token: jwt.sign(doctor, secretKey) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
