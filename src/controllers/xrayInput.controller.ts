import { CreateXrayInputDto, UpdateXrayInputDto } from '@/dtos/xrayInput.dto';
import { IGetAllXrayInput, IXrayInput } from '@/interfaces/xrayInput.interface';
import XrayInputService from '@/services/xrayInput.service';
import { NextFunction, Request, Response, RequestHandler } from 'express';

class XrayInputController {
  public xrayInputService = new XrayInputService();

  public getAllXrayInput: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 0 } = req.query as IGetAllXrayInput;
      const findXrayInput: IXrayInput[] = await this.xrayInputService.findAllXrayInput(page);
      res.status(200).json({ data: findXrayInput, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createXrayInput: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const xrayInputData: CreateXrayInputDto = req.body;
      const createXrayInputData = await this.xrayInputService.createXrayInput(xrayInputData);
      res.status(201).json({ data: createXrayInputData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateXrayInput: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const xrayInputId = Number(req.params.id);
      const xrayInputData: UpdateXrayInputDto = req.body;
      const updateXrayInputData: IXrayInput = await this.xrayInputService.updateXrayInput(xrayInputId, xrayInputData);
      res.json({ data: updateXrayInputData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default XrayInputController;
