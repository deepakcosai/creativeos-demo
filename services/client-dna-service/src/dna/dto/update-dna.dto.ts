import { PartialType } from '@nestjs/mapped-types';
import { CreateDnaDto } from './create-dna.dto';

export class UpdateDnaDto extends PartialType(CreateDnaDto) {}