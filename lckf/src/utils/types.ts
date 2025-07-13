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
  id: string;
  title: string;
  content: string;
  author: User;
  likes: number;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

// 댓글 타입
export interface Comment {
  id: string;
  content: string;
  author: User;
  postId: string;
  createdAt: string;
  updatedAt: string;
}
