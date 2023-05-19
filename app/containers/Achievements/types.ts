type CommunityType = {
  id: string | null;
  name: string;
  avatar: string | null;
};

type NFTType = {
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

export type ProgressBarType = {
  achievementId: number;
  progress: number;
  pointsToNext: number;
  groupType: string;
  messageSingle: string;
  messageMultiple: string;
};

export type CommunityLabelType = {
  communityId: string;
  communities: CommunityType[];
  isHover: boolean;
};

export type NFTCardType = {
  item: NFTType;
  hasNFT: boolean;
  isCurrentUser: boolean;
  currentValue: number;
  communities: CommunityType[];
};
