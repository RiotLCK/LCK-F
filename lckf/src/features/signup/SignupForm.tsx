"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SignupForm() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    setError("");
    alert(`닉네임: ${nickname}\n이메일: ${email}\n비밀번호: ${password}`);
  };

  const handleCheckNickname = () => {
    alert(`닉네임 '${nickname}' 중복확인! (임시)`);
  };
  const handleCheckEmail = () => {
    alert(`이메일 '${email}' 중복확인! (임시)`);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header showNav={false} />
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-8 border border-gray-800 rounded-lg bg-gray-950 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-center text-white">
            회원가입
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="block mb-1 text-gray-300">닉네임</label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                type="button"
                onClick={handleCheckNickname}
                className="px-3 py-2 bg-white text-black rounded hover:bg-gray-200 cursor-pointer"
              >
                중복확인
              </button>
            </div>
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="block mb-1 text-gray-300">이메일</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                type="button"
                onClick={handleCheckEmail}
                className="px-3 py-2 bg-white text-black rounded hover:bg-gray-200 cursor-pointer"
              >
                중복확인
              </button>
            </div>
            <div>
              <label className="block mb-1 text-gray-300">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-300">비밀번호 확인</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <button
              type="submit"
              className="py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors cursor-pointer"
            >
              회원가입
            </button>
          </form>
        </div>
      </div>
      <Footer show={false} />
    </div>
  );
}
