"use client";

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
  const handleCreate = async (post: {
    title: string;
    content: string;
    category: string;
  }) => {
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
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">게시글 목록</h2>

      {showForm ? (
        <div className="mb-6">
          <PostForm
            initialPost={editingPost || {}}
            onSubmit={editingPost ? handleEdit : handleCreate}
            onCancel={() => {
              setShowForm(false);
              setEditingPost(null);
            }}
          />
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          게시글 작성
        </button>
      )}

      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="p-4 bg-gray-900 border border-gray-700 rounded shadow-md"
          >
            <h3 className="text-xl font-semibold text-white">{post.title}</h3>
            <p className="text-gray-300 mt-2">{post.content}</p>
            <div className="text-sm text-gray-500 mt-2">
              작성자: {post.author} | 작성일:{" "}
              {new Date(post.createdAt).toLocaleString()}
            </div>
            {user?.nickname === post.author && (
              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => {
                    setEditingPost(post);
                    setShowForm(true);
                  }}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  삭제
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
