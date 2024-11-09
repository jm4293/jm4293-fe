'use client';

import { useForm } from 'react-hook-form';
import ButtonWithSpinner from '@/components/button/ButtonWithSpinner';
import useAuthMutation from '@/hooks/mutation/auth/useAuthMutation';
import ButtonRouterBack from '@/components/button/ButtonRouterBack';
import { IAuthFindEmailReq } from '@/types/interface';

export default function FindEmailForm() {
  const { onFindEmailMutation } = useAuthMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IAuthFindEmailReq>({ defaultValues: { name: '' } });

  const onSubmit = async (data: IAuthFindEmailReq) => {
    onFindEmailMutation.mutate(data);
  };

  return (
    <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center">아이디 찾기</h2>

      <div>
        <label htmlFor="name">이름</label>
        <input id="name" {...register('name', { required: '이름을 입력해주세요.' })} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-4">
        <ButtonWithSpinner
          type="submit"
          text="아이디 찾기"
          bgColor="blue"
          disabled={isSubmitting || onFindEmailMutation.isLoading}
        />
        <ButtonRouterBack />
      </div>
    </form>
  );
}
