"use client";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

interface HeaderProps {
  showNav?: boolean;
}

export default function Header({ showNav = true }: HeaderProps) {
  const { isAuthenticated, user, logout, isInitialized } = useAuthStore();

  const handleLogout = () => {
    logout();
    // 로그아웃 후 홈페이지로 이동
    window.location.href = "/";
  };

  // 스토어가 초기화되지 않았으면 로딩 상태 표시
  if (!isInitialized) {
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
            <nav className="flex gap-6 items-center">
              <div className="animate-pulse bg-gray-700 h-4 w-20 rounded"></div>
            </nav>
          )}
        </div>
      </header>
    );
  }

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
          <nav className="flex gap-6 items-center">
            {isAuthenticated ? (
              <>
                <span className="text-gray-300">
                  안녕하세요, {user?.nickname}님!
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  prefetch={true}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  prefetch={true}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  회원가입
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
