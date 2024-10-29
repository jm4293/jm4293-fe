'use client';

import { FormEvent, useState } from 'react';
import ButtonWithSpinner from '@/components/button/ButtonWithSpinner';
import useAuthMutation from '@/hooks/mutation/auth/useAuthMutation';
import { useRouter } from 'next/navigation';

export default function FindEmailForm() {
  const { onFindEmailMutation } = useAuthMutation();
  const router = useRouter();

  const [name, setName] = useState('');

  const onFindEmailHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) {
      return alert('이름을 입력해주세요');
    }

    const response = await onFindEmailMutation.mutateAsync({ name });

    if (!!response) {
      alert(`아이디는 ${response.email} 입니다.`);
      router.replace(`/auth?email=${response.email}`);
    }
  };

  return (
    <form onSubmit={onFindEmailHandler}>
      <h2 className="text-center mb-2">아이디 찾기</h2>
      <div className="input-group">
        <label htmlFor="name">이름</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <ButtonWithSpinner type="submit" text="아이디 찾기" bgColor="blue" disabled={onFindEmailMutation.isLoading} />
    </form>
  );
}
