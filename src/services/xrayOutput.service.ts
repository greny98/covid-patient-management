import { CreateXrayOutputDto } from '@/dtos/xrayOutput.dto';
import { IXrayOutput } from '@/interfaces/xrayOutput.interface';
import { XrayInputModel } from '@/models/xrayInput.model';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class XrayOutputService {
  public xrayOutput = DB.XrayOutput;

  public async findAllXrayOutput(page: number): Promise<IXrayOutput[]> {
    const limit = 10;
    const offset = page * limit;
    const allXrayOutputs: IXrayOutput[] = await this.xrayOutput.findAll({
      limit,
      offset,
      include: {
        model: XrayInputModel,
        as: 'xrayInput',
      },
    });
    return allXrayOutputs;
  }

  public async createXrayOutput(xrayOutputData: CreateXrayOutputDto): Promise<IXrayOutput> {
    if (isEmpty(xrayOutputData)) throw new HttpException(400, "You're not xrayOutputData");
    // TODO: check exist or not
    return await this.xrayOutput.create({ ...xrayOutputData });
  }

  public async updateXrayOutput(xrayOutputId: number, xrayOutputData: CreateXrayOutputDto): Promise<IXrayOutput> {
    if (isEmpty(xrayOutputData)) throw new HttpException(400, "You're not xrayOutputData");

    const findXrayOutput: IXrayOutput = await this.xrayOutput.findByPk(xrayOutputId);

    if (!findXrayOutput) {
      throw new HttpException(400, "You're not a xray Output");
    }
    await this.xrayOutput.update({ ...xrayOutputData }, { where: { id: xrayOutputId } });
    const updateXrayOutput: IXrayOutput = await this.xrayOutput.findByPk(xrayOutputId);
    return updateXrayOutput;
  }
  // TODO: Search by date, Delete
  public async findByInput(xrayInputId: number): Promise<IXrayOutput> {
    return this.xrayOutput.findOne({ where: { xrayInputId } });
  }
}

export default XrayOutputService;
