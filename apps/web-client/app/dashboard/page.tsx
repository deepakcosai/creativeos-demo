'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { dnaApi, campaignApi } from '@/lib/api/client';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    clients: 0,
    campaigns: 0,
    activeCampaigns: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    loadStats();
  }, [isAuthenticated]);

  const loadStats = async () => {
    try {
      const [clientsData, campaignsData] = await Promise.all([
        dnaApi.getAll(),
        campaignApi.getAll(),
      ]);

      setStats({
        clients: clientsData.length,
        campaigns: campaignsData.length,
        activeCampaigns: campaignsData.filter((c: any) => c.status === 'active').length,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Here's what's happening with your creative operations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">🧬</div>
              <span className="text-sm font-medium text-gray-500">Total</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.clients}</h3>
            <p className="text-gray-600">Client DNA Profiles</p>
            <Link href="/clients" className="mt-4 block">
              <Button variant="outline" className="w-full">View Clients</Button>
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">🚀</div>
              <span className="text-sm font-medium text-gray-500">Total</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.campaigns}</h3>
            <p className="text-gray-600">Campaigns Created</p>
            <Link href="/campaigns" className="mt-4 block">
              <Button variant="outline" className="w-full">View Campaigns</Button>
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">⚡</div>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.activeCampaigns}</h3>
            <p className="text-gray-600">Active Campaigns</p>
            <Link href="/campaigns/new" className="mt-4 block">
              <Button className="w-full">Create New</Button>
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/clients/new">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
                <div className="text-3xl mb-3">➕</div>
                <h3 className="font-semibold text-gray-900 mb-1">Create Client DNA</h3>
                <p className="text-sm text-gray-600">Build a new client intelligence profile</p>
              </div>
            </Link>

            <Link href="/campaigns/new">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-purple-400 hover:bg-purple-50 transition-all cursor-pointer">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-semibold text-gray-900 mb-1">Launch Campaign</h3>
                <p className="text-sm text-gray-600">Create an AI-powered marketing campaign</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}