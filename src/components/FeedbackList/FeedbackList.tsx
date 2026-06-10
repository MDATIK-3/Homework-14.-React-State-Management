import type { FeedbackItem } from '../../types';
import { EmptyState } from '../EmptyState/EmptyState';
import { FeedbackListItem } from './FeedbackListItem';
import styles from './FeedbackList.module.css';

interface FeedbackListProps {
  items: FeedbackItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function FeedbackList({ items, selectedId, onSelect }: FeedbackListProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="No feedback found"
        description="Try adjusting your search or status filter."
      />
    );
  }

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <FeedbackListItem
          key={item.id}
          item={item}
          isSelected={item.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}
