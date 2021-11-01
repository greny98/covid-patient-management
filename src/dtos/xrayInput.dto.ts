import { IsNumber, IsString } from 'class-validator';

export class CreateXrayInputDto {
  @IsNumber()
  public patientId: number;
  @IsString()
  public filepath: string;
  @IsString()
  public note: string;
  @IsString()
  public status: string;
}

export class UpdateXrayInputDto {
  @IsNumber()
  public patientId: number;
  @IsNumber()
  public xrayOutputId: number;
  @IsString()
  public filepath: string;
  @IsString()
  public note: string;
  @IsString()
  public status: string;
}
