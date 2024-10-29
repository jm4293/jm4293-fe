'use client';

import ButtonWithSpinner from '@/components/button/ButtonWithSpinner';
import useAuthMutation from '@/hooks/mutation/auth/useAuthMutation';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { IAuthVerifyEmailReq } from '@/types/interface/auth';

export default function FindPasswordForm() {
  const { onVerifyEmailMutation, onChangePasswordMutation } = useAuthMutation();
  const router = useRouter();

  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [data, setData] = useState<IAuthVerifyEmailReq>({
    name: '',
    email: '',
  });

  const [password, setPassword] = useState<string>('');

  const onVerifyEmailHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data.name) {
      return alert('이름을 입력해주세요');
    }

    if (!data.email) {
      return alert('아이디를 입력해주세요');
    }

    const response = await onVerifyEmailMutation.mutateAsync(data);

    setIsVerified(response);
  };

  const onFindPasswordHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password) {
      return alert('비밀번호를 입력해주세요');
    }

    const response = await onChangePasswordMutation.mutateAsync({ email: data.email, password });

    if (response) {
      alert('비밀번호 변경이 완료되었습니다.');
      router.replace(`/auth?email=${data.email}`);
    }
  };

  return (
    <>
      {isVerified ? (
        <form onSubmit={onFindPasswordHandler}>
          <h2 className="text-center mb-2">비밀번호 변경</h2>

          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <ButtonWithSpinner
            type="submit"
            text="비밀번호 변경"
            bgColor="blue"
            disabled={onChangePasswordMutation.isLoading}
          />
        </form>
      ) : (
        <form onSubmit={onVerifyEmailHandler}>
          <h2 className="text-center mb-2">아이디 인증</h2>

          <div className="input-group">
            <label htmlFor="name">이름</label>
            <input
              id="name"
              value={data.name}
              onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">아이디</label>
            <input
              id="email"
              value={data.email}
              onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          <ButtonWithSpinner
            type="submit"
            text="아이디 인증"
            bgColor="blue"
            disabled={onVerifyEmailMutation.isLoading}
          />
        </form>
      )}
    </>
  );
}
