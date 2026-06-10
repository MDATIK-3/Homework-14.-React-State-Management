export type FeedbackStatus = 'new' | 'planned' | 'in-progress' | 'done';

export type Theme = 'light' | 'dark';

export type StatusFilter = FeedbackStatus | 'all';

export interface FeedbackComment {
  id: string;
  author: string;
  message: string;
  createdAt: string;
  isOptimistic?: boolean;
}

export interface FeedbackItem {
  id: string;
  title: string;
  summary: string;
  status: FeedbackStatus;
  votes: number;
  comments: FeedbackComment[];
  updatedAt: string;
}
