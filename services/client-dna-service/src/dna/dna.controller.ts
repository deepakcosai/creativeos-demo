import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DnaService } from './dna.service';
import { CreateDnaDto } from './dto/create-dna.dto';
import { UpdateDnaDto } from './dto/update-dna.dto';

@Controller('dna')
export class DnaController {
  constructor(private readonly dnaService: DnaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDnaDto: CreateDnaDto) {
    return this.dnaService.create(createDnaDto);
  }

  @Get()
  findAll() {
    return this.dnaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dnaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDnaDto: UpdateDnaDto) {
    return this.dnaService.update(id, updateDnaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dnaService.remove(id);
  }
}