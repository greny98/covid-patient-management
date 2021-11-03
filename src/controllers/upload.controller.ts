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
}

export default UploadController;
