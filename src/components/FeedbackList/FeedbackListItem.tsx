import type { FeedbackItem } from '../../types';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import styles from './FeedbackList.module.css';

interface FeedbackListItemProps {
  item: FeedbackItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function FeedbackListItem({ item, isSelected, onSelect }: FeedbackListItemProps) {
  return (
    <li>
      <button
        type="button"
        className={`${styles.item} ${isSelected ? styles.itemSelected : ''}`}
        onClick={() => onSelect(item.id)}
        aria-current={isSelected}
      >
        <div className={styles.itemHeader}>
          <span className={styles.itemTitle}>{item.title}</span>
          <StatusBadge status={item.status} />
        </div>
        <p className={styles.itemSummary}>{item.summary}</p>
        <div className={styles.itemMeta}>
          <span className={styles.metaTag}>▲ {item.votes} votes</span>
          <span className={styles.metaTag}>{item.comments.length} comments</span>
        </div>
      </button>
    </li>
  );
}
