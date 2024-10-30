'use client';

import { useRouter } from 'next/navigation';

export default function ButtonRouterBack() {
  const router = useRouter();

  const onBackHandle = () => {
    router.back();
  };

  return (
    <button className="bg-gray-400 hover:bg-gray-500 disabled:bg-red-400" onClick={onBackHandle}>
      뒤로가기
    </button>
  );
}
