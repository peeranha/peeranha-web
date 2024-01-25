import {
  BG_PRIMARY,
  BORDER_RADIUS_M,
  BUTTON_COLOR,
  TEXT_LIGHT,
  TEXT_PRIMARY,
} from 'style-constants';
import { singleCommunityColors, singleCommunityStyles } from 'utils/communityManagement';

const communityColors = singleCommunityColors();
const communityStyles = singleCommunityStyles();

const styles = {
  tabsBlock: {
    borderBottom: `1px solid ${communityColors.dividerColor || 'rgba(216, 216, 216, 1)'}`,
    paddingBottom: '11px',
    whiteSpace: 'nowrap',
  },

  mainBlock: {
    margin: '32px',
    padding: '0 0 18px 0',

    '@media (min-width: 577px)': {
      borderBottom: `1px solid ${communityColors.dividerColor || 'rgba(216, 216, 216, 1)'}`,
    },
  },

  translationsTitle: {
    lineHeight: '23px',
    color: 'rgba(40, 40, 40, 1)',
  },

  translationsText: {
    color: communityColors.secondaryTextColor || 'rgba(123, 123, 123, 1)',
    lineHeight: '20px',
  },

  button: {
    padding: '3px 16px 4px',
    margin: '0 4px',
    lineHeight: '25px',
    color: `${communityColors.linkColor || TEXT_PRIMARY}`,
    transition: '0.5s',
  },

  activeTab: {
    color: 'rgb(255,255,255)',
    borderRadius: `${communityStyles.buttonBorderRadius || BORDER_RADIUS_M}`,
    background: `${communityColors.linkColor || BG_PRIMARY}`,
  },

  saveButton: {
    display: 'none !important',

    '@media (min-width: 577px)': {
      display: 'block !important',
      margin: '0 0 32px 181px !important',
    },
  },

  popupMenu: {
    background: '#FFFFFF',
    boxShadow: '0px -2px 4px rgba(7, 16, 64, 0.1)',
    zIndex: 10,

    '@media (min-width: 577px)': {
      display: 'none',
    },
  },

  popupMenuCloseButton: {
    width: '43vw',
    height: '40px',
    border: `1px solid ${communityColors.btnHeaderColor || BUTTON_COLOR}`,
    borderRadius: BORDER_RADIUS_M,
    fontSize: '16px',
    lineHeight: '20px',
    color: communityColors.newPostButtonText || BUTTON_COLOR,
    padding: '9px 16px 11px',
    transition: '0.5s',

    ':hover': {
      background: communityColors.btnHeaderColor || BUTTON_COLOR,
      color: communityColors.newPostButtonText || TEXT_LIGHT,
      border: `1px solid ${communityColors.btnHeaderColor || BUTTON_COLOR}`,
    },
  },

  popupMenuSaveButton: {
    width: '43vw',
    height: '40px',
    transition: '0.2s',
    background: communityColors.btnHeaderColor || BUTTON_COLOR,
    color: communityColors.newPostButtonText || TEXT_LIGHT,

    ':hover': {
      opacity: 0.8,
    },
    borderRadius: BORDER_RADIUS_M,
    padding: '9px 16px 11px',
  },
};

export default styles;
