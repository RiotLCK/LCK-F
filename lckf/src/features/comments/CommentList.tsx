"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/api";
import { Comment } from "@/utils/types";
import CommentForm from "./CommentForm";

interface CommentListProps {
  postId: number;
}

export default function CommentList({ postId }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const fetchComments = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get(`/api/comments/post/${postId}`);
      setComments(res.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "댓글 불러오기 오류");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div className="space-y-4">
      <h4 className="font-bold mb-2">댓글</h4>

      {/* 댓글 작성 폼 */}
      <CommentForm postId={postId} onSuccess={fetchComments} />

      {/* 상태 메시지 */}
      {loading && <div>불러오는 중...</div>}
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {comments.length === 0 && !loading && <div>아직 댓글이 없습니다.</div>}

      {/* 댓글 목록 */}
      {comments.map((comment) => (
        <div key={comment.id} className="border p-2 rounded bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="font-semibold">{comment.author}</span>
            <span className="text-xs text-gray-400">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>

          {editId === comment.id ? (
            <CommentForm
              postId={postId}
              comment={comment}
              onSuccess={() => {
                setEditId(null);
                fetchComments();
              }}
            />
          ) : (
            <div className="mt-1">
              <p>{comment.content}</p>
              <div className="flex gap-2 mt-1 text-xs text-gray-600">
                <span>❤️ {comment.likeCount}</span>
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setEditId(comment.id)}
                >
                  수정
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={async () => {
                    if (!confirm("정말 삭제하시겠습니까?")) return;
                    try {
                      await axiosInstance.delete(`/api/comments/${comment.id}`);
                      fetchComments();
                    } catch (err: any) {
                      alert(err.response?.data?.message || "삭제 오류");
                    }
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
