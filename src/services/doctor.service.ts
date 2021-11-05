import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { IDoctor } from '@/interfaces/doctor.interface';
import { CreateDoctorDto } from '@/dtos/doctor.dto';

class DoctorService {
  public doctors = DB.Doctors;

  public async findAllDoctor(): Promise<IDoctor[]> {
    const allDoctor: IDoctor[] = await this.doctors.findAll();
    return allDoctor;
  }

  public async createDoctor(doctorData: CreateDoctorDto): Promise<IDoctor> {
    if (isEmpty(doctorData)) throw new HttpException(400, "You're not doctorData");

    const findDoctor: IDoctor = await this.doctors.findOne({ where: { username: doctorData.username } });
    if (findDoctor) throw new HttpException(409, `You're username ${doctorData.username} already exists`);

    const createdoctorData: IDoctor = await this.doctors.create({ ...doctorData });
    return createdoctorData;
  }
}

export default DoctorService;
