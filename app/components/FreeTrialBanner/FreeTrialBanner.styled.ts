import { BORDER_RADIUS_L, BG_LIGHT, BORDER_SECONDARY } from 'style-constants';
import { isSingleCommunityWebsite, singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

export const styles = {
  container: {
    maxWidth: '260px',
    background: 'rgba(255, 255, 255, 1)',
    margin: '16px 0px 0px 0px',
    padding: '20px',
    overflow: 'hidden',
    borderRadius: BORDER_RADIUS_L,
    textAlign: 'center',
  },
  visibleMenu: {
    margin: '0px 0px 0px 16px',
  },
  h3: {
    maxWidth: '160px',
    textAlign: 'left',
    fontFamily: 'Source Sans Pro',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '24px',
    color: 'rgba(40, 40, 40, 1)',
  },
  button: {
    width: '100%',
    height: '40px',
    fontFamily: 'Source Sans Pro',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '18px',
    backgroundColor: isSingleCommunityWebsite()
      ? colors.btnHeaderColor
      : 'var(--color-button-secondary)',
    borderRadius: '2px',
    color: colors.newPostButtonText || BG_LIGHT,
    transition: '0.4s',
    zIndex: 10,

    ':hover': {
      backgroundColor: isSingleCommunityWebsite()
        ? colors.btnHeaderHoverColor
        : 'var(--color-button-secondary)',
      color: colors.newPostButtonText || BG_LIGHT,
      opacity: colors.btnHeaderHoverOpacity || 0.8,
    },
  },
  img: {
    width: '108px',
    height: '118px',
    margin: '10px 0px',
  },
};
