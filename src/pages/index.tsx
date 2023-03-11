import { Inter } from 'next/font/google';
import { trpc } from '../utils/trpc';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { data } = trpc.hello.useQuery({ text: 'Momma' });

  if (!data) return <div>Loading...</div>;

  return <div>{data.greeting}</div>

  return <div className="h-screen w-screen flex flex-col justify-center items-center">
    <div className="text-2xl text-center">Which Pokemon is rounder?</div>
    <div className="p-2"></div>
    <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
      <div className="w-16 h-16 bg-red-200"></div>
      <div className="p-8">Vs</div>
      <div className="w-16 h-16 bg-red-200"></div>
    </div>
  </div>;
}
