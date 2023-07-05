import { ReactNode } from 'react';

export type AllNotifications = {
  all: AllNotificationsInfo;
  unread: UnreadNotificationsInfo;
  isInfoLoaded: boolean;
  lastUser: string | null;
  loadMoreNotificationsError: null | unknown;
  loadMoreUnreadNotificationsErr: null | unknown;
  notifications: { [notification: string]: Notification };
  readTimestamps: number[];
};

export type AllNotificationsInfo = {
  count: number;
  lastTimestamp: number;
  loading: boolean;
  readNotifications: number[];
  toJS: any;
};

export type UnreadNotificationsInfo = AllNotificationsInfo & { timestamps: number[] };

export type Notification = {
  data: {
    answer_id: number;
    community_id: number;
    old_community_id: number;
    post_type: number;
    question_id: number;
    title: string;
  };
  createdBy: string;
  read: boolean;
  timestamp: number;
  type: number;
  user: string;
  time?: {
    hours: number;
  };
};

export type NotificationsProps = {
  loading: boolean;
  unreadCount: number;
  allCount: number;
  className: string;
  isAvailable: boolean;
  notifications: Notification[];
  communities: any;
  readNotifications: number[];
  loadMoreNotificationsDispatch: () => void;
  markAsReadNotificationsAllDispatch: (notifications: number[]) => void;
  filterReadNotificationsDispatch: () => void;
};

export type NotificationProps = {
  read: boolean;
  top: number;
  data: any;
  time: any;
  type: number;
  index: number;
  height: number;
  communities: any;
  notificationsNumber: number;
};
export type NotificationTimeProps = {
  time: any;
};
export type NotificationLinkProps = {
  children: ReactNode;
  isAnotherCommItem: boolean;
  href: string;
};
