"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Play, Lock, CheckCircle, BookOpen, User, LogOut, Loader2 } from 'lucide-react';

// --- DATABASE CONNECTION ---
const supabaseUrl = '  https://ypqelxyyljaxmdbfpitv.supabase.co';
const supabaseAnonKey = '  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtYnBjaG5idmZncGJqdWxoYXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzNDczMzEsImV4cCI6MjA5NTkyMzMzMX0.uQUEh7z7jFr70uf4H7jqgUQz9fkXLX8liYf2C3fyG44  ';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(data);
    } else {
      window.location.href = "/login";
    }
    setLoading(false);
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Loader2 className="text-cyan-500 animate-spin" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20">
      {/* Top Profile Bar */}
      <div className="p-6 flex items-center justify-between bg-slate-900/50 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center font-black text-slate-950">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Student</p>
            <p className="text-sm font-bold truncate w-32">{user?.email}</p>
          </div>
        </div>
        <button onClick={() => supabase.auth.signOut()} className="text-slate-500 p-2">
          <LogOut size={20} />
        </button>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-black mb-6">Your <span className="text-cyan-500">Courses</span></h2>

        {/* Course Card */}
        <div className="bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 mb-6">
          <div className="h-40 bg-gradient-to-br from-cyan-600 to-blue-700 p-6 flex flex-col justify-end">
            <h3 className="text-xl font-black leading-tight">React & Next.js <br/>Mastery 2024</h3>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase">
                <BookOpen size={14} /> 12 Lessons
              </div>
              {profile?.is_subscribed ? (
                <span className="bg-green-500/10 text-green-500 text-[10px] font-black px-3 py-1 rounded-full uppercase">Unlocked</span>
              ) : (
                <span className="bg-amber-500/10 text-amber-500 text-[10px] font-black px-3 py-1 rounded-full uppercase">Locked</span>
              )}
            </div>

            {profile?.is_subscribed ? (
              <button 
                onClick={() => window.location.href = "/lesson-player"}
                className="w-full bg-white text-slate-950 font-black py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Play size={18} fill="currentColor" /> CONTINUE LEARNING
              </button>
            ) : (
              <button 
                onClick={() => window.location.href = "/pricing"}
                className="w-full bg-cyan-500 text-slate-950 font-black py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                <Lock size={18} /> UNLOCK FULL ACCESS
              </button>
            )}
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-slate-900/40 border border-slate-800/50 rounded-3xl p-6">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Learning Progress</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Introduction to React</span>
              <CheckCircle size={18} className="text-green-500" />
            </div>
            <div className="flex items-center justify-between opacity-50">
              <span className="text-sm text-slate-300">Advanced Hooks</span>
              <Lock size={18} className="text-slate-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 px-10 py-4 flex justify-between items-center">
        <BookOpen className="text-cyan-500" />
        <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
        <User className="text-slate-500" />
      </div>
    </div>
  );
}
