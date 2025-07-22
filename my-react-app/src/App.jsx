// App.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import Auth from './Auth';
import MainApp from './MainApp';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return user ? <MainApp user={user} /> : <Auth onAuth={setUser} />;
}
