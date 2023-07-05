
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import Landing from '@/components/home/landing';
import Chat from './chat';
import { redirect } from 'next/navigation';


export default async function page() {
  const session = await getServerSession(authOptions);
  
  if (session !== null) {
    return (
      <>
        {/* <Chat /> */}
        <Chat />
      </>
    );
    } else {
      redirect('/')
  }
}

// 'use client'
// import { useRouter } from 'next/navigation;
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/lib/authOptions';
// import Landing from '@/components/home/landing';
// import Chat from './chat';

// export default async function page() {
//   const session = await getServerSession(authOptions);
//   const router = useRouter();

//   if (session !== null) {
//     return (
//       <>
//         {/* <Chat /> */}
//         <Chat />
//       </>
//     );
//   } else {
//     // Меняем путь роутера на "/"
//     router.push('/');

//     return (
//       <>
//         <Landing />
//       </>
//     );
//   }
// }
