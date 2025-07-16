interface FooterProps {
  show?: boolean;
}

export default function Footer({ show = true }: FooterProps) {
  if (!show) return null;

  return (
    <footer className="bg-black border-t border-gray-800 py-8 text-gray-400">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm">© 2024 LCK MATCH. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-6 text-sm">
          <a href="#" className="hover:text-white transition-colors">
            이용약관
          </a>
          <a href="#" className="hover:text-white transition-colors">
            개인정보처리방침
          </a>
          <a href="#" className="hover:text-white transition-colors">
            고객센터
          </a>
        </div>
      </div>
    </footer>
  );
}
