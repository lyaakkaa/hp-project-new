
'use client'
import { redirect } from 'next/navigation';
import Quiz from './quiz';
import NoSsr from '@/components/NoSsr';
import Landing from '@/components/home/landing';

export default async function page() {
  return <NoSsr>
    {typeof window !== "undefined" && !localStorage.getItem("token") ? <Landing/> : <Quiz/>}
  </NoSsr>
}
