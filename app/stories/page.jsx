'use client'
import Stories from './stories';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default async function page() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      setHasToken(Boolean(token));
    }
  }, []);
  return hasToken ? <Stories /> : redirect('/');

}
