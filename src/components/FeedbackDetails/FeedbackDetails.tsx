import { useOptimistic } from 'react';
import type { FeedbackComment, FeedbackItem } from '../../types';
import { CommentForm } from '../CommentForm/CommentForm';
import { CommentList } from '../CommentList/CommentList';
import { EmptyState } from '../EmptyState/EmptyState';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import { formatDate } from '../../utils/formatDate';
import styles from './FeedbackDetails.module.css';

interface FeedbackDetailsProps {
  item: FeedbackItem | null;
  onAddComment: (feedbackId: string, message: string) => Promise<void>;
}

export function FeedbackDetails({ item, onAddComment }: FeedbackDetailsProps) {
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    item?.comments ?? [],
    (comments, newComment: FeedbackComment) => [...comments, newComment],
  );

  if (!item) {
    return (
      <EmptyState
        icon="🗂️"
        title="No feedback selected"
        description="Choose an item from the list to see its details and comments."
      />
    );
  }

  const feedbackId = item.id;

  async function handleSubmitComment(message: string) {
    addOptimisticComment({
      id: `optimistic-${Date.now()}`,
      author: 'You',
      message,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    });

    await onAddComment(feedbackId, message);
  }

  return (
    <div className={styles.details}>
      <div className={styles.header}>
        <StatusBadge status={item.status} />
        <h2 className={styles.title}>{item.title}</h2>
        <p className={styles.summary}>{item.summary}</p>
        <div className={styles.meta}>
          <span>▲ {item.votes} votes</span>
          <span>Updated {formatDate(item.updatedAt)}</span>
        </div>
      </div>

      <div className={styles.commentsSection}>
        <h3 className={styles.commentsTitle}>Comments ({optimisticComments.length})</h3>
        <CommentList comments={optimisticComments} />
      </div>

      <CommentForm onSubmitComment={handleSubmitComment} />
    </div>
  );
}
