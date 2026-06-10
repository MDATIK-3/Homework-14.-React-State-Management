import type { FeedbackStatus } from '../../types';
import styles from './StatusBadge.module.css';

const STATUS_LABELS: Record<FeedbackStatus, string> = {
  new: 'New',
  planned: 'Planned',
  'in-progress': 'In progress',
  done: 'Done',
};

interface StatusBadgeProps {
  status: FeedbackStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
