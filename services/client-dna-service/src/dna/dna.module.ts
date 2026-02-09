import { Module } from '@nestjs/common';
import { DnaService } from './dna.service';
import { DnaController } from './dna.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [DnaController],
  providers: [DnaService, PrismaService],
  exports: [DnaService],
})
export class DnaModule {}