"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase'; // This connects to your brain file
import { Loader2, Mail, Lock, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // This creates the user in Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Success! Check your email to confirm your account.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center px-6">
      <div className="max-w-sm mx-auto w-full">
        <h1 className="text-3xl font-bold mb-2">Create Account</h1>
        <p className="text-slate-400 mb-8">Start your journey on Vigileon.</p>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-slate-500" size={20} />
            <input 
              type="email" 
              placeholder="Email Address" 
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 p-4 pl-12 rounded-2xl focus:border-cyan-500 outline-none transition"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-4 text-slate-500" size={20} />
            <input 
              type="password" 
              placeholder="Create Password" 
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 p-4 pl-12 rounded-2xl focus:border-cyan-500 outline-none transition"
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-cyan-500 text-slate-950 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>Get Started <ArrowRight size={18} /></>}
          </button>
        </form>
      </div>
    </div>
  );
}
