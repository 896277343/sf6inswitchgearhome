'use client';

// Admin Dashboard
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ImageIcon, Plus, Settings, Users, LogOut } from 'lucide-react';

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="flex items-center gap-2">
                <Settings size={18} />
                <span>Settings</span>
              </Button>
              <Button variant="ghost" asChild className="flex items-center gap-2">
                <a href="/admin/users">
                  <Users size={18} />
                  <span>Users</span>
                </a>
              </Button>
              <Button variant="ghost" className="flex items-center gap-2" onClick={() => {
                document.cookie = 'admin_auth=; path=/admin; max-age=0';
                window.location.href = '/admin/login';
              }}>
                <LogOut size={18} />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Image Management Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon size={20} />
                Image Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Upload, edit, and manage images for your website.</p>
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="w-full">Manage Images</Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle>Image Management</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Plus size={32} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Drag and drop images here or click to upload</p>
                      <input type="file" multiple accept="image/*" className="hidden" id="image-upload" />
                      <Button className="mt-4" onClick={() => document.getElementById('image-upload')?.click()}>
                        Select Images
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Image previews will go here */}
                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="flex h-16 w-16 items-center justify-center rounded bg-gray-200 text-xs font-medium text-gray-500">
                          Preview
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">example-image.jpg</h3>
                          <p className="text-sm text-gray-500">128KB • JPG</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">Edit</Button>
                          <Button size="sm" variant="ghost" className="text-red-500">Delete</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>

          {/* Users Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users size={20} />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Manage user accounts and permissions.</p>
              <Button className="w-full">Manage Users</Button>
            </CardContent>
          </Card>

          {/* Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings size={20} />
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Configure site settings and preferences.</p>
              <Button className="w-full">Site Settings</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
