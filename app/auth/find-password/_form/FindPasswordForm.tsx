'use client';

import ButtonWithSpinner from '@/components/button/ButtonWithSpinner';
import useAuthMutation from '@/hooks/mutation/auth/useAuthMutation';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { IAuthVerifyEmailReq } from '@/types/interface/auth';
import ButtonRouterBack from '@/components/button/ButtonRouterBack';

export default function FindPasswordForm() {
  const { onVerifyEmailMutation, onChangePasswordMutation } = useAuthMutation();
  const router = useRouter();

  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [first, setFirst] = useState<IAuthVerifyEmailReq>({ name: '', email: '' });
  const [second, setSecond] = useState<string>('');

  const onVerifyEmailHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!first.name) {
      return alert('이름을 입력해주세요');
    }

    if (!first.email) {
      return alert('아이디를 입력해주세요');
    }

    onVerifyEmailMutation.mutate(first);
  };

  const onFindPasswordHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!second) {
      return alert('비밀번호를 입력해주세요');
    }

    onChangePasswordMutation.mutate({ email: first.email, password: second });
  };

  useEffect(() => {
    if (onVerifyEmailMutation.isSuccess) {
      setIsVerified(true);
    }
  }, [onVerifyEmailMutation.isSuccess]);

  return (
    <>
      {isVerified ? (
        <form className="p-4" onSubmit={onFindPasswordHandler}>
          <h2 className="text-center mb-2">비밀번호 변경</h2>

          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input id="password" value={second} onChange={(e) => setSecond(e.target.value)} required />
          </div>
          <div className="flex flex-col gap-2">
            <ButtonWithSpinner
              type="submit"
              text="비밀번호 변경"
              bgColor="blue"
              disabled={onChangePasswordMutation.isLoading}
            />
            <ButtonRouterBack />
          </div>
        </form>
      ) : (
        <form className="p-4" onSubmit={onVerifyEmailHandler}>
          <h2 className="text-center mb-2">아이디 인증</h2>

          <div className="input-group">
            <label htmlFor="name">이름</label>
            <input
              id="name"
              value={first.name}
              onChange={(e) => setFirst((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">아이디</label>
            <input
              id="email"
              value={first.email}
              onChange={(e) => setFirst((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <ButtonWithSpinner
              type="submit"
              text="아이디 인증"
              bgColor="blue"
              disabled={onVerifyEmailMutation.isLoading}
            />
            <ButtonRouterBack />
          </div>
        </form>
      )}
    </>
  );
}
