import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="fixed bottom-0 left-[50%] translate-x-[-50%] w-[100vw] min-w-[320px] max-w-[1024px] bg-white min-h-[60px] max-h-[60px] flex justify-between items-center pr-6 pl-6">
      <Link href="/board">Board</Link>
      <Link href="/chatting">Chatting</Link>
      <Link href="/my">My</Link>
    </nav>
  );
}
