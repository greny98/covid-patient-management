import { IsString, IsPhoneNumber } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  public fullname: string;

  @IsPhoneNumber()
  public phone: string;

  @IsString()
  public note: string;
}
