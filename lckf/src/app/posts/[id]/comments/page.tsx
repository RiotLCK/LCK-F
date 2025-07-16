"use client";

import { useParams } from "next/navigation";
import CommentList from "@/features/comments/CommentList";

export default function PostCommentsPage() {
  const params = useParams();
  const postId = Number(params.id);

  if (isNaN(postId)) {
    return <div>잘못된 게시글 ID입니다.</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>게시글 {postId} 댓글</h1>
      <CommentList postId={postId} />
    </div>
  );
}
