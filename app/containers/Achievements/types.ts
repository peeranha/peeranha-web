export type CommunityType = {
  id: string | null;
  name: string;
  avatar: string | null;
};

export type NFTType = {
  achievementURI: string;
  achievementsType: number;
  communityId: string;
  description: string;
  factCount: string;
  id: number;
  image: string;
  maxCount: string;
  name: string;
  lowerValue: string;
  __typename: 'Achievement';
};
