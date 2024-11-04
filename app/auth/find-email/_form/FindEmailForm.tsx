'use client';

import { FormEvent, useState } from 'react';
import ButtonWithSpinner from '@/components/button/ButtonWithSpinner';
import useAuthMutation from '@/hooks/mutation/auth/useAuthMutation';
import ButtonRouterBack from '@/components/button/ButtonRouterBack';

export default function FindEmailForm() {
  const { onFindEmailMutation } = useAuthMutation();

  const [name, setName] = useState('');

  const onFindEmailHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) {
      return alert('이름을 입력해주세요');
    }

    onFindEmailMutation.mutate({ name });
  };

  return (
    <form className="p-4" onSubmit={onFindEmailHandler}>
      <h2 className="text-center mb-2">아이디 찾기</h2>
      <div className="input-group">
        <label htmlFor="name">이름</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="flex flex-col gap-2">
        <ButtonWithSpinner type="submit" text="아이디 찾기" bgColor="blue" disabled={onFindEmailMutation.isLoading} />
        <ButtonRouterBack />
      </div>
    </form>
  );
}
