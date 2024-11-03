import { useMutation } from 'react-query';
import {
  IAuthChangePasswordReq,
  IAuthChangePasswordRes,
  IAuthFindEmailReq,
  IAuthFindEmailRes,
  IAuthSignInReq,
  IAuthSignInRes,
  IAuthSignUpReq,
  IAuthSigUpRes,
  IAuthVerifyEmailReq,
  MutationError,
  MutationResponse,
} from '@/types/interface';
import { AuthApi } from '@/api/auth';
import { useRouter } from 'next/navigation';

export default function useAuthMutation() {
  const router = useRouter();

  const onSignInMutation = useMutation<MutationResponse<IAuthSignInRes>, MutationError, IAuthSignInReq>({
    mutationFn: (data) => AuthApi.signIn(data),
    onSuccess: (res) => {
      router.push('/board');
    },
  });

  const onSignUpMutation = useMutation<MutationResponse<IAuthSigUpRes>, MutationError, IAuthSignUpReq>({
    mutationFn: (data) => AuthApi.signUp(data),
    onSuccess: (res) => {
      const { email } = res.data.data;

      alert('회원가입이 완료되었습니다.');
      router.replace(`/auth?email=${email}`);
    },
  });

  const onVerifyEmailMutation = useMutation<MutationResponse<null>, MutationError, IAuthVerifyEmailReq>({
    mutationFn: (data: IAuthVerifyEmailReq) => AuthApi.verifyEmail(data),
    onSuccess: (res) => {
      console.log(res);
    },
  });

  const onChangePasswordMutation = useMutation<
    MutationResponse<IAuthChangePasswordRes>,
    MutationError,
    IAuthChangePasswordReq
  >({
    mutationFn: (data: IAuthChangePasswordReq) => AuthApi.changePassword(data),
    onSuccess: (res) => {
      const { email } = res.data.data;

      alert('비밀번호 변경이 완료되었습니다.');
      router.replace(`/auth?email=${email}`);
    },
  });

  const onFindEmailMutation = useMutation<MutationResponse<IAuthFindEmailRes>, MutationError, IAuthFindEmailReq>({
    mutationFn: (data: IAuthFindEmailReq) => AuthApi.findEmail(data),
    onSuccess: (res) => {
      const { email } = res.data.data;

      alert(`아이디는 ${email} 입니다.`);
      router.replace(`/auth?email=${email}`);
    },
  });

  return {
    onSignInMutation,
    onSignUpMutation,
    onVerifyEmailMutation,
    onChangePasswordMutation,
    onFindEmailMutation,
  };
}
