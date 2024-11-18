import SignInForm from '@/app/auth/_form/SignInForm';

interface IProps {
  searchParams: {
    email?: string;
    expired?: string;
    code?: string;
    state?: string;
  };
}

export default function AuthPage({ searchParams }: IProps) {
  return (
    <SignInForm
      {...{
        email: searchParams.email,
        expired: searchParams.expired,
        oauth_naver_code: searchParams.code,
        oauth_naver_state: searchParams.state,
      }}
    />
  );
}
