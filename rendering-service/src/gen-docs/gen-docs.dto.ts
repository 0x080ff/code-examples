import { IsNotEmpty, IsString, IsObject, IsNumber } from 'class-validator';

export class GenDocDto {
  @IsNotEmpty()
  @IsString()
  uid: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsNumber()
  template_version: number;

  @IsNotEmpty()
  @IsObject()
  data: object;
}
