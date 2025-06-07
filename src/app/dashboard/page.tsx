import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Users, AlertTriangle, TrendingUp } from 'lucide-react';
import { inventoryData, usersData } from '@/lib/data';
import { isExpired, isExpiringSoon } from '@/lib/utils';

export default function DashboardPage() {
  const totalItems = inventoryData.length;
  const totalQuantity = inventoryData.reduce((sum, item) => sum + item.quantity, 0);
  const expiredItems = inventoryData.filter(item => isExpired(item.expiration_date)).length;
  const expiringSoonItems = inventoryData.filter(item => isExpiringSoon(item.expiration_date)).length;
  const totalUsers = usersData.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome to your inventory management dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">
              {totalQuantity} total units
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Across all roles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{expiringSoonItems}</div>
            <p className="text-xs text-muted-foreground">
              Within 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{expiredItems}</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventoryData.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.created_by}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alerts & Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expiredItems > 0 && (
                <div className="flex items-center space-x-4 p-3 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium text-red-800">
                      {expiredItems} items have expired
                    </p>
                    <p className="text-sm text-red-600">
                      Remove expired items from inventory
                    </p>
                  </div>
                </div>
              )}
              
              {expiringSoonItems > 0 && (
                <div className="flex items-center space-x-4 p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium text-yellow-800">
                      {expiringSoonItems} items expiring soon
                    </p>
                    <p className="text-sm text-yellow-600">
                      Use these items within 30 days
                    </p>
                  </div>
                </div>
              )}

              {expiredItems === 0 && expiringSoonItems === 0 && (
                <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium text-green-800">
                      All items are in good condition
                    </p>
                    <p className="text-sm text-green-600">
                      No immediate actions required
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}