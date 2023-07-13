'use client'
import Landing from '@/components/home/landing';
import StoryGenPage from './StoryGenPage';
import NoSsr from '@/components/NoSsr';

export default async function page() {

  return <NoSsr>
    {typeof window !== "undefined" && !localStorage.getItem("token") ? <Landing/> : <StoryGenPage />}
  </NoSsr>

}


