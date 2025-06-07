'use client';

import { formatDate, isExpiringSoon, isExpired } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Package, Calendar, User, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { InventoryItem } from '@/lib/data';

interface InventoryDetailClientProps {
  item: InventoryItem;
}

export default function InventoryDetailClient({ item }: InventoryDetailClientProps) {
  const getStatusInfo = (expirationDate: string) => {
    if (isExpired(expirationDate)) {
      return { 
        badge: <Badge variant="destructive" className="gap-1"><AlertTriangle className="h-3 w-3" />Expired</Badge>,
        message: 'This item has expired and should be removed from inventory.',
        color: 'text-red-600'
      };
    }
    if (isExpiringSoon(expirationDate)) {
      const expiry = new Date(expirationDate);
      const today = new Date();
      const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return { 
        badge: <Badge variant="secondary" className="gap-1"><AlertTriangle className="h-3 w-3" />Expiring Soon</Badge>,
        message: `This item expires in ${diffDays} days. Consider using it soon.`,
        color: 'text-yellow-600'
      };
    }
    return { 
      badge: <Badge variant="default" className="gap-1 bg-green-100 text-green-800 hover:bg-green-200"><CheckCircle className="h-3 w-3" />Good Condition</Badge>,
      message: 'This item is in good condition with plenty of time before expiration.',
      color: 'text-green-600'
    };
  };

  const statusInfo = getStatusInfo(item.expiration_date);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/inventory">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Inventory
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.name}</h1>
          <p className="text-gray-600">Detailed information about this inventory item</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Item Image and Basic Info */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="aspect-square relative rounded-lg overflow-hidden">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Status</span>
                        {statusInfo.badge}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Quantity</span>
                        <span className="font-medium">{item.quantity} units</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Alert */}
            <Card className={`border-l-4 ${isExpired(item.expiration_date) ? 'border-l-red-500' : isExpiringSoon(item.expiration_date) ? 'border-l-yellow-500' : 'border-l-green-500'}`}>
              <CardContent className="p-4">
                <div className={`flex items-start space-x-3 ${statusInfo.color}`}>
                  {isExpired(item.expiration_date) ? (
                    <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  ) : isExpiringSoon(item.expiration_date) ? (
                    <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  )}
                  <p className="text-sm font-medium">{statusInfo.message}</p>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information */}
            <Card>
              <CardHeader>
                <CardTitle>Item Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Item ID</p>
                      <p className="font-medium">{item.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Quantity</p>
                      <p className="font-medium">{item.quantity} units</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Expiration Date</p>
                      <p className="font-medium">{formatDate(item.expiration_date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Created By</p>
                      <p className="font-medium">{item.created_by}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Last Updated</p>
                      <p className="font-medium">{formatDate(item.updated_at)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* QR Code */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">QR Code</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="p-4 bg-white border rounded-lg">
                  <QRCodeSVG
                    value={`${window.location.origin}/inventory/${item.id}`}
                    size={150}
                    level="M"
                    includeMargin
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.print()}
                >
                  <Package className="h-4 w-4 mr-2" />
                  Print Details
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    const url = `${window.location.origin}/inventory/${item.id}`;
                    navigator.clipboard.writeText(url);
                  }}
                >
                  <Package className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}