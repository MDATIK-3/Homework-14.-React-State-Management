import type { FeedbackComment } from '../../types';
import { CommentItem } from './CommentItem';
import styles from './CommentList.module.css';

interface CommentListProps {
  comments: FeedbackComment[];
}

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return <p className={styles.empty}>No comments yet. Be the first to share your thoughts.</p>;
  }

  return (
    <ul className={styles.list}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}
