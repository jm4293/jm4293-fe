'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAuthMutation from '@/hooks/mutation/auth/useAuthMutation';
import { IAuthSignInReq } from '@/types/interface/auth';
import ButtonWithSpinner from '@/components/button/ButtonWithSpinner';
import { useRouter } from 'next/navigation';
import useStorage from '@/hooks/useStorage';
import { AxiosConfig } from '@/commons/axios-config';
import Image from 'next/image';

interface IProps {
  email?: string;
  expired?: string;
  oauth_naver_code?: string;
  oauth_naver_state?: string;
}

export default function SignInForm({ email, expired, oauth_naver_code, oauth_naver_state }: IProps) {
  const { onSignInMutation } = useAuthMutation();
  const router = useRouter();
  const { local } = useStorage();

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

  const onOauthNaverHandler = async () => {
    const clientId = process.env.NEXT_PUBLIC_OAUTH_NAVER_CLIENT_ID;
    const redirectUri = encodeURIComponent(String(process.env.NEXT_PUBLIC_OAUTH_NAVER_REDIRECT_URI));
    const state = Math.random().toString(36).substring(2, 15);

    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&state=${state}&client_id=${clientId}&redirect_uri=${redirectUri}`;
  };

  useEffect(() => {
    const refreshToken = local.get('refreshToken');

    if (refreshToken) {
      (async () => {
        try {
          await AxiosConfig.renewAccessToken();
          router.push('/board');
        } catch (err) {
          local.clear();
        }
      })();
    }
  }, []);

  useEffect(() => {
    if (email) {
      setValue('email', email);
    }
  }, [email, setValue]);

  useEffect(() => {
    if (oauth_naver_code && oauth_naver_state) {
      (async () => {
        try {
          const response = await fetch('/api/oauth-naver', {
            method: 'POST',
            body: JSON.stringify({ code: oauth_naver_code, state: oauth_naver_state }),
          });

          const data = await response.json(); // 서버에서 응답받은 데이터 처리
          console.log('Server Response:', data);
        } catch (error) {
          console.error('Error:', error);
        }
      })();
    }
  }, [oauth_naver_code, oauth_naver_state]);

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
          <div>
            <Image
              className="cursor-pointer"
              src="/oauth/oauth_naver.png"
              alt="ouath_naver"
              width={44}
              height={44}
              onClick={onOauthNaverHandler}
            />
          </div>
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
