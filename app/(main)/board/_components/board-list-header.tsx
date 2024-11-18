'use client';

import ButtonWithSpinner from '@/components/button/ButtonWithSpinner';
import { useRouter } from 'next/navigation';

export default function BoardListHeader() {
  const router = useRouter();

  const onCreateBoardHandle = () => {
    router.push('/board/create');
  };

  return (
    <div className="flex items-center gap-2">
      <ButtonWithSpinner type="button" text="글 작성" bgColor="blue" onClick={onCreateBoardHandle} />
    </div>
  );
}
