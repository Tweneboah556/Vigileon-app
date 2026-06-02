'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/Supabase';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // If no user is logged in, send them to the login page
        router.push('/login');
      } else {
        setUser(user);
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-xl animate-pulse">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation Bar */}
      <nav className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-500">Vigileon</h1>
          <button 
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-medium transition"
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Welcome back!</h2>
          <p className="text-gray-400 mb-6">Logged in as: <span className="text-blue-400">{user?.email}</span></p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 bg-gray-700 rounded-lg border border-gray-600">
              <h3 className="text-xl font-semibold mb-2">Your Courses</h3>
              <p className="text-gray-400">You haven't started any courses yet. Ready to learn?</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition">
                Browse Lessons
              </button>
            </div>

            <div className="p-6 bg-gray-700 rounded-lg border border-gray-600">
              <h3 className="text-xl font-semibold mb-2">Account Status</h3>
              <p className="text-gray-400">Subscription: <span className="text-yellow-500 font-bold">Free Tier</span></p>
              <button className="mt-4 px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
