import { IsNotEmpty, IsObject, IsString, IsNumber } from 'class-validator';

export class CreateTemplateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  version: number;

  @IsNotEmpty()
  @IsString()
  data: string;

  @IsNotEmpty()
  @IsObject()
  structure: object;
}

export class FindByNameTemplateDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
