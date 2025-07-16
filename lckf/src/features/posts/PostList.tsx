import React, { useState, useEffect } from "react";
import { Post } from "../../utils/types";
import PostForm from "./PostForm";
import { useAuthStore } from "@/store/useAuthStore";
import api from "@/utils/api";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showForm, setShowForm] = useState(false);

  const user = useAuthStore((state) => state.user);

  // 게시글 전체 불러오기
  useEffect(() => {
    api
      .get("/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("게시글 불러오기 실패", err));
  }, []);

  // 게시글 생성
  const handleCreate = async (post: { title: string; content: string }) => {
    try {
      const res = await api.post("/api/posts", post);
      setPosts([res.data, ...posts]);
      setShowForm(false);
    } catch (err) {
      console.error("게시글 생성 실패", err);
    }
  };

  // 게시글 수정
  const handleEdit = async (post: { title: string; content: string }) => {
    if (!editingPost) return;
    try {
      const res = await api.put(`/api/posts/${editingPost.id}`, post);
      setPosts(posts.map((p) => (p.id === editingPost.id ? res.data : p)));
      setEditingPost(null);
      setShowForm(false);
    } catch (err) {
      console.error("게시글 수정 실패", err);
    }
  };

  // 게시글 삭제
  const handleDelete = async (id: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await api.delete(`/api/posts/${id}`);
      setPosts(posts.filter((p) => p.id !== id));
    } catch (err) {
      console.error("게시글 삭제 실패", err);
    }
  };

  return (
    <div>
      <h2>게시글 목록</h2>
      {showForm ? (
        <PostForm
          initialPost={editingPost || {}}
          onSubmit={editingPost ? handleEdit : handleCreate}
          onCancel={() => {
            setShowForm(false);
            setEditingPost(null);
          }}
        />
      ) : (
        <button onClick={() => setShowForm(true)}>게시글 작성</button>
      )}
      <ul>
        {posts.map((post) => (
          <li
            key={post.id}
            style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div>
              작성자: {post.author} | 작성일:{" "}
              {new Date(post.createdAt).toLocaleString()}
            </div>
            {user?.nickname === post.author && (
              <>
                <button
                  onClick={() => {
                    setEditingPost(post);
                    setShowForm(true);
                  }}
                >
                  수정
                </button>
                <button onClick={() => handleDelete(post.id)}>삭제</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
