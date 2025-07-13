interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className = "", onClick }: CardProps) {
  const baseClasses =
    "bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-blue-500 transition-colors";
  const cursorClass = onClick ? "cursor-pointer" : "";

  return (
    <div
      className={`${baseClasses} ${cursorClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
