import XrayInputService from '@services/xrayInput.service';
import { RequestHandler } from 'express';
import { UploadXrayInputDto } from '@dtos/upload.dto';
import { EStatus } from '@interfaces/xrayInput.interface';

class UploadController {
  private xrayInputService = new XrayInputService();

  public uploadXrayInputs: RequestHandler = async (req, res) => {
    const { patientId, note = '' }: UploadXrayInputDto = req.body;
    const filepath = `uploads/${req.file.filename}`;
    const created = await this.xrayInputService.createXrayInput({
      patientId,
      filepath,
      note,
      status: EStatus.IN_PROGRESS,
    });
    res.json(created);
  };

  public getXrayInputsById: RequestHandler = async (req, res, next) => {
    try {
      const { patientId }: any = req.query;
      const allXrayInput = await this.xrayInputService.findByPatientId(patientId);
      res.status(200).json({ data: allXrayInput, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default UploadController;
