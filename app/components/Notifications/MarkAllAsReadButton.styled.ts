import { TEXT_PRIMARY } from 'style-constants';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

export const styles = {
  markAllButton: {
    display: 'flex',
    alignItems: 'center',
    color: graphCommunity ? '#E1E1E4' : colors.btnColor || TEXT_PRIMARY,
  },

  markAllIcon: {
    width: '18px',
    height: '18px',
    fill: 'transparent',
    marginRight: '8px',
  },
};
