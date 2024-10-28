'use client';

import { FormEvent, useState } from 'react';
import ButtonWithSpinner from '@/components/button/ButtonWithSpinner';
import useAuthMutation from '@/hooks/mutation/auth/useAuthMutation';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const { onSignUpMutation } = useAuthMutation();
  const router = useRouter();

  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const onSignUpHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await onSignUpMutation.mutateAsync(data);

    if (!!response) {
      const { email } = response;

      alert('회원가입이 완료되었습니다.');
      router.push(`/auth?email=${email}`);
    }
  };

  return (
    <form onSubmit={onSignUpHandler} className="login-form">
      <h2 className="text-center mb-2">회원가입</h2>
      <div className="input-group">
        <label htmlFor="email">아이디</label>
        <input
          id="email"
          value={data.email}
          onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          value={data.password}
          onChange={(e) => setData((prev) => ({ ...prev, password: e.target.value }))}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="name">이름</label>
        <input
          id="name"
          value={data.name}
          onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>
      <ButtonWithSpinner type="submit" text="회원가입" bgColor="sky" />
    </form>
  );
}
