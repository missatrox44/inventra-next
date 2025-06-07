'use client';

import { useState } from 'react';
import Link from 'next/link';
import { inventoryData } from '@/lib/data';
import { formatDate, isExpiringSoon, isExpired } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye, Package, User, AlertTriangle, CheckCircle, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredItems = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.created_by.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (statusFilter === 'all') return true;
    if (statusFilter === 'expired') return isExpired(item.expiration_date);
    if (statusFilter === 'expiring') return isExpiringSoon(item.expiration_date) && !isExpired(item.expiration_date);
    if (statusFilter === 'good') return !isExpiringSoon(item.expiration_date) && !isExpired(item.expiration_date);
    
    return true;
  });

  const getStatusBadge = (expirationDate: string) => {
    if (isExpired(expirationDate)) {
      return <Badge variant="destructive" className="gap-1"><AlertTriangle className="h-3 w-3" />Expired</Badge>;
    }
    if (isExpiringSoon(expirationDate)) {
      return <Badge variant="secondary" className="gap-1"><AlertTriangle className="h-3 w-3" />Expiring Soon</Badge>;
    }
    return <Badge variant="default" className="gap-1 bg-green-100 text-green-800 hover:bg-green-200"><CheckCircle className="h-3 w-3" />Good</Badge>;
  };

  const getStatusCounts = () => {
    const expired = inventoryData.filter(item => isExpired(item.expiration_date)).length;
    const expiring = inventoryData.filter(item => isExpiringSoon(item.expiration_date) && !isExpired(item.expiration_date)).length;
    const good = inventoryData.filter(item => !isExpiringSoon(item.expiration_date) && !isExpired(item.expiration_date)).length;
    return { expired, expiring, good };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Package className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Public Inventory</h1>
          </div>
          <p className="text-gray-600 mb-6">
            Browse our complete inventory catalog. View detailed information about each item.
          </p>
        </div>

        {/* Stats Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold text-gray-900">{inventoryData.length}</p>
                </div>
                <Package className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Good Condition</p>
                  <p className="text-2xl font-bold text-green-600">{statusCounts.good}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                  <p className="text-2xl font-bold text-yellow-600">{statusCounts.expiring}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Expired</p>
                  <p className="text-2xl font-bold text-red-600">{statusCounts.expired}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div> */}

      
        {/* Search and Filters */}
        <Card className="mb-6">
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
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Items ({inventoryData.length})</SelectItem>
                    <SelectItem value="good">Good Condition ({statusCounts.good})</SelectItem>
                    <SelectItem value="expiring">Expiring Soon ({statusCounts.expiring})</SelectItem>
                    <SelectItem value="expired">Expired ({statusCounts.expired})</SelectItem>
                  </SelectContent>
                </Select>
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
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Expiration</TableHead>
                    <TableHead className="hidden lg:table-cell">Created By</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-50">
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
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500 md:hidden line-clamp-1">{item.description}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs">
                        <div className="truncate text-gray-600">{item.description}</div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{item.quantity}</span>
                        <span className="text-sm text-gray-500 ml-1">units</span>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(item.expiration_date)}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div>
                          <p className="text-sm font-medium">{formatDate(item.expiration_date)}</p>
                          <p className="text-xs text-gray-500">
                            {isExpired(item.expiration_date) 
                              ? 'Expired' 
                              : isExpiringSoon(item.expiration_date)
                              ? `${Math.ceil((new Date(item.expiration_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left`
                              : 'Good condition'
                            }
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{item.created_by}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/inventory/${item.id}`}>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Eye className="h-4 w-4" />
                            <span className="hidden sm:inline">View</span>
                          </Button>
                        </Link>
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
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search terms or filters.' 
                    : 'No inventory items available.'
                  }
                </p>
                {(searchTerm || statusFilter !== 'all') && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Showing {filteredItems.length} of {inventoryData.length} items
            {statusFilter !== 'all' && ` • Filtered by: ${statusFilter}`}
            {searchTerm && ` • Search: "${searchTerm}"`}
          </p>
        </div>
      </div>
    </div>
  );
}