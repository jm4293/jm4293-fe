'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface IProps {
  url?: string;
}

export default function ButtonRouterBack({ url }: IProps) {
  const router = useRouter();

  const onBackHandle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (url) {
      router.push(url);
    } else {
      router.back();
    }

    router.refresh();
  };

  return (
    <button className="bg-gray-400 hover:bg-gray-500 disabled:bg-red-400" onClick={(e) => onBackHandle(e)}>
      뒤로가기
    </button>
  );
}
