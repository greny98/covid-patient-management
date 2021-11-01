import { IsNumber, IsString } from 'class-validator';

export class CreateCareDto {
  @IsNumber()
  public patientId: number;
  @IsNumber()
  public doctorId: number;
  @IsString()
  public responsibility: string;
}
