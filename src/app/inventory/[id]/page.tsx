import { inventoryData } from '@/lib/data';
import { notFound } from 'next/navigation';
import InventoryDetailClient from '@/components/InventoryDetailClient';

export async function generateStaticParams() {
  return inventoryData.map((item) => ({
    id: item.id,
  }));
}

interface InventoryDetailPageProps {
  params: {
    id: string;
  };
}

export default async function InventoryDetailPage({ params }: InventoryDetailPageProps) {
  const item = inventoryData.find(item => item.id === params.id);

  if (!item) {
    notFound();
  }

  return <InventoryDetailClient item={item} />;
}