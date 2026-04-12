'use client';

// User Management Page
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Trash, Plus, Save, X } from 'lucide-react';

const userSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Role is required'),
  password: z.string().optional(),
});

type UserForm = z.infer<typeof userSchema>;

// Mock users data
const users = [
  { id: 1, username: 'admin', email: 'admin@example.com', role: 'Admin' },
  { id: 2, username: 'editor', email: 'editor@example.com', role: 'Editor' },
  { id: 3, username: 'user', email: 'user@example.com', role: 'User' },
];

const UsersPage = () => {
  const [editingUser, setEditingUser] = React.useState<any>(null);
  
  const form = useForm<UserForm>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: '',
      email: '',
      role: '',
      password: '',
    },
  });

  const onSubmit = (data: UserForm) => {
    console.log('User data:', data);
    // In a real application, you would send the data to your API
    setEditingUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900">User Management</h1>
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus size={18} />
                    <span>Add User</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle>{editingUser ? 'Edit User' : 'Add User'}</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <Form {...form}>
                      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter username" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Enter email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Role</FormLabel>
                              <FormControl>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-md" {...field}>
                                  <option value="">Select role</option>
                                  <option value="Admin">Admin</option>
                                  <option value="Editor">Editor</option>
                                  <option value="User">User</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password {editingUser ? '(Leave blank to keep current)' : ''}</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Enter password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex gap-2">
                          <Button type="submit" className="flex-1">
                            <Save size={16} className="mr-2" />
                            Save
                          </Button>
                          <Button type="button" variant="ghost" onClick={() => setEditingUser(null)}>
                            <X size={16} />
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => setEditingUser(user)}>
                          <Edit size={16} />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-500">
                          <Trash size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default UsersPage;
