'use client';

import { FormEvent, useState } from 'react';
import useStorage from '@/hooks/useStorage';
import useAuthMutation from '@/hooks/mutation/auth/useAuthMutation';
import { useRouter } from 'next/navigation';
import { IAuthSignInReq } from '@/types/interface/auth';
import ButtonWithSpinner from '@/components/button/ButtonWithSpinner';

export default function AuthForm() {
  const { session } = useStorage();
  const { onSignInMutation } = useAuthMutation();
  const router = useRouter();

  const [signInData, setSignInData] = useState<IAuthSignInReq>({ email: '', password: '' });

  const onSubmitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await onSignInMutation.mutateAsync(signInData);

    if (!!response) {
      const { email, name } = response;

      session.set('email', email);
      session.set('name', name);

      router.push('/board-list');
    }
  };

  const onSignUpHandle = () => {
    // navigate('/sign-up');
  };

  const onFindPasswordHandle = () => {
    // navigate('/find-password');
  };

  return (
    <form onSubmit={onSubmitHandle}>
      <h2 className="text-center mb-2">로그인</h2>
      <div className="input-group">
        <label htmlFor="email">아이디</label>
        <input
          id="email"
          value={signInData.email}
          onChange={(e) => setSignInData((prev) => ({ ...prev, email: e.target.value }))}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          value={signInData.password}
          onChange={(e) => setSignInData((prev) => ({ ...prev, password: e.target.value }))}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <ButtonWithSpinner type="submit" text="로그인" bgColor="blue" disabled={onSignInMutation.isLoading} />
        <div className="flex gap-2">
          <ButtonWithSpinner
            type="button"
            text="비밀번호 찾기"
            bgColor="sky"
            onClick={onFindPasswordHandle}
            disabled={false}
          />
          <ButtonWithSpinner type="button" text="회원가입" bgColor="sky" onClick={onSignUpHandle} disabled={false} />
        </div>
      </div>
    </form>
  );
}
