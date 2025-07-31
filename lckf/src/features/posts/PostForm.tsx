import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

interface PostFormProps {
  initialPost?: Partial<{
    title: string;
    content: string;
    category: string;
  }>;
  onSubmit: (post: {
    title: string;
    content: string;
    category: string;
  }) => void;
  onCancel?: () => void;
}

const PostForm: React.FC<PostFormProps> = ({
  initialPost = {},
  onSubmit,
  onCancel,
}) => {
  const user = useAuthStore((state) => state.user);
  const [title, setTitle] = useState(initialPost.title || "");
  const [content, setContent] = useState(initialPost.content || "");
  const [category, setCategory] = useState(initialPost.category || "");

  useEffect(() => {
    setTitle(initialPost.title || "");
    setContent(initialPost.content || "");
    setCategory(initialPost.category || "");
  }, [initialPost]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !category) {
      alert("제목, 내용, 카테고리를 모두 입력해주세요.");
      return;
    }
    onSubmit({ title, content, category });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        rows={6}
        className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">카테고리 선택</option>
        <option value="free">자유</option>
        <option value="notice">공지</option>
        <option value="question">질문</option>
        {/* 필요한 카테고리 추가 */}
      </select>
      <input
        type="text"
        value={user?.nickname || ""}
        disabled
        className="w-full px-4 py-2 bg-gray-800 text-gray-400 rounded border border-gray-700 cursor-not-allowed"
      />
      <div className="flex gap-3 justify-end">
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {initialPost?.title ? "수정" : "작성"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            취소
          </button>
        )}
      </div>
    </form>
  );
};

export default PostForm;
