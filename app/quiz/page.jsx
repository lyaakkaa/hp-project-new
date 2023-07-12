
'use client'
import { redirect } from 'next/navigation';
import Quiz from './quiz';

export default async function page() {
  return localStorage.getItem("token") ? <Quiz /> : redirect('/');

}
