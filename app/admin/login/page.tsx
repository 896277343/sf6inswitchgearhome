'use client';

// Admin Login Page
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { siteConfig } from '@/site.config';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real application, you would send the credentials to your authentication API
    console.log('Login data:', { username, password });

    // For demo purposes, we'll just simulate a successful login
    setLoading(true);

    // Set auth cookie
    document.cookie = 'admin_auth=true; path=/admin; max-age=86400'; // 1 day

    setTimeout(() => {
      setLoading(false);
      window.location.href = '/admin';
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <Label className="flex items-center gap-2">
                  <User size={16} />
                  Username
                </Label>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <Lock size={16} />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>
        <p className="text-center text-sm text-gray-500 mt-4">
          &copy; 2026 {siteConfig.brand.legalName}. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
