export type DocumentationSection = {
  id: string;
  title: string;
  children: Array<DocumentationSection>;

  isDeleted?: boolean;
  content?: string;
};

export type OutputSelector = {
  locale: string;
  profileInfo: User;
  documentation: Array<DocumentationSection>;
};

type User = {
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
