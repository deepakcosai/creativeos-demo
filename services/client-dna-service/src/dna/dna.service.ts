import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDnaDto } from './dto/create-dna.dto';
import { UpdateDnaDto } from './dto/update-dna.dto';

@Injectable()
export class DnaService {
  constructor(private prisma: PrismaService) {}

  async create(createDnaDto: CreateDnaDto) {
    const dna = await this.prisma.clientDNA.create({
      data: {
        clientName: createDnaDto.clientName,
        industry: createDnaDto.industry,
        brandTone: createDnaDto.brandTone,
        targetAudience: createDnaDto.targetAudience,
        geography: createDnaDto.geography,
        psychographics: createDnaDto.psychographics,
        products: createDnaDto.products || {},
        competitors: createDnaDto.competitors || {},
      },
    });

    console.log('✅ Client DNA Created:', dna.id);
    return dna;
  }

  async findAll() {
    return this.prisma.clientDNA.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const dna = await this.prisma.clientDNA.findUnique({
      where: { id },
    });

    if (!dna) {
      throw new NotFoundException(`Client DNA with ID ${id} not found`);
    }

    return dna;
  }

  async update(id: string, updateDnaDto: UpdateDnaDto) {
    const currentDna = await this.findOne(id);

    return this.prisma.clientDNA.update({
      where: { id },
      data: {
        ...updateDnaDto,
        version: currentDna.version + 1,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.clientDNA.update({
      where: { id },
      data: { isActive: false },
    });
  }
}