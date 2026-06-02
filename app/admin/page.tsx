"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Users, DollarSign, BookOpen, TrendingUp, ShieldCheck, Loader2 } from 'lucide-react';

// --- DATABASE CONNECTION ---
const supabaseUrl = 'https://ypqelxyyljaxmdbfpitv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtYnBjaG5idmZncGJqdWxoYXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzNDczMzEsImV4cCI6MjA5NTkyMzMzMX0.uQUEh7z7jFr70uf4H7jqgUQz9fkXLX8liYf2C3fyG44';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalRevenue: 0,
    activeSubscribers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminStats();
  }, []);

  async function fetchAdminStats() {
    try {
      // 1. Get total users
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // 2. Get subscribed users
      const { data: subscribers, count: subCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .eq('is_subscribed', true);

      // 3. Calculate Revenue (assuming 25,000 NGN per sub)
      const revenue = (subCount || 0) * 25000;

      setStats({
        totalStudents: userCount || 0,
        totalRevenue: revenue,
        activeSubscribers: subCount || 0
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Loader2 className="text-cyan-500 animate-spin" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-black tracking-tighter">VIGILEON <span className="text-cyan-500">HQ</span></h1>
          <p className="text-slate-500 text-xs uppercase font-bold tracking-widest">Admin Control Panel</p>
        </div>
        <div className="bg-cyan-500/10 p-2 rounded-full border border-cyan-500/20">
          <ShieldCheck className="text-cyan-500" size={24} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        
        {/* Revenue Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem]">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-green-500/20 p-3 rounded-2xl">
              <DollarSign className="text-green-500" />
            </div>
            <span className="text-slate-400 font-bold text-sm">Total Revenue</span>
          </div>
          <div className="text-4xl font-black text-white">
            ₦{stats.totalRevenue.toLocaleString()}
          </div>
          <div className="mt-2 text-green-500 text-xs font-bold flex items-center gap-1">
            <TrendingUp size={12} /> +12% this week
          </div>
        </div>

        {/* Students Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem]">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-cyan-500/20 p-3 rounded-2xl">
              <Users className="text-cyan-500" />
            </div>
            <span className="text-slate-400 font-bold text-sm">Total Students</span>
          </div>
          <div className="text-4xl font-black text-white">{stats.totalStudents}</div>
        </div>

        {/* Sales Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem]">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-purple-500/20 p-3 rounded-2xl">
              <BookOpen className="text-purple-500" />
            </div>
            <span className="text-slate-400 font-bold text-sm">Active Pro Users</span>
          </div>
          <div className="text-4xl font-black text-white">{stats.activeSubscribers}</div>
        </div>

      </div>

      {/* Quick Actions */}
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 ml-2">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-slate-900 border border-slate-800 py-4 rounded-2xl font-bold text-sm active:bg-slate-800">
          Add Lesson
        </button>
        <button className="bg-slate-900 border border-slate-800 py-4 rounded-2xl font-bold text-sm active:bg-slate-800 text-red-500">
          Logout
        </button>
      </div>
    </div>
  );
}
