'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import useStorage from '@/hooks/useStorage';
import useAuthMutation from '@/hooks/mutation/auth/useAuthMutation';
import { IAuthSignInReq } from '@/types/interface/auth';
import ButtonWithSpinner from '@/components/button/ButtonWithSpinner';
import { useRouter } from 'next/navigation';

interface IProps {
  email?: string;
}

export default function AuthForm({ email = undefined }: IProps) {
  const { session } = useStorage();
  const { onSignInMutation } = useAuthMutation();
  const router = useRouter();
  const passwordRef = useRef<HTMLInputElement>(null);

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
    router.push('/auth/sign-up');
  };

  const onFindEmailHandle = () => {
    router.push('/auth/find-email');
  };

  const onFindPasswordHandle = () => {
    router.push('/auth/find-password');
  };

  useEffect(() => {
    if (!!email) {
      setSignInData((prev) => ({ ...prev, email }));
      passwordRef.current?.focus();
    }
  }, [email]);

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
          ref={passwordRef}
          id="password"
          type="password"
          value={signInData.password}
          onChange={(e) => setSignInData((prev) => ({ ...prev, password: e.target.value }))}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <ButtonWithSpinner type="submit" text="로그인" bgColor="blue" disabled={onSignInMutation.isLoading} />
        <ButtonWithSpinner type="button" text="회원가입" bgColor="blue" onClick={onSignUpHandle} />
        <div className="flex gap-2">
          <ButtonWithSpinner type="button" text="아이디 찾기" bgColor="gray" onClick={onFindEmailHandle} />
          <ButtonWithSpinner type="button" text="비밀번호 찾기" bgColor="gray" onClick={onFindPasswordHandle} />
        </div>
      </div>
    </form>
  );
}
