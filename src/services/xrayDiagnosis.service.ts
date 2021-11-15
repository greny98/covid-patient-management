import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { IXrayDiagnosis } from '@/interfaces/xrayDiagnosis.interface';
import { CreateXrayDiagnosisDto } from '@/dtos/xrayDiagnosis.dto';

class XrayDiagnosisService {
  public xrayDiagnosis = DB.XrayDiagnosis;

  public async findAllXrayDiagnosis(page: number): Promise<IXrayDiagnosis[]> {
    const limit = 10;
    const offset = page * limit;
    const allXrayDiagnosis: IXrayDiagnosis[] = await this.xrayDiagnosis.findAll({
      limit,
      offset,
    });
    return allXrayDiagnosis;
  }

  public async findXrayDiagnosisByXrayId(xrayInputId: number): Promise<IXrayDiagnosis> {
    const allXrayDiagnosis: IXrayDiagnosis = await this.xrayDiagnosis.findOne({
      where: {
        xrayInputId,
      },
    });

    return allXrayDiagnosis;
  }

  public async createXrayDiagnosis(xrayDiagnosisData: CreateXrayDiagnosisDto): Promise<IXrayDiagnosis> {
    if (isEmpty(xrayDiagnosisData)) throw new HttpException(400, "You're not xrayData");

    // const findPatient: IPatient = await this.patients.findOne({ where: { phone: patientData.phone } });
    // if (findPatient) throw new HttpException(409, `You're phone ${patientData.phone} already exists`);
    return await this.xrayDiagnosis.create({ ...xrayDiagnosisData });
  }

  public async updateXrayDiagnosis(xrayDiagnosisId: number, xrayDiagnosisData: CreateXrayDiagnosisDto): Promise<IXrayDiagnosis> {
    if (isEmpty(xrayDiagnosisData)) throw new HttpException(400, "You're not xrayDiagnosisData");

    const findXrayDiagnosis: IXrayDiagnosis = await this.xrayDiagnosis.findByPk(xrayDiagnosisId);
    if (!findXrayDiagnosis) {
      throw new HttpException(400, "You're not a xray diagnosis");
    }
    await this.xrayDiagnosis.update({ ...xrayDiagnosisData }, { where: { id: xrayDiagnosisId } });

    const updateXrayDiagnosis: IXrayDiagnosis = await this.xrayDiagnosis.findByPk(xrayDiagnosisId);
    return updateXrayDiagnosis;
  }
  // TODO: Search by date, Delete
}

export default XrayDiagnosisService;
