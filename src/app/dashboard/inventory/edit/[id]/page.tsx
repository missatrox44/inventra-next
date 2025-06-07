import { inventoryData } from '@/lib/data';
import { notFound } from 'next/navigation';
import DashboardInventoryEditClient from '@/components/DashboardInventoryEditClient';

export async function generateStaticParams() {
  return inventoryData.map((item) => ({
    id: item.id,
  }));
}

interface EditInventoryPageProps {
  params: {
    id: string;
  };
}

export default async function EditInventoryPage({ params }: EditInventoryPageProps) {
  const item = inventoryData.find(item => item.id === params.id);

  if (!item) {
    notFound();
  }

  return <DashboardInventoryEditClient item={item} />;
}