"use client";
import { useState } from "react";
import axiosInstance from "@/utils/api";
import { useAuthStore } from "@/store/useAuthStore";

export default function TestApi() {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuthStore();

  const testProtectedApi = async () => {
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const res = await axiosInstance.get("/api/test/protected");
      setResponse(res.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "API 호출 중 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  const testPublicApi = async () => {
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const res = await axiosInstance.get("/api/test/public");
      setResponse(res.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "API 호출 중 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-white">API 테스트</h3>

      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={testProtectedApi}
            disabled={loading || !isAuthenticated}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            보호된 API 테스트
          </button>
          <button
            onClick={testPublicApi}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            공개 API 테스트
          </button>
        </div>

        {!isAuthenticated && (
          <p className="text-yellow-400 text-sm">
            보호된 API를 테스트하려면 먼저 로그인해주세요.
          </p>
        )}

        {loading && <p className="text-blue-400">API 호출 중...</p>}

        {error && (
          <div className="text-red-400 text-sm">
            <strong>에러:</strong> {error}
          </div>
        )}

        {response && (
          <div className="bg-gray-800 p-4 rounded">
            <h4 className="text-white font-semibold mb-2">응답:</h4>
            <pre className="text-green-400 text-sm overflow-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
