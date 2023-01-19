import {
  BG_LIGHT,
  BORDER_RADIUS_L,
  BUTTON_COLOR,
  SECONDARY_SPECIAL_2,
  TEXT_LIGHT,
} from '../../../style-constants';
import { singleCommunityColors } from '../../../utils/communityManagement';

const colors = singleCommunityColors();

export const styled = {
  banner: {
    background: BG_LIGHT,
    borderRadius: BORDER_RADIUS_L,
    boxShadow: `0 2px 2px 0 ${SECONDARY_SPECIAL_2}`,
  },

  container: {
    '@media (min-width: 560px)': {
      flexDirection: 'row',
    },

    '@media (min-width: 720px)': {
      padding: '38px 73px',
    },
  },

  image: {
    '@media (min-width: 560px)': {
      marginRight: '67px',
    },
  },

  text: {
    lineHeight: '24px',
    whiteSpace: 'pre-line',

    '@media (min-width: 400px)': {
      whiteSpace: 'normal',
    },

    '@media (min-width: 560px)': {
      fontSize: '20px',
      fontWeight: 600,
      whiteSpace: 'pre-line',
      lineHeight: '30px',
    },
  },

  button: {
    background: colors.btnHeaderColor || BUTTON_COLOR,
    color: colors.newPostButtonText || TEXT_LIGHT,

    ':hover': {
      background: colors.btnHeaderHoverColor,
    },
  },
};
