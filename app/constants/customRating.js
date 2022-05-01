import { singleCommunityColors } from 'utils/communityManagement';
import { PEER_PRIMARY_COLOR } from 'style-constants';

const colors = singleCommunityColors();

export const customRatingIconColors = {
  strokeColor: colors.linkColor || PEER_PRIMARY_COLOR,
};
