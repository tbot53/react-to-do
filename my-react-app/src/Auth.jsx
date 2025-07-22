import { useState } from 'react';
import { supabase } from '../supabase';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <div className="space-y-4 p-6 max-w-sm mx-auto">
      <input className="border p-2 w-full" placeholder="email" onChange={e => setEmail(e.target.value)} />
      <input className="border p-2 w-full" type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
      <div className="flex space-x-2">
        <button onClick={signIn} className="bg-blue-500 text-white px-4 py-2 rounded">Sign In</button>
        <button onClick={signUp} className="bg-green-500 text-white px-4 py-2 rounded">Sign Up</button>
      </div>
    </div>
  );
}
