export type OutputSelector = {
  locale: string;
  profileInfo: User;
  moderators: Array<Moderator>;
  moderatorsLoading: boolean;
  addRoleLoading: boolean;
  revokeRoleLoading: boolean;
};

export type User = {
  id: string;
  avatar: string;
  displayName: string;
  ratings: Array<{ communityId: number; rating: number }>;
  company: string;
  position: string;
  location: string;
  about: string;
  creationTime: number;
  achievements: Array<{ id: number }>;
};

export type Moderator = {
  id: string;
  user: User;
  permission: string;
};
