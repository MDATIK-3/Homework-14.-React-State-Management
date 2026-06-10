import type { Theme } from '../../types';
import styles from './ThemeToggle.module.css';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={onToggle}
      aria-pressed={isLight}
      aria-label="Toggle theme"
    >
      <span className={styles.track}>
        <span className={`${styles.thumb} ${isLight ? styles.thumbActive : ''}`} />
      </span>
      {isLight ? 'Light theme' : 'Dark theme'}
    </button>
  );
}
