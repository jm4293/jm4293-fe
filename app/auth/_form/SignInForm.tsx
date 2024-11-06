'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import useAuthMutation from '@/hooks/mutation/auth/useAuthMutation';
import { IAuthSignInReq } from '@/types/interface/auth';
import ButtonWithSpinner from '@/components/button/ButtonWithSpinner';
import { useRouter } from 'next/navigation';

interface IProps {
  email?: string;
  expired?: string;
}

export default function SignInForm({ email, expired }: IProps) {
  const { onSignInMutation } = useAuthMutation();
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [signInData, setSignInData] = useState<IAuthSignInReq>({ email: '', password: '' });

  const onSubmitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSignInMutation.mutate(signInData);
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
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!!email) {
      setSignInData((prev) => ({ ...prev, email }));
      passwordRef.current?.focus();
    }
  }, [email]);

  // useEffect(() => {
  //   if (expired) {
  //     alert('세션이 만료되었습니다. 다시 로그인해주세요.');
  //   }
  // }, []);

  return (
    <form className="flex flex-col gap-4 p-4" onSubmit={onSubmitHandle}>
      <h2 className="text-center">로그인</h2>
      <div>
        <label htmlFor="email">아이디</label>
        <input
          ref={emailRef}
          id="email"
          value={signInData.email}
          onChange={(e) => setSignInData((prev) => ({ ...prev, email: e.target.value }))}
          required
        />
      </div>
      <div>
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
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <ButtonWithSpinner type="submit" text="로그인" bgColor="blue" disabled={onSignInMutation.isLoading} />
          <ButtonWithSpinner type="button" text="회원가입" bgColor="blue" onClick={onSignUpHandle} />
        </div>
        <div className="flex gap-2">
          <ButtonWithSpinner type="button" text="아이디 찾기" bgColor="gray" onClick={onFindEmailHandle} />
          <ButtonWithSpinner type="button" text="비밀번호 찾기" bgColor="gray" onClick={onFindPasswordHandle} />
        </div>
      </div>
    </form>
  );
}
