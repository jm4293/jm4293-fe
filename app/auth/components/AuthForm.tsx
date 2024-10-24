'use client';

import { FormEvent, useState } from 'react';
import useStorage from '@/hooks/useStorage';
import useAuthMutation from '@/hooks/mutation/auth/useAuthMutation';
import { useRouter } from 'next/navigation';
import { IAuthSignInReq } from '@/types/interface/auth';

export default function AuthForm() {
  const [signInData, setSignInData] = useState<IAuthSignInReq>({ email: '', password: '' });

  const { setSessionStorage, setLocalStorage } = useStorage();
  const { onSignInMutation } = useAuthMutation();
  const router = useRouter();

  const onSubmitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await onSignInMutation.mutateAsync(signInData);

    if (!!response) {
      const { email, name, refreshToken } = response;

      setLocalStorage('refreshToken', refreshToken);
      setSessionStorage('email', email);
      setSessionStorage('name', name);

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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button type="submit" className="bg-blue-400 hover:bg-blue-500">
          로그인
        </button>
        <div className="flex gap-2">
          <button type="button" className="bg-gray-400 hover:bg-gray-500" onClick={onFindPasswordHandle}>
            비밀번호 변경
          </button>
          <button type="button" className="bg-sky-400 hover:bg-sky-500" onClick={onSignUpHandle}>
            회원가입
          </button>
        </div>
      </div>
    </form>
  );
}
