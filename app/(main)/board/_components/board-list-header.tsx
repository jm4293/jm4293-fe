'use client';

import ButtonWithSpinner from '@/components/button/ButtonWithSpinner';
import { useRouter } from 'next/navigation';
import useStorage from '@/hooks/useStorage';

export default function BoardListHeader() {
  const router = useRouter();
  const { local } = useStorage();

  const onCreateBoardHandle = () => {
    router.push('/board/create');
  };

  const onLogoutHandle = async () => {
    try {
      const response = await fetch('/api/sign-out', { method: 'GET' });

      if (response.ok) {
        local.remove('refreshToken');
        window.location.href = '/auth';
      }
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <ButtonWithSpinner type="button" text="글 작성" bgColor="blue" onClick={onCreateBoardHandle} />
      <ButtonWithSpinner type="button" text="로그아웃" bgColor="red" onClick={onLogoutHandle} />
    </div>
  );
}
