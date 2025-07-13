interface FooterProps {
  show?: boolean;
}

export default function Footer({ show = true }: FooterProps) {
  if (!show) return null;

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-6">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-gray-400 text-sm">
          © 2025 LCK MATCH. All rights reserved.
        </p>
        <div className="mt-2 flex justify-center gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-300 transition-colors">
            이용약관
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">
            개인정보처리방침
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">
            고객센터
          </a>
        </div>
      </div>
    </footer>
  );
}
