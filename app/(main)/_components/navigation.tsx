import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="fixed bottom-0 w-full bg-white min-h-[60px] max-h-[60px] flex justify-between items-center pr-6 pl-6">
      <Link href="/board">Board</Link>
      <Link href="/chatting">Chatting</Link>
      <Link href="/my">My</Link>
    </nav>
  );
}
