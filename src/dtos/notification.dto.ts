import { IsNumber, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsNumber()
  public doctorId: number;
  @IsString()
  public content: string;
  @IsString()
  public status: string;
  @IsNumber()
  public patientId: number;
}
