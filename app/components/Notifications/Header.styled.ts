import { APP_FONT, TEXT_DARK } from 'style-constants';
import { singleCommunityFonts, graphCommunityColors } from 'utils/communityManagement';
const fonts = singleCommunityFonts();
const graphCommunity = graphCommunityColors();

export const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',

    padding: '12px 2px 2px',

    '> h3': {
      marginRight: '16px',

      '@media only screen and (max-width: 576px)': {
        marginRight: '8px',
      },
    },

    '> span': {
      flexShrink: 0,
    },
  },

  notificationsTitle: {
    color: graphCommunity ? '#E1E1E4' : TEXT_DARK,
    fontWeight: 600,
    fontSize: '38px',
    lineHeight: '48px',
    fontFamily: fonts.h3 || APP_FONT,

    '@media only screen and (max-width: 576px)': {
      fontSize: '28px',
      lineHeight: '35px',
    },
  },

  notificationsNumber: {
    fontWeight: 600,
    fontSize: '38px',
    lineHeight: '48px',
    color: graphCommunity ? '#A7A7AD' : '#7B7B7B',
    whiteSpace: 'nowrap',

    '@media only screen and (max-width: 576px)': {
      fontSize: '28px',
      lineHeight: '35px',
    },
  },
};
