import { CreateXrayOutputDto } from '@/dtos/xrayOutput.dto';
import { IGetAllXrayOutput, IXrayOutput } from '@/interfaces/xrayOutput.interface';
import XrayOutputService from '@/services/xrayOutput.service';
import { NextFunction, Request, Response, RequestHandler } from 'express';

class XrayOutputController {
  public xrayOutputService = new XrayOutputService();

  public getAllXrayOutput: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 0 } = req.query as IGetAllXrayOutput;
      const findXrayOutput: IXrayOutput[] = await this.xrayOutputService.findAllXrayOutput(page);
      res.status(200).json({ data: findXrayOutput, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createXrayOutput: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const xrayOutputData: CreateXrayOutputDto = req.body;
      const createXrayOutputData = await this.xrayOutputService.createXrayOutput(xrayOutputData);
      res.status(201).json({ data: createXrayOutputData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateXrayOutput: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const xrayOutputId = Number(req.params.id);
      const xrayOutputData: CreateXrayOutputDto = req.body;
      const updateXrayOutputData: IXrayOutput = await this.xrayOutputService.updateXrayOutput(xrayOutputId, xrayOutputData);
      res.json({ data: updateXrayOutputData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default XrayOutputController;
