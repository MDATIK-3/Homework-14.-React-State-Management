import type { FeedbackItem } from '../types';

export const seedFeedback: FeedbackItem[] = [
  {
    id: 'fb-1',
    title: 'Add multi-language support',
    summary:
      'Users from different regions want the platform interface available in their preferred language.',
    status: 'planned',
    votes: 54,
    updatedAt: '2025-12-10T09:30:00.000Z',
    comments: [
      {
        id: 'c-1',
        author: 'Sarah',
        message: 'Arabic and Spanish would be great starting options.',
        createdAt: '2025-12-10T10:15:00.000Z',
      },
      {
        id: 'c-2',
        author: 'David',
        message: 'Please make translations community-driven.',
        createdAt: '2025-12-10T13:45:00.000Z',
      },
    ],
  },
  {
    id: 'fb-2',
    title: 'Integrate Google Calendar',
    summary:
      'Allow users to sync events directly with their Google Calendar accounts.',
    status: 'new',
    votes: 24,
    updatedAt: '2025-12-09T08:20:00.000Z',
    comments: [
      {
        id: 'c-3',
        author: 'Emily',
        message: 'This would simplify meeting management a lot.',
        createdAt: '2025-12-09T09:00:00.000Z',
      },
    ],
  },
  {
    id: 'fb-3',
    title: 'Add drag-and-drop task organization',
    summary:
      'Users want to rearrange tasks quickly by dragging them between categories.',
    status: 'in-progress',
    votes: 37,
    updatedAt: '2025-12-08T15:10:00.000Z',
    comments: [],
  },
  {
    id: 'fb-4',
    title: 'Improve search performance',
    summary:
      'Search results become noticeably slower when large datasets are loaded.',
    status: 'new',
    votes: 19,
    updatedAt: '2025-12-07T12:40:00.000Z',
    comments: [
      {
        id: 'c-4',
        author: 'James',
        message: 'Search takes 4-5 seconds on our production data.',
        createdAt: '2025-12-07T13:05:00.000Z',
      },
    ],
  },
  {
    id: 'fb-5',
    title: 'Archive completed projects',
    summary:
      'Allow administrators to archive old projects without deleting their data.',
    status: 'done',
    votes: 15,
    updatedAt: '2025-11-25T11:30:00.000Z',
    comments: [
      {
        id: 'c-5',
        author: 'Lucas',
        message: 'We started using this feature immediately.',
        createdAt: '2025-11-26T08:20:00.000Z',
      },
    ],
  },
  {
    id: 'fb-6',
    title: 'Real-time team activity feed',
    summary:
      'Provide a live feed showing project updates, comments, and task changes.',
    status: 'planned',
    votes: 41,
    updatedAt: '2025-12-06T18:00:00.000Z',
    comments: [],
  },
  {
    id: 'fb-7',
    title: 'Advanced filtering options',
    summary:
      'Users need filters based on tags, dates, assignees, and project categories.',
    status: 'new',
    votes: 11,
    updatedAt: '2025-12-04T07:50:00.000Z',
    comments: [],
  },
  {
    id: 'fb-8',
    title: 'Custom notification preferences',
    summary:
      'Allow users to control exactly which events trigger notifications.',
    status: 'in-progress',
    votes: 28,
    updatedAt: '2025-12-11T06:45:00.000Z',
    comments: [
      {
        id: 'c-6',
        author: 'Nadia',
        message: 'Email and push notifications should be configurable separately.',
        createdAt: '2025-12-11T07:30:00.000Z',
      },
    ],
  },
];