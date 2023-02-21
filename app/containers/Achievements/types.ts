export type CommunityType = {
  id: string;
  name: string;
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
  lowerValue?: number;
  __typename: 'Achievement';
};
