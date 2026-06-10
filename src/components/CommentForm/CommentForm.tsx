import { useActionState, useRef } from 'react';
import styles from './CommentForm.module.css';

interface CommentFormState {
  status: 'idle' | 'success' | 'error';
  error?: string;
}

const initialState: CommentFormState = { status: 'idle' };

interface CommentFormProps {
  onSubmitComment: (message: string) => Promise<void>;
}

export function CommentForm({ onSubmitComment }: CommentFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState<CommentFormState, FormData>(
    async (_previousState, formData) => {
      const message = String(formData.get('message') ?? '').trim();

      if (!message) {
        return { status: 'error', error: 'Comment cannot be empty.' };
      }

      try {
        await onSubmitComment(message);
        formRef.current?.reset();
        return { status: 'success' };
      } catch (error) {
        return {
          status: 'error',
          error: error instanceof Error ? error.message : 'Something went wrong.',
        };
      }
    },
    initialState,
  );

  return (
    <form ref={formRef} action={formAction} className={styles.form}>
      <textarea
        name="message"
        placeholder="Add a comment..."
        className={styles.textarea}
        rows={3}
        disabled={isPending}
      />
      <div className={styles.footer}>
        <span className={styles.statusMessage} data-variant={state.status}>
          {state.status === 'error' && state.error}
          {state.status === 'success' && 'Comment posted!'}
        </span>
        <button type="submit" className={styles.submit} disabled={isPending}>
          {isPending ? 'Posting...' : 'Post comment'}
        </button>
      </div>
    </form>
  );
}
