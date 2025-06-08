"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, UserCheck, Shield, Eye, Plus, Edit } from 'lucide-react';
import { usersData } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import NewUserModal from '@/components/NewUserModal';

export default function UsersPage() {
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'default';
      case 'editor':
        return 'secondary';
      case 'viewer':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return Shield;
      case 'editor':
        return UserCheck;
      case 'viewer':
        return Eye;
      default:
        return Users;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage user accounts and permissions</p>
        </div>
        <Button onClick={() => setIsNewUserModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersData.length}</div>
            <p className="text-xs text-muted-foreground">
              Active accounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usersData.filter(user => user.role === 'admin').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Full access users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Editors</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usersData.filter(user => user.role === 'editor').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Can edit inventory
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersData.map((user) => {
                const RoleIcon = getRoleIcon(user.role);
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">ID: {user.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role)} className="gap-1">
                        <RoleIcon className="h-3 w-3" />
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(user.created_at)}</TableCell>
                    <TableCell>
                      <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/dashboard/users/${user.id}`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Role Descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Administrator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• Full system access</li>
              <li>• Manage all users</li>
              <li>• Complete inventory control</li>
              <li>• System settings access</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-green-600" />
              Editor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• Edit inventory items</li>
              <li>• Add new items</li>
              <li>• Update quantities</li>
              <li>• Export data</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="h-5 w-5 text-gray-600" />
              Viewer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• View inventory items</li>
              <li>• Search and filter</li>
              <li>• View item details</li>
              <li>• Read-only access</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <NewUserModal
        isOpen={isNewUserModalOpen}
        onClose={() => setIsNewUserModalOpen(false)}
      />
    </div>
  );
}