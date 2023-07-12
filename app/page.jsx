'use client'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import Landing from '@/components/home/landing';
import Menu from '@/components/home/menu';
import { useEffect, useState } from 'react';

export default function Home() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      setHasToken(Boolean(token));
    }
  }, []);

  return hasToken ? <Menu /> : <Landing />;
}
