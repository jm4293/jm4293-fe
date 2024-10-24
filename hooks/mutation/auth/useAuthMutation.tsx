'use client';

import { useMutation } from 'react-query';
import { IAuthSignInReq } from '@/types/interface/auth';
import { AuthApi } from '@/commons/api/auth/auth.api';
import { IAuthSignInRes } from '@/types/interface/auth/auth.response.interface';

export default function useAuthMutation() {
  const onSignInMutation = useMutation({
    mutationFn: (data: IAuthSignInReq) => AuthApi.signIn<IAuthSignInRes, IAuthSignInReq>(data),
  });

  return {
    onSignInMutation,
  };
}
