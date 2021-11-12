import DB from "@databases";
import { HttpException } from "@exceptions/HttpException";
import { isEmpty } from "@utils/util";
import { ICare } from "@/interfaces/care.interface";
import { CreateCareDto } from "@/dtos/care.dto";
import { DoctorModel } from "@/models/doctor.model";
import { PatientModel } from "@/models/patient.model";
import moment from "moment";
import { Op } from "sequelize";
import { IPatient } from "@interfaces/patient.interface";

class CareService {
  public cares = DB.Cares;

  public async findAllCares(doctorId: number, statusPatient: string): Promise<number> {
    const wherePatient: any = {};
    if (statusPatient) {
      wherePatient.status = statusPatient;
    }
    const allCares: { rows: ICare[]; count: number } = await this.cares.findAndCountAll({
      where: {
        doctorId,
      },
      include: [
        {
          model: DoctorModel,
          as: 'doctor',
        },
        {
          model: PatientModel,
          as: 'patient',
          where: wherePatient,
        },
      ],
    });
    return allCares.count;
  }
  public async findCaresByLatestSixMonth(doctorId: number): Promise<any> {
    const six_month_ago = moment().subtract(6, 'month').toDate();
    const now = moment().endOf('month').toDate();
    const allCares = await this.cares.findAll({
      where: {
        doctorId,
        createdAt: {
          [Op.between]: [six_month_ago, now],
        },
      },
      order: [['createdAt', 'desc']],
      raw: true,
    });
    return allCares.reduce((obj, current) => {
      const month = moment(current.createdAt).format('MMM');
      if (obj[month]) {
        return { ...obj, [month]: [...obj[month], current] };
      }
      return { ...obj, [month]: [current] };
    }, {});
  }

  public async createCares(careData: CreateCareDto): Promise<ICare> {
    if (isEmpty(careData)) throw new HttpException(400, "You're not careData");

    const findCares: ICare = await this.cares.findOne({ where: { doctorId: careData.doctorId, patientId: careData.patientId } });
    if (findCares) throw new HttpException(409, `You're already exists`);

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
  public async filterPatients(doctorId: number, date: Date): Promise<IPatient[]> {
    const fromDate = moment(date).startOf('day').toDate();
    const endDate = moment(date).endOf('day').toDate();
    const cares = await this.cares.findAll({
      where: {
        createdAt: {
          [Op.between]: [fromDate, endDate],
        },
        doctorId,
      },
      order: [['createdAt', 'desc']],
      include: [
        { model: DoctorModel, as: 'doctor' },
        { model: PatientModel, as: 'patient' },
      ],
    });
    return cares.map(c => c.patient);
  }
  public async findByPatientId(patientId: number): Promise<ICare> {
    return await this.cares.findOne({
      where: {
        patientId,
      },
      include: [
        { model: DoctorModel, as: 'doctor' },
        { model: PatientModel, as: 'patient' },
      ],
    });
  }
}

export default CareService;
