import ButtonSignOut from '@/app/(main)/_components/ButtonSignOut';

export default function Header() {
  return (
    <header className="fixed top-0 left-[50%] translate-x-[-50%] w-[100vw] min-w-[320px] max-w-[1024px] bg-white min-h-[60px] max-h-[60px] flex justify-end items-center pr-6 pl-6">
      <div>
        <ButtonSignOut />
      </div>
    </header>
  );
}
