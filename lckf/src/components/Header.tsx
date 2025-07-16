"use client";
import Link from "next/link";

interface HeaderProps {
  showNav?: boolean;
}

export default function Header({ showNav = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 w-full bg-black border-b border-gray-800 shadow-md backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-slate-200 hover:text-white transition-colors"
        >
          LCK MATCH
        </Link>
        {showNav && (
          <nav className="flex gap-6">
            <Link
              href="/login"
              className="text-gray-100 hover:text-white transition-colors"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="text-gray-100 hover:text-white transition-colors"
            >
              회원가입
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
