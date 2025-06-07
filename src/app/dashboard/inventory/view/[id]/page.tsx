import { inventoryData } from '@/lib/data';
import { notFound } from 'next/navigation';
import DashboardInventoryViewClient from '@/components/DashboardInventoryViewClient';

export async function generateStaticParams() {
  return inventoryData.map((item) => ({
    id: item.id,
  }));
}

interface ViewInventoryPageProps {
  params: {
    id: string;
  };
}

export default async function ViewInventoryPage({ params }: ViewInventoryPageProps) {
  const item = inventoryData.find(item => item.id === params.id);

  if (!item) {
    notFound();
  }

  return <DashboardInventoryViewClient item={item} />;
}