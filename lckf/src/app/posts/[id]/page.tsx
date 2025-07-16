"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/utils/api";
import { Post } from "@/utils/types";
import CommentList from "@/features/comments/CommentList";

const PostDetail: React.FC = () => {
  const params = useParams();
  const postId = Number(params.id);

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!postId) return;

    api
      .get(`/api/posts/${postId}`)
      .then((res) => setPost(res.data))
      .catch(() => setError("게시글을 불러오는 데 실패했습니다."))
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>
        작성자: {post.author} | 작성일:{" "}
        {new Date(post.createdAt).toLocaleString()}
      </p>

      <hr style={{ margin: "20px 0" }} />

      {/* 댓글 리스트 및 작성 폼 */}
      <CommentList postId={postId} />
    </div>
  );
};

export default PostDetail;
