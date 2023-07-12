'use client'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import Landing from '@/components/home/landing';
import Chat from './chat';
import { redirect } from 'next/navigation';
import StoryGenPage from './StoryGenPage';


export default async function page() {
  
  return localStorage.getItem("token") ? <StoryGenPage /> : redirect('/');

}
