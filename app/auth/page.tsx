import SignInForm from '@/app/auth/_form/SignInForm';

interface IProps {
  searchParams: {
    email?: string;
  };
}

export default function AuthPage({ searchParams }: IProps) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <SignInForm {...{ email: searchParams.email }} />
    </div>
  );
}
