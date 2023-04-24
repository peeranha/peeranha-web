import { singleCommunityColors } from 'utils/communityManagement';
import { TEXT_DARK, APP_FONT, BORDER_RADIUS_L } from 'style-constants';

const colors = singleCommunityColors();

export const styles = {
  h3: {
    color: TEXT_DARK,
    fontWeight: 600,
    fontSize: '38px',
    lineHeight: '48px',
    display: 'flex',
    alignItems: 'center',
    fontFamily: APP_FONT,
    letterSpacing: APP_FONT,
    '@media only screen and (max-width: 576px)': {
      fontSize: '28px',
      lineHeight: '28px',
    },
  },
  base: {
    background: '#fff',
    marginTop: '15px',
    marginBottom: '15px',
    padding: '20px 30px',
    flexGrow: 1,
    overflow: 'hidden',
    borderRadius: '5px',
    boxShadow: '0 2px 2px 0 rgba(40,40,40,0.1)',
    borderTopLeftRadius: BORDER_RADIUS_L,
    borderBottomLeftRadius: BORDER_RADIUS_L,
    transition: '0.5s',
    position: 'relative',
    ':hover': {
      boxShadow: '5px 5px 5px rgba(40, 40, 40, 0.1)',
    },
    '@media (max-width: 991px)': {
      height: '150px',
    },
  },
};
