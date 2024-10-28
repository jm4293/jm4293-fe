'use client';

import { useMutation } from 'react-query';
import { IAuthSignInReq, IAuthSignInRes, IAuthSignUp, IAuthSigUpRes } from '@/types/interface/auth';
import { AuthApi } from '@/commons/api/auth/auth.api';

export default function useAuthMutation() {
  const onSignInMutation = useMutation({
    mutationFn: (data: IAuthSignInReq) => AuthApi.signIn<IAuthSignInRes, IAuthSignInReq>(data),
  });

  const onSignUpMutation = useMutation({
    mutationFn: (data: IAuthSignUp) => AuthApi.signUp<IAuthSigUpRes, IAuthSignUp>(data),
  });

  return {
    onSignInMutation,
    onSignUpMutation,
  };
}
