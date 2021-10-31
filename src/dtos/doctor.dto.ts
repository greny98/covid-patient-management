import { IsString, IsPhoneNumber } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsString()
  public fullname: string;

  @IsPhoneNumber()
  public phone: string;

  @IsString()
  public position: string;
}

export class LoginDoctorDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;
}
