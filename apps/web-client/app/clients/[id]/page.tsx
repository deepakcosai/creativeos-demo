'use client';

import { ClientDNADetail } from '@/components/clients/ClientDNADetail';
import { use } from 'react';

export default function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <ClientDNADetail id={id} />;
}