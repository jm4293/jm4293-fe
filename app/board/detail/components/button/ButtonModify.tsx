'use client';

import { useRouter } from 'next/navigation';
import useStorage from '@/hooks/useStorage';

interface IProps {
  email: string;
}

export default function ButtonModify({ email }: IProps) {
  const router = useRouter();
  const { session } = useStorage();

  const onModifyHandle = () => {
    // router.push(`/board/${id}/modify`);
  };

  if (email !== session.get('email')) {
    return null;
  }

  return (
    <button className="bg-blue-400 hover:bg-blue-500 disabled:bg-blue-400" onClick={onModifyHandle}>
      수정
    </button>
  );
}
