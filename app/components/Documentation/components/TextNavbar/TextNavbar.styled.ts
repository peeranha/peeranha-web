import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';
import { BORDER_RADIUS_L, APP_FONT } from 'style-constants';

const communityColors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

export const styles = {
  wrapper: {
    background: graphCommunity
      ? '#161425'
      : communityColors.backgroundSpecial || 'rgb(250,250,250,1)',
    minWidth: '208px',
    border: graphCommunity ? '1px solid #3D3D54' : 'none',
    borderLeft: 'none',
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
    fontFamily: APP_FONT || 'Source Sans Pro, serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
    color: graphCommunity ? '#6f4cff' : '#576FED',
  },

  navbarItemHover: {
    ':hover': {
      color: communityColors.linkColor || 'rgb(247,111,96)',
    },
  },
};
