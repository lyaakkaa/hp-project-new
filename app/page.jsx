
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import Landing from '@/components/home/landing';
// import Chat from "@/components/home/chat"
import Menu from '@/components/home/menu';

export default async function Home() {
  const session = await getServerSession(authOptions);

  // useEffect(() => {
  //   if (session === null && router.path === '/chat') {
  //     router.push('/')
  //     return <Landing />;
  //   }
  // }, [])
  

  return session !== null ? (
    // <Chat />
    <Menu />
  ) : (
    <Landing />
  );
}
