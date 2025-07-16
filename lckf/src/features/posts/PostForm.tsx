import React, { useState, useEffect } from "react";
import { Post } from "../../utils/types";
import { useAuthStore } from "@/store/useAuthStore";

interface PostFormProps {
  initialPost?: Partial<Post>;
  onSubmit: (post: { title: string; content: string }) => void;
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

  useEffect(() => {
    setTitle(initialPost.title || "");
    setContent(initialPost.content || "");
  }, [initialPost]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    onSubmit({ title, content });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 8 }}
    >
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="작성자"
        value={user?.nickname || ""}
        disabled
      />
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit">{initialPost?.title ? "수정" : "작성"}</button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            취소
          </button>
        )}
      </div>
    </form>
  );
};

export default PostForm;
