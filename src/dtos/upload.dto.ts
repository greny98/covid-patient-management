import { IsNumber, IsString } from 'class-validator';

export class UploadXrayInputDto {
  @IsNumber()
  public patientId: number;
  @IsString()
  public note?: string;
}
