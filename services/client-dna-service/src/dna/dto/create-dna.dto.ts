import { IsString, IsNotEmpty, IsObject, IsOptional, IsArray } from 'class-validator';

export class CreateDnaDto {
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsString()
  @IsNotEmpty()
  industry: string;

  @IsString()
  @IsNotEmpty()
  brandTone: string;

  @IsObject()
  targetAudience: any;

  @IsObject()
  geography: any;

  @IsObject()
  psychographics: any;

  @IsOptional()
  products?: any;

  @IsOptional()
  competitors?: any;
}