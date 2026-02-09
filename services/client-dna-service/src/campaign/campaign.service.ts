import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

@Injectable()
export class CampaignService {
  constructor(private prisma: PrismaService) {}

  async create(createCampaignDto: CreateCampaignDto) {
    // Verify Client DNA exists
    const clientDna = await this.prisma.clientDNA.findUnique({
      where: { id: createCampaignDto.clientDnaId },
    });

    if (!clientDna) {
      throw new NotFoundException('Client DNA not found');
    }

    // Generate content pillars if not provided
    const contentPillars = createCampaignDto.contentPillars || 
      await this.generateContentPillars(
        createCampaignDto.objective,
        createCampaignDto.platforms,
        clientDna
      );

    const campaign = await this.prisma.campaign.create({
      data: {
        name: createCampaignDto.name,
        objective: createCampaignDto.objective,
        clientDnaId: createCampaignDto.clientDnaId,
        platforms: createCampaignDto.platforms,
        contentPillars,
        dateRange: createCampaignDto.dateRange,
        kpis: createCampaignDto.kpis || this.generateKPIs(createCampaignDto.objective),
        budget: createCampaignDto.budget,
      },
      include: {
        clientDna: true,
      },
    });

    console.log('✅ Campaign Created:', campaign.id);
    return campaign;
  }

  async findAll() {
    return this.prisma.campaign.findMany({
      where: { isActive: true },
      include: {
        clientDna: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id },
      include: {
        clientDna: true,
      },
    });

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }

    return campaign;
  }

  async findByClientDna(clientDnaId: string) {
    return this.prisma.campaign.findMany({
      where: { 
        clientDnaId,
        isActive: true 
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, updateCampaignDto: UpdateCampaignDto) {
    await this.findOne(id); // Check exists

    return this.prisma.campaign.update({
      where: { id },
      data: updateCampaignDto,
      include: {
        clientDna: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.campaign.update({
      where: { id },
      data: { isActive: false },
    });
  }

  // AI-POWERED LOGIC: Generate Content Pillars
  private async generateContentPillars(
    objective: string,
    platforms: string[],
    clientDna: any
  ): Promise<string[]> {
    // Demo mode: Rule-based generation
    // In production: This calls your AI service

    const pillars: string[] = [];

    // Objective-based pillars
    const objectivePillars = {
      awareness: ['Brand Story', 'Educational Content', 'Industry Insights'],
      engagement: ['Behind the Scenes', 'User Stories', 'Interactive Content'],
      conversion: ['Product Benefits', 'Case Studies', 'Limited Offers'],
      leads: ['Free Resources', 'Webinars', 'Expert Tips'],
    };

    pillars.push(...(objectivePillars[objective] || objectivePillars.awareness));

    // Industry-specific pillar
    pillars.push(`${clientDna.industry} Trends`);

    // Platform-specific pillar
    if (platforms.includes('youtube')) {
      pillars.push('Video Tutorials');
    }
    if (platforms.includes('linkedin')) {
      pillars.push('Professional Insights');
    }

    return pillars.slice(0, 5); // Return top 5
  }

  // Generate KPIs based on objective
  private generateKPIs(objective: string): any {
    const kpiMap = {
      awareness: {
        reach: { target: 50000, unit: 'impressions' },
        engagement_rate: { target: 3.5, unit: 'percentage' },
        brand_mentions: { target: 100, unit: 'count' },
      },
      engagement: {
        likes: { target: 2000, unit: 'count' },
        comments: { target: 500, unit: 'count' },
        shares: { target: 300, unit: 'count' },
        engagement_rate: { target: 5, unit: 'percentage' },
      },
      conversion: {
        conversions: { target: 200, unit: 'count' },
        conversion_rate: { target: 2.5, unit: 'percentage' },
        cost_per_conversion: { target: 25, unit: 'currency' },
      },
      leads: {
        leads: { target: 500, unit: 'count' },
        cost_per_lead: { target: 15, unit: 'currency' },
        lead_quality_score: { target: 7.5, unit: 'score' },
      },
    };

    return kpiMap[objective] || kpiMap.awareness;
  }
}