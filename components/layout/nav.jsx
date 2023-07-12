'use client'
import Navbar from "./navbar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { useEffect, useState } from 'react';

export default async function Nav() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      setHasToken(Boolean(token));
    }
  }, []);
  return <Navbar hasToken={hasToken} />;
}
