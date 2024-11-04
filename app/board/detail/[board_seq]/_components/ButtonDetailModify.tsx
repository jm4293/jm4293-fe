'use client';

import { useRouter } from 'next/navigation';

interface IProps {
  board_seq: string;
}

export default function ButtonDetailModify({ board_seq }: IProps) {
  const router = useRouter();

  const onModifyHandle = () => {
    router.push(`/board/modify/${board_seq}`);
  };

  return (
    <button className="bg-blue-400 hover:bg-blue-500 disabled:bg-blue-400" onClick={onModifyHandle}>
      수정
    </button>
  );
}
