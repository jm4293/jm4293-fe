import Navigation from '@/app/(main)/_components/navigation';

interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  return (
    <div className="flex flex-col">
      <div className="main-container">{children}</div>
      <Navigation />
    </div>
  );
}
