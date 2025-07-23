import { useState } from 'react';
import { supabase } from '../supabase';
import Logo from '../src/assets/Do-Track-logo/logo-icon-light-transparent.png';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('signIn'); // "signIn" or "signUp"

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert('Sign up successful! Check your email to confirm.');
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full animate-fade-in">
        {/* Logo & Title */}
        <div className="flex flex-col items-center mb-6">
          <img src={Logo} alt="Do Track Logo" className="w-14 h-14 object-contain mb-2" />
          <h1 className="text-2xl font-bold text-[#0ea5e9] tracking-wide">Do Track</h1>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setMode('signUp')}
            className={`px-5 py-2 rounded-full transition-all duration-300 font-semibold ${
              mode === 'signUp'
                ? 'bg-green-500 text-white shadow-md scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-green-100'
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setMode('signIn')}
            className={`px-5 py-2 rounded-full transition-all duration-300 font-semibold ${
              mode === 'signIn'
                ? 'bg-blue-500 text-white shadow-md scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Input Fields */}
        <div className="space-y-4 mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          {mode === 'signIn' ? (
            <button
              onClick={signIn}
              className="w-full bg-blue-500 hover:bg-blue-600 active:scale-95 transition text-white font-semibold py-2 px-4 rounded-lg shadow"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={signUp}
              className="w-full bg-green-500 hover:bg-green-600 active:scale-95 transition text-white font-semibold py-2 px-4 rounded-lg shadow"
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
