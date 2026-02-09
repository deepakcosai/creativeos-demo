'use client';

import { CampaignDetail } from '@/components/campaigns/CampaignDetail';
import { use } from 'react';

export default function CampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <CampaignDetail id={id} />;
}