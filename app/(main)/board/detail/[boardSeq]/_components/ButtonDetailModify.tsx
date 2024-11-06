'use client';

import { useRouter } from 'next/navigation';

interface IProps {
  boardSeq: string;
}

export default function ButtonDetailModify({ boardSeq }: IProps) {
  const router = useRouter();

  const onModifyHandle = () => {
    router.push(`/board/modify/${boardSeq}`);
  };

  return (
    <button className="bg-blue-400 hover:bg-blue-500 disabled:bg-blue-400" onClick={onModifyHandle}>
      수정
    </button>
  );
}
