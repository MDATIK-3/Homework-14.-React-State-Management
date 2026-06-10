import type { Theme } from '../../types';
import { OnlineStatusBadge } from '../OnlineStatusBadge/OnlineStatusBadge';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function PageHeader({ theme, onToggleTheme }: PageHeaderProps) {
  return (
    <header className={`${styles.header} glass-panel`}>
      <div className={styles.titleGroup}>
        <h1 className={styles.title}>Feedback Board</h1>
        <p className={styles.subtitle}>Collect, discuss and prioritize product feedback</p>
      </div>
      <div className={styles.actions}>
        <OnlineStatusBadge />
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}
