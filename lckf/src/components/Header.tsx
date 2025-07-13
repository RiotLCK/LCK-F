import Link from "next/link";

interface HeaderProps {
  showNav?: boolean;
}

export default function Header({ showNav = true }: HeaderProps) {
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-slate-300 hover:text-slate-200 transition-colors"
        >
          LCK MATCH
        </Link>
        {showNav && (
          <nav className="flex gap-6">
            <Link
              href="/login"
              className="text-gray-300 hover:text-white transition-colors"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="text-gray-300 hover:text-white transition-colors"
            >
              회원가입
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
