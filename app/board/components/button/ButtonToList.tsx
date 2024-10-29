'use client';

import { useRouter } from 'next/navigation';

export default function ButtonToList() {
  const router = useRouter();

  const onBackHandle = () => {
    router.push('/board');
  };

  return (
    <button className="bg-red-400 hover:bg-red-500 disabled:bg-red-400" onClick={onBackHandle}>
      뒤로가기
    </button>
  );
}
