import type { ChangeEvent } from 'react';
import type { StatusFilter } from '../../types';
import styles from './FeedbackToolbar.module.css';

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All statuses' },
  { value: 'new', label: 'New' },
  { value: 'planned', label: 'Planned' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
];

interface FeedbackToolbarProps {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (value: StatusFilter) => void;
  isFiltering: boolean;
}

export function FeedbackToolbar({
  searchQuery,
  onSearchQueryChange,
  statusFilter,
  onStatusFilterChange,
  isFiltering,
}: FeedbackToolbarProps) {
  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    onSearchQueryChange(event.target.value);
  }

  function handleStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    onStatusFilterChange(event.target.value as StatusFilter);
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.searchField}>
        <input
          type="search"
          placeholder="Search feedback..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.searchInput}
          aria-label="Search feedback"
        />
        <span className={`${styles.spinner} ${isFiltering ? styles.spinnerVisible : ''}`} />
      </div>
      <select
        value={statusFilter}
        onChange={handleStatusChange}
        className={styles.statusSelect}
        aria-label="Filter by status"
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
