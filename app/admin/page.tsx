'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/Supabase';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      // For now, we allow you (the owner) to see this. 
      // Later, we can restrict this to specific emails only.
      if (!user) {
        router.push('/login');
        return;
      }

      setIsAdmin(true);
      fetchProfiles();
    };

    checkAdmin();
  }, [router]);

  const fetchProfiles = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('updated_at', { ascending: false });

    if (!error) {
      setProfiles(data);
    }
    setLoading(false);
  };

  if (loading) return <div className="p-8 text-white bg-gray-900 min-h-screen text-center">Checking permissions...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-red-500">Admin Panel</h1>
          <button 
            onClick={() => router.push('/dashboard')}
            className="text-sm text-gray-400 hover:text-white"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold">User Management</h2>
            <p className="text-gray-400 text-sm">View and manage all registered students.</p>
          </div>

          <table className="w-full text-left">
            <thead className="bg-gray-700/50 text-gray-300 text-sm uppercase">
              <tr>
                <th className="p-4">User Email</th>
                <th className="p-4">Subscription</th>
                <th className="p-4">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {profiles.map((profile) => (
                <tr key={profile.id} className="hover:bg-gray-700/30 transition">
                  <td className="p-4 font-mono text-sm">{profile.email}</td>
                  <td className="p-4">
                    {profile.is_subscribed ? (
                      <span className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded-full">PRO</span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded-full">FREE</span>
                    )}
                  </td>
                  <td className="p-4 text-sm text-gray-400">
                    {new Date(profile.updated_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {profiles.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No users found in the database yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
