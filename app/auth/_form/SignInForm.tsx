'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<IAuthSignInReq>({ defaultValues: { email: email || '', password: '' } });

  const onSubmit = async (data: IAuthSignInReq) => {
    onSignInMutation.mutate(data);
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
    if (email) {
      setValue('email', email);
    }
  }, [email, setValue]);

  return (
    <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center">로그인</h2>

      <div>
        <label htmlFor="email">아이디</label>
        <input id="email" {...register('email', { required: '아이디를 입력하세요.' })} autoFocus />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">비밀번호</label>
        <input id="password" type="password" {...register('password', { required: '비밀번호를 입력하세요.' })} />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <ButtonWithSpinner
            type="submit"
            text="로그인"
            bgColor="blue"
            disabled={isSubmitting || onSignInMutation.isLoading}
          />
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
