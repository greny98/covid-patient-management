import { IsNumber, IsString } from 'class-validator';

export class CreateXrayDiagnosisDto {
  @IsNumber()
  public patientId: number;
  @IsNumber()
  public negativePneumonia: number;
  @IsNumber()
  public typicalAppearance: number;
  @IsNumber()
  public indeterminateAppearance: number;
  @IsNumber()
  public atypicalAppearance: number;
  @IsString()
  public note: string;
  @IsString()
  public status: string;
}
