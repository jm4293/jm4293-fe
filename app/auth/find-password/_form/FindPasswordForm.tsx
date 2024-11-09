'use client';

import { useForm } from 'react-hook-form';
import ButtonWithSpinner from '@/components/button/ButtonWithSpinner';
import useAuthMutation from '@/hooks/mutation/auth/useAuthMutation';
import ButtonRouterBack from '@/components/button/ButtonRouterBack';
import { useEffect, useState } from 'react';
import { IAuthChangePasswordReq, IAuthVerifyEmailReq } from '@/types/interface';

export default function FindPasswordForm() {
  const { onVerifyEmailMutation, onChangePasswordMutation } = useAuthMutation();

  const [isVerified, setIsVerified] = useState(false);

  const {
    register: registerVerify,
    handleSubmit: handleVerifySubmit,
    formState: { errors: verifyErrors, isSubmitting: isVerifying },
    getValues,
  } = useForm<IAuthVerifyEmailReq>({ defaultValues: { email: '', name: '' } });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isChangingPassword },
    getValues: getPasswordValue,
    setValue: setPasswordValue,
  } = useForm<IAuthChangePasswordReq>({ defaultValues: { email: '', password: '' } });

  const onVerifyEmailHandler = async (data: IAuthVerifyEmailReq) => {
    onVerifyEmailMutation.mutate(data);
  };

  const onChangePasswordHandler = async (data: IAuthChangePasswordReq) => {
    onChangePasswordMutation.mutate({ email: data.email, password: data.password });
  };

  useEffect(() => {
    if (onVerifyEmailMutation.isSuccess) {
      setPasswordValue('email', getValues('email'));
      setIsVerified(true);
    }
  }, [onVerifyEmailMutation.isSuccess]);

  return (
    <>
      {isVerified ? (
        <form className="flex flex-col gap-4 p-4" onSubmit={handlePasswordSubmit(onChangePasswordHandler)}>
          <h2 className="text-center">비밀번호 변경</h2>
          <div>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="text"
              {...registerPassword('password', {
                required: '비밀번호를 입력해주세요.',
                // minLength: {
                //   value: 6,
                //   message: '비밀번호는 최소 6자 이상이어야 합니다.',
                // },
              })}
            />
            {passwordErrors.password && <p className="text-red-500 text-sm">{passwordErrors.password.message}</p>}
          </div>
          <div className="flex flex-col gap-4">
            <ButtonWithSpinner
              type="submit"
              text="비밀번호 변경"
              bgColor="blue"
              disabled={isChangingPassword || onChangePasswordMutation.isLoading}
            />
            <ButtonRouterBack />
          </div>
        </form>
      ) : (
        <form className="flex flex-col gap-4 p-4" onSubmit={handleVerifySubmit(onVerifyEmailHandler)}>
          <h2 className="text-center">아이디 인증</h2>
          <div>
            <label htmlFor="name">이름</label>
            <input id="name" {...registerVerify('name', { required: '이름을 입력해주세요.' })} />
            {verifyErrors.name && <p className="text-red-500 text-sm">{verifyErrors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email">아이디</label>
            <input
              id="email"
              {...registerVerify('email', {
                required: '아이디를 입력해주세요.',
                // pattern: {
                //   value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                //   message: '유효한 이메일 주소를 입력해주세요.',
                // },
              })}
            />
            {verifyErrors.email && <p className="text-red-500 text-sm">{verifyErrors.email.message}</p>}
          </div>
          <div className="flex flex-col gap-4">
            <ButtonWithSpinner
              type="submit"
              text="아이디 인증"
              bgColor="blue"
              disabled={isVerifying || onVerifyEmailMutation.isLoading}
            />
            <ButtonRouterBack />
          </div>
        </form>
      )}
    </>
  );
}
