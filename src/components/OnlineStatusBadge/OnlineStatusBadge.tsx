import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import styles from './OnlineStatusBadge.module.css';

export function OnlineStatusBadge() {
  const isOnline = useOnlineStatus();

  return (
    <span className={`${styles.badge} ${isOnline ? styles.online : styles.offline}`}>
      <span className={styles.dot} />
      {isOnline ? 'Online' : 'Offline'}
    </span>
  );
}
