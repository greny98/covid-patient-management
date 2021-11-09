import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { IPatient } from '@/interfaces/patient.interface';
import { CreatePatientDto } from '@/dtos/patient.dto';
import Sequelize from 'sequelize';
import moment from 'moment';

class PatientService {
  private patients = DB.Patients;

  public async findAllPatient(page: number): Promise<IPatient[]> {
    const limit = 10;
    const offset = page * limit;
    const allPatient: IPatient[] = await this.patients.findAll({
      limit,
      offset,
    });
    return allPatient;
  }

  public async createPatient(patientData: CreatePatientDto): Promise<IPatient> {
    if (isEmpty(patientData)) throw new HttpException(400, "You're not patientData");

    const findPatient: IPatient = await this.patients.findOne({ where: { phone: patientData.phone } });
    if (findPatient) throw new HttpException(409, `You're phone ${patientData.phone} already exists`);

    return await this.patients.create({ ...patientData });
  }

  public async updatePatient(patientId: number, patientData: CreatePatientDto): Promise<IPatient> {
    if (isEmpty(patientData)) throw new HttpException(400, "You're not patientData");

    const findPatient: IPatient = await this.patients.findByPk(patientId);

    if (!findPatient) {
      throw new HttpException(400, "You're not a patient");
    }
    await this.patients.update({ ...patientData }, { where: { id: patientId } });

    const updatePatient: IPatient = await this.patients.findByPk(patientId);
    return updatePatient;
  }
  // TODO: Search By id
  public async findById(patientId: number): Promise<IPatient> {
    return await this.patients.findByPk(patientId);
  }
}

export default PatientService;
