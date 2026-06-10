import type { FeedbackComment } from '../../types';
import { formatDate } from '../../utils/formatDate';
import styles from './CommentList.module.css';

interface CommentItemProps {
  comment: FeedbackComment;
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <li className={`${styles.comment} ${comment.isOptimistic ? styles.commentPending : ''}`}>
      <div className={styles.commentHeader}>
        <span className={styles.author}>{comment.author}</span>
        <span className={styles.date}>{formatDate(comment.createdAt)}</span>
      </div>
      <p className={styles.message}>{comment.message}</p>
      {comment.isOptimistic && <span className={styles.pendingTag}>Sending...</span>}
    </li>
  );
}
