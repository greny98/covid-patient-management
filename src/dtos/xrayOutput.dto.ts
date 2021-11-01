import { IsNumber, IsString } from 'class-validator';

export class CreateXrayOutputDto {
  @IsNumber()
  public xrayInputId: number;
  @IsString()
  public filepath: string;
}
