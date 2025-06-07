'use client';

import { useState } from 'react';
import Link from 'next/link';
import { inventoryData } from '@/lib/data';
import { formatDate, isExpiringSoon, isExpired, exportToCSV } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Download, Eye, Edit, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function DashboardInventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredItems = inventoryData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.created_by.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (expirationDate: string) => {
    if (isExpired(expirationDate)) {
      return <Badge variant="destructive" className="gap-1"><AlertTriangle className="h-3 w-3" />Expired</Badge>;
    }
    if (isExpiringSoon(expirationDate)) {
      return <Badge variant="secondary" className="gap-1"><AlertTriangle className="h-3 w-3" />Expiring Soon</Badge>;
    }
    return <Badge variant="default" className="gap-1 bg-green-100 text-green-800 hover:bg-green-200"><CheckCircle className="h-3 w-3" />Good</Badge>;
  };

  const handleExportCSV = () => {
    exportToCSV(filteredItems, 'inventory-export.csv');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Manage your inventory items, track quantities, and monitor expiration dates</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExportCSV} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Link href="/dashboard/inventory/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, description, or creator..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items ({filteredItems.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expiration</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="w-12 h-12 relative rounded-lg overflow-hidden">
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate">{item.description}</div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{item.quantity}</span>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(item.expiration_date)}
                    </TableCell>
                    <TableCell>{formatDate(item.expiration_date)}</TableCell>
                    <TableCell>{item.created_by}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/dashboard/inventory/view/${item.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/dashboard/inventory/edit/${item.id}`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? 'Try adjusting your search terms.' : 'No inventory items available.'}
              </p>
              {!searchTerm && (
                <Link href="/dashboard/inventory/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Item
                  </Button>
                </Link>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}