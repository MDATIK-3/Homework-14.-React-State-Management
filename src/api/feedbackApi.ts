import { seedFeedback } from '../data/seedFeedback';
import type { FeedbackComment, FeedbackItem } from '../types';

const NETWORK_DELAY_MS = 600;
const COMMENT_FAILURE_RATE = 0.15;

function delay<T>(value: T, ms: number): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

export function fetchFeedbackItems(): Promise<FeedbackItem[]> {
  return delay(seedFeedback, NETWORK_DELAY_MS);
}

export interface PostCommentInput {
  feedbackId: string;
  author: string;
  message: string;
}

export function postFeedbackComment(input: PostCommentInput): Promise<FeedbackComment> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < COMMENT_FAILURE_RATE) {
        reject(new Error('The server could not save your comment. Please try again.'));
        return;
      }

      resolve({
        id: `c-${Date.now()}`,
        author: input.author,
        message: input.message,
        createdAt: new Date().toISOString(),
      });
    }, NETWORK_DELAY_MS);
  });
}
