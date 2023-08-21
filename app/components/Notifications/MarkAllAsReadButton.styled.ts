import { TEXT_PRIMARY } from 'style-constants';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

export const styles = {
  markAllButton: {
    display: 'flex',
    alignItems: 'center',
    color: colors.btnColor || TEXT_PRIMARY,
  },

  markAllIcon: {
    width: '18px',
    height: '18px',
    fill: 'transparent',
    marginRight: '8px',
  },
};
