import { isSuiBlockchain } from 'utils/sui/sui';
import {
  BG_LIGHT,
  BORDER_RADIUS_L,
  BUTTON_COLOR,
  SECONDARY_SPECIAL_2,
  TEXT_LIGHT,
} from 'style-constants';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

export const styled = {
  banner: {
    background: BG_LIGHT,
    borderRadius: BORDER_RADIUS_L,
    boxShadow: `0 2px 2px 0 ${SECONDARY_SPECIAL_2}`,
    border: `1px solid ${isSuiBlockchain ? '#D0DAE6' : '#fff'}`,
    color: 'rgba(40, 40, 40, 1)',
  },

  container: {
    padding: '16px',

    '@media (min-width: 992px)': {
      padding: '20px',
    },
  },

  bannerHeader: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '20px',
    marginBottom: '15px',
  },

  text: {
    lineHeight: '24px',
    whiteSpace: 'pre-line',
  },

  button: {
    background: BUTTON_COLOR,
    color: TEXT_LIGHT,

    ':hover': {
      background: colors.btnHeaderHoverColor,
    },
  },
};
