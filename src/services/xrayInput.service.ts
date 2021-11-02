import { CreateXrayInputDto } from '@/dtos/xrayInput.dto';
import { IXrayInput } from '@/interfaces/xrayInput.interface';
import { PatientModel } from '@/models/patient.model';
import { XrayOutputModel } from '@/models/xrayOutput.model';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class XrayInputService {
  public xrayInput = DB.XrayInput;

  public async findAllXrayInput(page: number): Promise<IXrayInput[]> {
    const limit = 10;
    const offset = page * limit;
    const allXrayInputs: IXrayInput[] = await this.xrayInput.findAll({
      limit,
      offset,
      include: [
        {
          model: PatientModel,
          as: 'patient',
        },
        {
          model: XrayOutputModel,
          as: 'xrayOutput',
        },
      ],
    });
    return allXrayInputs;
  }

  public async createXrayInput(xrayInputData: CreateXrayInputDto): Promise<IXrayInput> {
    if (isEmpty(xrayInputData)) throw new HttpException(400, "You're not xrayInputData");
    // TODO: check exist or not
    return await this.xrayInput.create({ ...xrayInputData });
  }

  public async updateXrayInput(xrayInputId: number, xrayInputData: CreateXrayInputDto): Promise<IXrayInput> {
    if (isEmpty(xrayInputData)) throw new HttpException(400, "You're not xrayInputData");

    const findXrayInput: IXrayInput = await this.xrayInput.findByPk(xrayInputId);

    if (!findXrayInput) {
      throw new HttpException(400, "You're not a xray input");
    }
    await this.xrayInput.update({ ...xrayInputData }, { where: { id: xrayInputId } });
    const updateXrayInput: IXrayInput = await this.xrayInput.findByPk(xrayInputId);
    return updateXrayInput;
  }
  // TODO: Search by date, Delete
  public async findByPatientId(patientId: number): Promise<IXrayInput[]> {
    return await this.xrayInput.findAll({ where: { patientId }, raw: false });
  }
}

export default XrayInputService;
