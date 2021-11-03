import { IsNumber, IsString } from 'class-validator';

export class CreateDeviceDto {
  @IsNumber()
  public doctorId: number;
  @IsString()
  public token: string;
}
