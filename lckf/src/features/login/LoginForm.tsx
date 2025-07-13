"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axiosInstance from "@/utils/api";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  // Zustand 스토어에서 상태와 액션 가져오기
  const { isLoading, error, login, setLoading, setError, clearError } =
    useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 입력 시 에러 메시지 클리어
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/api/users/login", formData);
      const data = response.data;

      if (data.result && data.token && data.refreshToken && data.user) {
        // Zustand 스토어에 로그인 정보 저장
        login(data.user, data.token, data.refreshToken);

        alert("로그인 성공!");
        router.push("/");
      } else {
        setError(data.message || "로그인에 실패했습니다.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-300">비밀번호</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              />
            </div>
            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </button>
          </form>
        </div>
      </div>
      <Footer show={false} />
    </div>
  );
}
