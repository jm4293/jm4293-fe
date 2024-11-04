'use client';

import { useRouter } from 'next/navigation';

interface IProps {
  url?: string;
}

export default function ButtonRouterBack({ url }: IProps) {
  const router = useRouter();

  const onBackHandle = () => {
    if (url) {
      router.push(url);
    } else {
      router.back();
    }
  };

  return (
    <button className="bg-gray-400 hover:bg-gray-500 disabled:bg-red-400" onClick={onBackHandle}>
      뒤로가기
    </button>
  );
}
