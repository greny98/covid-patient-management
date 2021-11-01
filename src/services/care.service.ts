import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { ICare } from '@/interfaces/care.interface';
import { CreateCareDto } from '@/dtos/care.dto';
import { DoctorModel } from '@/models/doctor.model';
import { PatientModel } from '@/models/patient.model';

class CareService {
  public cares = DB.Cares;

  public async findAllCares(page: number): Promise<ICare[]> {
    const limit = 10;
    const offset = page * limit;
    const allPatient: ICare[] = await this.cares.findAll({
      limit,
      offset,
      include: [
        {
          model: DoctorModel,
          as: 'doctor',
        },
        {
          model: PatientModel,
          as: 'patient',
        },
      ],
    });
    return allPatient;
  }

  public async createCares(careData: CreateCareDto): Promise<ICare> {
    if (isEmpty(careData)) throw new HttpException(400, "You're not careData");

    const findCares: ICare = await this.cares.findOne({ where: { responsibility: careData.responsibility } });
    if (findCares) throw new HttpException(409, `You're responsibility ${careData.responsibility} already exists`);

    return await this.cares.create({ ...careData });
  }

  public async updateCare(careId: number, careData: CreateCareDto): Promise<ICare> {
    if (isEmpty(careData)) throw new HttpException(400, "You're not careData");

    const findCare: ICare = await this.cares.findByPk(careId);

    if (!findCare) {
      throw new HttpException(400, "You're not a care");
    }
    await this.cares.update({ ...careData }, { where: { id: careId } });

    const updateCare: ICare = await this.cares.findByPk(careId);
    return updateCare;
  }
  // TODO: Search by date, Delete
}

export default CareService;
