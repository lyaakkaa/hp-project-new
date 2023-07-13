'use client'
import Stories from './stories';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import NoSsr from '@/components/NoSsr';
import Landing from '@/components/home/landing';

export default async function page() {
  return <NoSsr>
    {typeof window !== "undefined" && !localStorage.getItem("token") ? <Landing /> : <Stories />}
  </NoSsr>

}
