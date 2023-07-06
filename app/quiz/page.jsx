
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import Quiz from './quiz';
import { redirect } from 'next/navigation';


export default async function page() {
  const session = await getServerSession(authOptions);
  
  if (session !== null) {
    return (
      <>
        <Quiz />
      </>
    );
    } else {
      redirect('/')
  }
}
