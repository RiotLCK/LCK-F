"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axiosInstance from "@/utils/api";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 입력 시 에러 메시지 클리어
    if (error) setError("");
    if (successMessage) setSuccessMessage("");
  };

  const handleCheckNickname = async () => {
    if (!formData.nickname.trim()) {
      setError("닉네임을 입력해주세요.");
      return;
    }
    setIsCheckingNickname(true);
    setError("");
    try {
      const response = await axiosInstance.get(
        `/api/users/check-nickname?nickname=${encodeURIComponent(
          formData.nickname
        )}`
      );
      const data = response.data;
      if (data.result && data.available) {
        setSuccessMessage("사용 가능한 닉네임입니다!");
      } else {
        setError(data.message || "이미 사용 중인 닉네임입니다.");
      }
    } catch (err: any) {
      setError("중복 확인 중 오류가 발생했습니다.");
    } finally {
      setIsCheckingNickname(false);
    }
  };

  const handleCheckEmail = async () => {
    if (!formData.email.trim()) {
      setError("이메일을 입력해주세요.");
      return;
    }
    setIsCheckingEmail(true);
    setError("");
    try {
      const response = await axiosInstance.get(
        `/api/users/check-email?email=${encodeURIComponent(formData.email)}`
      );
      const data = response.data;
      if (data.result && data.available) {
        setSuccessMessage("사용 가능한 이메일입니다!");
      } else {
        setError(data.message || "이미 사용 중인 이메일입니다.");
      }
    } catch (err: any) {
      setError("중복 확인 중 오류가 발생했습니다.");
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (formData.password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (formData.password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/api/users/signup", {
        ...formData,
        type: "EMAIL",
      });
      const data = response.data;
      if (data.result) {
        setSuccessMessage(
          "회원가입이 완료되었습니다! 로그인 페이지로 이동합니다."
        );
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(data.message || "회원가입에 실패했습니다.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "회원가입 중 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
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
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                />
              </div>
              <button
                type="button"
                onClick={handleCheckNickname}
                disabled={isLoading || isCheckingNickname}
                className="px-3 py-2 bg-white text-black rounded hover:bg-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCheckingNickname ? "확인중..." : "중복확인"}
              </button>
            </div>
            <div className="flex gap-2 items-end">
              <div className="flex-1">
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
              <button
                type="button"
                onClick={handleCheckEmail}
                disabled={isLoading || isCheckingEmail}
                className="px-3 py-2 bg-white text-black rounded hover:bg-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCheckingEmail ? "확인중..." : "중복확인"}
              </button>
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
                minLength={6}
                className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-300">비밀번호 확인</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              />
            </div>
            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}
            {successMessage && (
              <div className="text-green-400 text-sm text-center">
                {successMessage}
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "회원가입 중..." : "회원가입"}
            </button>
          </form>
        </div>
      </div>
      <Footer show={false} />
    </div>
  );
}
