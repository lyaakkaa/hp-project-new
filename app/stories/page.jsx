import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import Stories from './stories';
import { redirect } from 'next/navigation';


export default async function page() {
  const session = await getServerSession(authOptions);
  
  if (session !== null) {
    return (
      <>
        <Stories/>
      </>
    );
    } else {
      redirect('/')
  }
}
