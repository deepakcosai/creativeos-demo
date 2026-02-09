import { IsString, IsNotEmpty, IsArray, IsObject, IsOptional } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  objective: string; // 'awareness', 'engagement', 'conversion', 'leads'

  @IsString()
  @IsNotEmpty()
  clientDnaId: string;

  @IsArray()
  @IsNotEmpty()
  platforms: string[]; // ['meta', 'linkedin', 'youtube', 'google']

  @IsObject()
  @IsNotEmpty()
  dateRange: {
    start: string;
    end: string;
  };

  @IsArray()
  @IsOptional()
  contentPillars?: string[];

  @IsObject()
  @IsOptional()
  kpis?: any;

  @IsObject()
  @IsOptional()
  budget?: any;
}