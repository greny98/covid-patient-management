import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateDeviceDto {
  @IsNumber()
  public doctorId: number;
}
