import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { fetchFeedbackItems, postFeedbackComment } from '../../api/feedbackApi';
import { FeedbackDetails } from '../../components/FeedbackDetails/FeedbackDetails';
import { FeedbackList } from '../../components/FeedbackList/FeedbackList';
import { FeedbackToolbar } from '../../components/FeedbackToolbar/FeedbackToolbar';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { usePersistentState } from '../../hooks/usePersistentState';
import type { FeedbackItem, StatusFilter, Theme } from '../../types';
import styles from './FeedbackBoardPage.module.css';

export function FeedbackBoardPage() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [theme, setTheme] = usePersistentState<Theme>('feedback-board:theme', 'dark');

  const deferredSearchQuery = useDeferredValue(searchQuery);
  const isFiltering = searchQuery !== deferredSearchQuery;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    let isMounted = true;

    fetchFeedbackItems().then((items) => {
      if (!isMounted) {
        return;
      }

      setFeedbackItems(items);
      setSelectedId(items[0]?.id ?? null);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredItems = useMemo(() => {
    const query = deferredSearchQuery.trim().toLowerCase();

    return feedbackItems.filter((item) => {
      const matchesQuery =
        query.length === 0 ||
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query);
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [feedbackItems, deferredSearchQuery, statusFilter]);

  const selectedItem = useMemo(
    () => feedbackItems.find((item) => item.id === selectedId) ?? null,
    [feedbackItems, selectedId],
  );

  async function handleAddComment(feedbackId: string, message: string): Promise<void> {
    const comment = await postFeedbackComment({ feedbackId, author: 'You', message });

    setFeedbackItems((prevItems) =>
      prevItems.map((item) =>
        item.id === feedbackId
          ? { ...item, comments: [...item.comments, comment], updatedAt: comment.createdAt }
          : item,
      ),
    );
  }

  function handleToggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  return (
    <div className={styles.page}>
      <PageHeader theme={theme} onToggleTheme={handleToggleTheme} />

      <main className={styles.layout}>
        <section className={`${styles.listColumn} glass-panel`}>
          <FeedbackToolbar
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            isFiltering={isFiltering}
          />
          {isLoading ? (
            <p className={styles.loading}>Loading feedback...</p>
          ) : (
            <FeedbackList items={filteredItems} selectedId={selectedId} onSelect={setSelectedId} />
          )}
        </section>

        <section className={`${styles.detailsColumn} glass-panel`}>
          <FeedbackDetails item={selectedItem} onAddComment={handleAddComment} />
        </section>
      </main>
    </div>
  );
}
