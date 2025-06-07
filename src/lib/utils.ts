import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { InventoryItem } from './data';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function isExpiringSoon(expirationDate: string, days: number = 30): boolean {
  const expiry = new Date(expirationDate);
  const today = new Date();
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= days && diffDays >= 0;
}

export function isExpired(expirationDate: string): boolean {
  const expiry = new Date(expirationDate);
  const today = new Date();
  return expiry < today;
}

export function exportToCSV(data: InventoryItem[], filename: string = 'inventory.csv') {
  const headers = ['ID', 'Name', 'Description', 'Quantity', 'Expiration Date', 'Created By', 'Updated At'];
  const csvContent = [
    headers.join(','),
    ...data.map(item => [
      item.id,
      `"${item.name}"`,
      `"${item.description}"`,
      item.quantity,
      item.expiration_date,
      `"${item.created_by}"`,
      item.updated_at
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}