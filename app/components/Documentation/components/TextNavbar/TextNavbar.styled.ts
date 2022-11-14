import { singleCommunityColors } from 'utils/communityManagement';
import { BORDER_RADIUS_L } from 'style-constants';

const communityColors = singleCommunityColors();

export const styles = {
  wrapper: {
    background: 'rgb(250,250,250,1)',
    minWidth: '208px',
    borderTopRightRadius: BORDER_RADIUS_L,
    borderBottomRightRadius: BORDER_RADIUS_L,

    '@media (min-width: 720px)': {
      display: 'block',
    },
  },

  navbarTitle: {
    span: {
      'text-transform': 'uppercase',
    },
    color: 'rgb(123,123,123)',
  },

  navbarItem: {
    fontFamily: 'Source Sans Pro, serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
    color: '#576FED',
  },

  navbarItemHover: {
    ':hover': {
      color: communityColors.linkColor || 'rgb(247,111,96)',
    },
  },
};
