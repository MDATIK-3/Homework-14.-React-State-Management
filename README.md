# Feedback Board

A small Feedback Board built with React, TypeScript and Vite. It demonstrates
modern React state management patterns using only built-in React APIs — no
Redux, Zustand, MobX, or any other state management library.

## Setup

```bash
npm install
npm run dev
```

Open the printed local URL in your browser. Build for production with:

```bash
npm run build
```

## Project structure

```
src/
├── api/feedbackApi.ts          mock async API (fetch + post comment)
├── data/seedFeedback.ts        seed feedback data
├── hooks/
│   ├── usePersistentState.ts   generic localStorage-backed state hook
│   └── useOnlineStatus.ts      external online/offline subscription
├── utils/formatDate.ts         date formatting helper
├── types.ts                    shared domain types
├── components/
│   ├── PageHeader/              app header, online status, theme toggle
│   ├── OnlineStatusBadge/        external state indicator
│   ├── ThemeToggle/               persistent preference control
│   ├── FeedbackToolbar/          search input + status filter
│   ├── FeedbackList/             feedback list + list item
│   ├── FeedbackDetails/          details panel, optimistic comments
│   ├── CommentList/               comment list + comment item
│   ├── CommentForm/               comment submission form
│   ├── StatusBadge/               status pill
│   └── EmptyState/                reusable empty state
└── pages/FeedbackBoardPage/      page composition and top-level state
```

## Features

- Searchable, filterable feedback list with item selection and a details panel.
- Light/dark theme preference persisted to `localStorage` via a reusable hook.
- Comment form with pending, success and error states, plus empty-input validation.
- Optimistic comment rendering, visually marked as "Sending..." until confirmed.
- Online/offline indicator subscribed to the browser's network status.
- Deferred search filtering so typing stays responsive even with a larger list.

## State Design

### Source of truth state

- `feedbackItems` (`FeedbackBoardPage`) — the list of feedback items and their
  comments, loaded once from the mock API. This is the only place the list
  and its comments are stored.
- `selectedId` — the id of the currently selected feedback item.
- `searchQuery` and `statusFilter` — the current search text and status filter.
- `theme` — the persisted UI preference (`'light' | 'dark'`).

### Derived state

- `selectedItem` is computed with `useMemo` by looking up `selectedId` inside
  `feedbackItems`. It is **not** stored as a separate object, so it can never
  drift out of sync with the source list — updating a comment on the selected
  item automatically updates the details panel.
- `filteredItems` is computed with `useMemo` from `feedbackItems`,
  `deferredSearchQuery` and `statusFilter`. There is no second "visible list"
  state — the visible list is always a pure function of the source data and
  the current filters.
- Disabled/pending button states in `CommentForm` are derived from
  `useActionState`'s `isPending` flag rather than tracked separately.

### Why filtered data is not its own state

Storing a filtered copy of `feedbackItems` would create a second source of
truth that has to be kept in sync every time the source data, search query or
status filter changes — a classic source of redundant-state bugs. Deriving it
with `useMemo` guarantees it is always consistent and only recomputed when one
of its real inputs changes.

### Mutation state

`CommentForm` uses `useActionState` to manage the comment submission flow:

- `isPending` drives the "Posting..." button state and disables the textarea.
- The action validates that the message is non-empty before doing anything
  else, returning an `error` state for empty input.
- On success, the form is reset via a ref; on failure (the mock API randomly
  rejects ~15% of the time), an error message is shown and the form keeps the
  user's text so they can retry.

### Optimistic state

`FeedbackDetails` uses `useOptimistic` over `item.comments` (the confirmed
source of truth). When a comment is submitted, a temporary comment with
`isOptimistic: true` is added immediately so it appears in the list before the
network request resolves. It is rendered with a dashed border and a
"Sending..." tag so it is visually distinct from confirmed comments. Once the
mock API resolves, the confirmed comment is appended to `feedbackItems` in
`FeedbackBoardPage`, which becomes the new base state for `useOptimistic` and
the optimistic entry is replaced by the real one — the optimistic state never
becomes the source of truth itself.

### External state

`useOnlineStatus` subscribes to the browser's `online`/`offline` events using
`useSyncExternalStore`, the React API designed for reading state that lives
outside React. The current value is shown as a badge in the page header.

### Persistent preference state

The theme is stored with `usePersistentState`, a small generic hook that
wraps `useState` and synchronizes the value to `localStorage` in a `useEffect`.
`FeedbackBoardPage` mirrors the value onto `document.documentElement.dataset.theme`
in a separate effect so the CSS variable overrides in `index.css` apply
globally. A custom hook was enough here because the requirement is simple
key/value persistence for a single string preference — a full store would be
unnecessary ceremony for one preference, and the hook can be reused for any
future preference that needs the same behavior.

### Deferred update

The search input (`FeedbackToolbar`) updates `searchQuery` immediately so
typing always feels instant. The actual list filtering uses
`deferredSearchQuery = useDeferredValue(searchQuery)`. Filtering and
re-rendering the list is lower priority than keeping the input itself
responsive — React can finish the urgent input update first and let the
(potentially larger) list re-render catch up shortly after. While the deferred
value lags behind the input, a small spinner is shown next to the search box.
