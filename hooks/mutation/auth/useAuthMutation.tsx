'use client';

import { useMutation } from 'react-query';
import { AuthApi } from '@/api';
import {
  IAuthChangePasswordReq,
  IAuthFindEmailReq,
  IAuthSignInReq,
  IAuthSignUpReq,
  IAuthVerifyEmailReq,
} from '@/types/interface';

export default function useAuthMutation() {
  const onSignInMutation = useMutation({
    mutationFn: (data: IAuthSignInReq) => AuthApi.signIn(data),
  });

  const onSignUpMutation = useMutation({
    mutationFn: (data: IAuthSignUpReq) => AuthApi.signUp(data),
  });

  const onVerifyEmailMutation = useMutation({
    mutationFn: (data: IAuthVerifyEmailReq) => AuthApi.verifyEmail(data),
  });

  const onChangePasswordMutation = useMutation({
    mutationFn: (data: IAuthChangePasswordReq) => AuthApi.changePassword(data),
  });

  const onFindEmailMutation = useMutation({
    mutationFn: (data: IAuthFindEmailReq) => AuthApi.findEmail(data),
  });

  return {
    onSignInMutation,
    onSignUpMutation,
    onVerifyEmailMutation,
    onChangePasswordMutation,
    onFindEmailMutation,
  };
}
