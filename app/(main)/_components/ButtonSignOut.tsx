'use client';

import useStorage from '@/hooks/useStorage';
import ButtonWithSpinner from '@/components/button/ButtonWithSpinner';

export default function ButtonSignOut() {
  const { session, local } = useStorage();

  const onLogoutHandle = async () => {
    try {
      const response = await fetch('/api/sign-out', { method: 'GET' });

      if (response.ok) {
        local.clear();
        session.clear();
        window.location.href = '/auth';
      }
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return <ButtonWithSpinner type="button" text="로그아웃" bgColor="red" onClick={onLogoutHandle} />;
}
