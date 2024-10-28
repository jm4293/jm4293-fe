import AuthForm from '@/app/auth/components/AuthForm';

interface IProps {
  searchParams: {
    email: string;
  };
}

export default function AuthPage({ searchParams }: IProps) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <AuthForm {...{ email: searchParams.email }} />
    </div>
  );
}
