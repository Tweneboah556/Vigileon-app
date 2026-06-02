'use client';

import { useState } from 'react';
import { supabase } from '@/lib/Supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePaystackPayment } from 'react-paystack';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // PAYSTACK CONFIGURATION FOR 20 GHS
  const config = {
    reference: (new Date()).getTime().toString(),
    email: email,
    amount: 2000, // 2000 pesewas = 20.00 GHS
    publicKey: ' pk_live_0adba346fb64f2e371699f37626298dc6ada4b29', // REPLACE THIS WITH YOUR PAYSTACK PUBLIC KEY
    currency: 'GHS',
  };

  const initializePayment = usePaystackPayment(config);

  // This runs ONLY after the payment is successful
  const onSuccess = async (reference: any) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => {
    setError("Payment was cancelled. You must pay 20 GHS to register.");
  };

  const handleRegisterAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError(null);
    
    // Triggers the Paystack popup
    initializePayment({onSuccess, onClose});
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4 text-center">
        <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl border border-green-800/50">
          <h2 className="text-2xl font-bold text-green-500 mb-4">Payment Successful!</h2>
          <p className="text-gray-300 mb-6">
            Thank you for your payment of 20 GHS. We sent a confirmation link to <strong>{email}</strong>. Please check your email.
          </p>
          <Link href="/login" className="text-blue-500 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-2 text-blue-500">Join Vigileon</h1>
        <p className="text-center text-gray-400 mb-8">Registration Fee: 20 GHS</p>
        
        {error && (
          <div className="p-3 mb-4 text-sm text-red-400 bg-red-900/30 border border-red-800 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleRegisterAttempt} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 outline-none text-white"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Create Password</label>
            <input
              type="password"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 outline-none text-white"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition-all"
          >
            Pay 20 GHS & Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
