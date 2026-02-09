import { Module } from '@nestjs/common';
import { DnaModule } from './dna/dna.module';
import { CampaignModule } from './campaign/campaign.module';

@Module({
  imports: [DnaModule, CampaignModule],
})
export class AppModule {}