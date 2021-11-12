import PatientService from '@services/patient.service';
import DoctorService from '@services/doctor.service';
import XrayInputService from '@services/xrayInput.service';
import { RequestHandler } from 'express';
import { patients, xrayInputs, doctors, cares, xrayOutputs } from 'mockups';
import CareService from '@services/care.service';
import XrayOutputService from '@services/xrayOutput.service';

class MockupController {
  patientService = new PatientService();
  doctorService = new DoctorService();
  xrayInputService = new XrayInputService();
  xrayOutputService = new XrayOutputService();

  careService = new CareService();

  public generateData: RequestHandler = async (req, res, next) => {
    try {
      const patientsCreated = await Promise.all(patients.map(p => this.patientService.createPatient(p)));
      const doctorsCreated = await Promise.all(doctors.map(doc => this.doctorService.createDoctor(doc)));
      // const xrayInputsCreated = await Promise.all(xrayInputs.map(xray => this.xrayInputService.createXrayInput(xray)));
      // const xrayOutputsCreated = await Promise.all(xrayOutputs.map(xray => this.xrayOutputService.createXrayOutput(xray)));
      const careCreated = await Promise.all(cares.map(care => this.careService.createCares(care)));
      res.json({
        patientsCreated,
        doctorsCreated,
        // xrayInputsCreated,
        // xrayOutputsCreated,
        careCreated,
      });
    } catch (e) {
      next(e);
    }
  };
}

export default MockupController;
