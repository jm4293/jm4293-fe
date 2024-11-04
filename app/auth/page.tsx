import SignInForm from '@/app/auth/_form/SignInForm';

interface IProps {
  searchParams: {
    email?: string;
    expired?: string;
  };
}

export default function AuthPage({ searchParams }: IProps) {
  return <SignInForm {...{ email: searchParams.email, expired: searchParams.expired }} />;
}
