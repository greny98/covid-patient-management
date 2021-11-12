import multer from 'multer';
import express, { Router } from 'express';
import moment from 'moment';
import { Routes } from '@interfaces/routes.interface';
import PatientService from '@services/patient.service';
import { UploadXrayInputDto } from '@dtos/upload.dto';
import UploadController from '@controllers/upload.controller';
import path from 'path';
import { homedir } from 'os';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(homedir(), 'uploads'));
  },
  async filename(req: express.Request, file: Express.Multer.File, callback) {
    const patientService = new PatientService();
    const { patientId }: UploadXrayInputDto = req.body;
    const existed = await patientService.findById(patientId);
    if (!existed) {
      return callback(new Error("Patient doesn't exist!"), file.originalname);
    }
    // Check image file
    if (file.mimetype.split('/')[0] !== 'image') {
      return callback(new Error('File upload must be image!'), file.originalname);
    }
    const splits = file.originalname.split('.');
    const fileFormat = splits[splits.length - 1];
    const uniqueSuffix = moment(new Date()).format('YYYYMMDD_hhmmss');
    const filename = `xray_inp_${patientId}_${uniqueSuffix}.${fileFormat}`;
    callback(null, filename);
  },
});

const upload = multer({ storage: storage });

class UploadRoute implements Routes {
  public path = '/uploads';
  public router = Router();
  public uploadController = new UploadController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, upload.single('image'), this.uploadController.uploadXrayInputs);
    this.router.get(this.path, this.uploadController.getXrayInputsById);
  }
}

export default UploadRoute;
