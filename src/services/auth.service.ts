import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { isEmpty } from '@utils/util';
import { CreateDoctorDto } from '@/dtos/doctor.dto';
import { IDoctor } from '@/interfaces/doctor.interface';

class AuthService {
  public doctors = DB.Doctors;

  public async signup(doctorData: CreateDoctorDto): Promise<IDoctor> {
    if (isEmpty(doctorData)) throw new HttpException(400, "You're not doctorData");
    const findDoctor: IDoctor = await this.doctors.findOne({ where: { username: doctorData.username } });
    if (findDoctor) {
      throw new HttpException(409, `You're username ${doctorData.username} already exists`);
    }
    const hashedPassword = await bcrypt.hash(doctorData.password, 10);
    const createUserData: IDoctor = await this.doctors.create({ ...doctorData, password: hashedPassword });

    return createUserData;
  }

  public async login(doctorData: CreateDoctorDto): Promise<{ cookie: string; findDoctor: IDoctor }> {
    if (isEmpty(doctorData)) throw new HttpException(400, "You're not doctorData");

    const findDoctor: IDoctor = await this.doctors.findOne({ where: { username: doctorData.username } });
    if (!findDoctor) throw new HttpException(409, `You're username ${doctorData.username} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(doctorData.password, findDoctor.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findDoctor);
    const cookie = this.createCookie(tokenData);

    return { cookie, findDoctor };
  }

  public async logout(doctorData: IDoctor): Promise<IDoctor> {
    if (isEmpty(doctorData)) throw new HttpException(400, "You're not doctorData");

    const findDoctor: IDoctor = await this.doctors.findOne({ where: { username: doctorData.username, password: doctorData.password } });
    if (!findDoctor) throw new HttpException(409, "You're not user");

    return findDoctor;
  }

  public createToken(doctor: IDoctor): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: doctor.id };
    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
