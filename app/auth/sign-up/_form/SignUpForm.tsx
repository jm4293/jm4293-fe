'use client';

import { useForm } from 'react-hook-form';
import ButtonWithSpinner from '@/components/button/ButtonWithSpinner';
import useAuthMutation from '@/hooks/mutation/auth/useAuthMutation';
import { IAuthSignUpReq } from '@/types/interface/auth';
import ButtonRouterBack from '@/components/button/ButtonRouterBack';

export default function SignUpForm() {
  const { onSignUpMutation } = useAuthMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IAuthSignUpReq>({ defaultValues: { email: '', password: '', name: '' } });

  const onSubmit = async (data: IAuthSignUpReq) => {
    onSignUpMutation.mutate(data);
  };

  return (
    <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center">회원가입</h2>

      <div>
        <label htmlFor="name">이름</label>
        <input
          id="name"
          {...register('name', {
            required: '이름을 입력해주세요.',
            // minLength: {
            //   value: 2,
            //   message: '이름은 최소 2자 이상이어야 합니다.',
            // },
          })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email">아이디</label>
        <input
          id="email"
          {...register('email', {
            required: '아이디를 입력해주세요.',
            // pattern: {
            // value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
            // message: '유효한 이메일 주소를 입력해주세요.',
            // },
          })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            // minLength: {
            //   value: 6,
            //   message: '비밀번호는 최소 6자 이상이어야 합니다.',
            // },
          })}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <div className="flex flex-col gap-4">
        <ButtonWithSpinner
          type="submit"
          text="회원가입"
          bgColor="blue"
          disabled={isSubmitting || onSignUpMutation.isLoading}
        />
        <ButtonRouterBack />
      </div>
    </form>
  );
}
