import { APP_FONT, TEXT_DARK } from 'style-constants';
import { singleCommunityFonts } from 'utils/communityManagement';
const fonts = singleCommunityFonts();

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
    color: TEXT_DARK,
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
    color: '#7B7B7B',
    whiteSpace: 'nowrap',

    '@media only screen and (max-width: 576px)': {
      fontSize: '28px',
      lineHeight: '35px',
    },
  },
};
