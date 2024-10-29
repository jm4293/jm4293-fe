'use client';

import { useMutation } from 'react-query';
import {
  IAuthChangePasswordReq,
  IAuthFindEmailReq,
  IAuthFindEmailRes,
  IAuthSignInReq,
  IAuthSignInRes,
  IAuthSignUpReq,
  IAuthSigUpRes,
  IAuthVerifyEmailReq,
} from '@/types/interface/auth';
import { AuthApi } from '@/commons/api/auth/auth.api';

export default function useAuthMutation() {
  const onSignInMutation = useMutation({
    mutationFn: (data: IAuthSignInReq) => AuthApi.signIn<IAuthSignInRes, IAuthSignInReq>(data),
  });

  const onSignUpMutation = useMutation({
    mutationFn: (data: IAuthSignUpReq) => AuthApi.signUp<IAuthSigUpRes, IAuthSignUpReq>(data),
  });

  const onVerifyEmailMutation = useMutation({
    mutationFn: (data: IAuthVerifyEmailReq) => AuthApi.verifyEmail<boolean, IAuthVerifyEmailReq>(data),
  });

  const onChangePasswordMutation = useMutation({
    mutationFn: (data: IAuthChangePasswordReq) => AuthApi.changePassword<boolean, IAuthChangePasswordReq>(data),
  });

  const onFindEmailMutation = useMutation({
    mutationFn: (data: IAuthFindEmailReq) => AuthApi.findEmail<IAuthFindEmailRes, IAuthFindEmailReq>(data),
  });

  return {
    onSignInMutation,
    onSignUpMutation,
    onVerifyEmailMutation,
    onChangePasswordMutation,
    onFindEmailMutation,
  };
}
