import DB from '@databases';
import config from 'config';
import jwt from 'jsonwebtoken';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { DoctorModel } from '@/models/doctor.model';
import { IDevice } from '@/interfaces/device.interface';
import { CreateDeviceDto } from '@/dtos/device.dto';
import { DataStoredInToken, TokenData } from '@/interfaces/auth.interface';

class DeviceService {
  public devices = DB.Devices;

  public async findAllDevices(page: number): Promise<IDevice[]> {
    const limit = 10;
    const offset = page * limit;
    const allDevices: IDevice[] = await this.devices.findAll({
      limit,
      offset,
      include: [
        {
          model: DoctorModel,
          as: 'doctor',
        },
      ],
    });
    return allDevices;
  }

  public async createDevices(deviceData: CreateDeviceDto): Promise<IDevice> {
    if (isEmpty(deviceData)) throw new HttpException(400, "You're not deviceData");
    const exist = await this.devices.findOne({ where: { doctorId: deviceData.doctorId }, raw: true });
    if (exist) {
      return await this.updateDevice(exist.id, deviceData);
    }
    const newDevice = await this.devices.create(deviceData);
    return newDevice;
  }

  public async updateDevice(deviceId: number, deviceData: CreateDeviceDto): Promise<IDevice> {
    if (isEmpty(deviceData)) throw new HttpException(400, "You're not deviceData");

    const findDevice: IDevice = await this.devices.findByPk(deviceId);

    if (!findDevice) {
      throw new HttpException(400, "You're not a device");
    }
    await this.devices.update({ ...deviceData }, { where: { id: deviceId } });

    const updateDevice: IDevice = await this.devices.findByPk(deviceId);
    return updateDevice;
  }
  // TODO: Search by date, Delete

  public createTokenDevice(device: CreateDeviceDto): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: device.doctorId };
    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public async findByDoctorId(doctorId): Promise<IDevice> {
    return await this.devices.findOne({ where: { doctorId } });
  }
}

export default DeviceService;
