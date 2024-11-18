import Navigation from '@/app/(main)/_components/navigation';
import Header from '@/app/(main)/_components/header';

interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="main-container">{children}</div>
      <Navigation />
    </div>
  );
}
