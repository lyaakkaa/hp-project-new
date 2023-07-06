
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import Landing from '@/components/home/landing';
// import Chat from "@/components/home/chat"
import Menu from '@/components/home/menu';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return session !== null ? (
    // <Chat />
    <Menu />
  ) : (
    <Landing />
  );
}
