"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`이메일: ${email}\n비밀번호: ${password}`);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header showNav={false} />
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-8 border border-gray-800 rounded-lg bg-gray-950 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-center text-white">
            로그인
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block mb-1 text-gray-300">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
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
            <button
              type="submit"
              className="py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors cursor-pointer"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
      <Footer show={false} />
    </div>
  );
}
