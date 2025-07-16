// 공통 API 응답 타입
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// 사용자 정보 타입
export interface User {
  id: string;
  nickname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// 에러 타입
export interface ApiError {
  status: number;
  message: string;
  code?: string;
}

// 페이지네이션 타입
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// LCK 선수 정보 타입
export interface LCKPlayer {
  id: string;
  name: string;
  team: string;
  position: string;
  stats: {
    kda: number;
    csPerMin: number;
    visionScore: number;
    damageShare: number;
  };
  playStyle: {
    aggressive: number;
    defensive: number;
    teamFight: number;
    splitPush: number;
  };
}

// 플레이스타일 분석 결과 타입
export interface PlayStyleAnalysis {
  userId: string;
  analysis: {
    position: string;
    playStyle: {
      aggressive: number;
      defensive: number;
      teamFight: number;
      splitPush: number;
    };
    strengths: string[];
    weaknesses: string[];
  };
  recommendedPlayers: LCKPlayer[];
  createdAt: string;
}

// 커뮤니티 게시글 타입
export interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  createdAt: string;
  updatedAt: string | null;
}

// 게시글 생성/수정 요청용 타입
export interface PostRequest {
  title: string;
  content: string;
}

// 댓글 타입
export interface Comment {
  id: number;
  content: string;
  author: string;
  createdAt: string;
  likeCount: number;
  likedByCurrentUser: boolean;
}
