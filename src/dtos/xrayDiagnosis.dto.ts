import { IsNumber, IsString } from 'class-validator';

export class CreateXrayDiagnosisDto {
  @IsNumber()
  public patientId: number;
  @IsString()
  public filepath: string;
  @IsNumber()
  public classify: number;
  @IsNumber()
  public confident: number;
  @IsString()
  public note: string;
  @IsString()
  public status: string;
}
