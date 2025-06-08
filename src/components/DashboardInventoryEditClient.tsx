'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, X, Upload } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { InventoryItem, dummyChangelog } from '@/lib/data';

interface DashboardInventoryEditClientProps {
  item: InventoryItem;
}

export default function DashboardInventoryEditClient({ item }: DashboardInventoryEditClientProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: item.name,
    description: item.description,
    quantity: item.quantity,
    expiration_date: item.expiration_date,
    image_url: item.image_url,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real app, you would update the item in your backend
    console.log('Updated item:', { ...item, ...formData, updated_at: new Date().toISOString() });

    setIsLoading(false);
    router.push(`/dashboard/inventory/view/${item.id}`);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to your storage service
      // For now, we'll just create a placeholder URL
      const fakeUrl = URL.createObjectURL(file);
      handleInputChange('image_url', fakeUrl);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <Link href={`/dashboard/inventory/view/${item.id}`}>
            <Button variant="ghost" className="mb-4 -ml-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Item View
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Item</h1>
          <p className="text-gray-600 mt-1">Update the details of this inventory item</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Item Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter item name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter item description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="0"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', parseInt(e.target.value))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiration_date">Expiration Date *</Label>
                  <Input
                    id="expiration_date"
                    type="date"
                    value={formData.expiration_date}
                    onChange={(e) => handleInputChange('expiration_date', e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Item Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-4">
                <div className="aspect-square w-48 relative rounded-lg overflow-hidden border">
                  <Image
                    src={formData.image_url}
                    alt={formData.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Change Image</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Supported formats: JPG, PNG, GIF (max 5MB)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Save Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>

              <Link href={`/dashboard/inventory/view/${item.id}`} className="block">
                <Button variant="outline" className="w-full">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Item Information */}
          <Card>
            <CardHeader>
              <CardTitle>Item Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-gray-500">Item ID</p>
                <p className="font-medium">{item.id}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Created By</p>
                <p className="font-medium">{item.created_by}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Last Updated</p>
                <p className="font-medium">{new Date(item.updated_at).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changelog</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dummyChangelog.map((log, idx) => (
                  <li key={idx} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                    <span>
                      <span className="font-medium">{log.user}</span> — {log.action}
                    </span>
                    <span className="text-xs text-gray-500">{log.date}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}