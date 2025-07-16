"use client";
import { useState } from "react";
import axiosInstance from "@/utils/api";
import { Comment } from "@/utils/types";

interface CommentFormProps {
  postId: number;
  comment?: Comment;
  onSuccess?: () => void;
}

export default function CommentForm({
  postId,
  comment,
  onSuccess,
}: CommentFormProps) {
  const [content, setContent] = useState(comment ? comment.content : "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (comment) {
        await axiosInstance.put(`/api/comments/${comment.id}`, { content });
      } else {
        await axiosInstance.post(`/api/comments, { postId, content }`);
      }
      setContent("");
      onSuccess?.();
    } catch (err: any) {
      setError(err.response?.data?.message || "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!comment) return;
    if (!confirm("정말 삭제하시겠습니까?")) return;
    setLoading(true);
    setError("");
    try {
      await axiosInstance.delete(`/api/comments/${comment.id}`);
      onSuccess?.();
    } catch (err: any) {
      setError(err.response?.data?.message || "삭제 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        className="w-full p-2 border rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요"
        rows={3}
        disabled={loading}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading || !content.trim()}
        >
          {comment ? "수정" : "작성"}
        </button>
        {comment && (
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            disabled={loading}
          >
            삭제
          </button>
        )}
      </div>
    </form>
  );
}
