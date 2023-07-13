'use client'
import Landing from '@/components/home/landing';
import Menu from '@/components/home/menu';
import NoSsr from '@/components/NoSsr';
export default function Home() {
  return <NoSsr>
    {typeof window !== "undefined" && !localStorage.getItem("token") ? <Landing/> : <Menu/>}
  </NoSsr>
}
