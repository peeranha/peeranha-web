import { BORDER_RADIUS_L } from 'style-constants';
import { singleCommunityColors } from 'utils/communityManagement';
const colors = singleCommunityColors();

export const styles = {
  container: {
    background: '#fff',
    height: '180px',
    marginTop: '16px',
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
  block: {
    display: 'flex',
    justifyContent: 'center',
    '@media (max-width: 576px)': {
      justifyContent: 'start',
    },
  },
  h3: {
    fontFamily: 'Source Sans Pro',
    maxWidth: '500px',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20px',
    color: '#282828',
    padding: '28px 0 6px 0',
    textAlign: 'center',
    marginBottom: '28px',
    'div:first-child': {
      fontWeight: 600,
      fontSize: '24px',
      lineHeight: '30px',
      '@media (max-width: 991px)': {
        fontSize: '18px',
        lineHeight: '23px',
      },
    },

    '@media (max-width: 576px)': {
      fontSize: '14px',
      lineHeight: '18px',
      textAlign: 'start',
      marginLeft: '30px',
    },
  },
  h3Replied: {
    fontFamily: 'Source Sans Pro',
    maxWidth: '500px',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20px',
    color: '#282828',
    padding: '50px 0 6px 0',
    textAlign: 'center',
    marginBottom: '28px',
    'div:first-child': {
      fontWeight: 600,
      fontSize: '24px',
      lineHeight: '30px',
      '@media (max-width: 991px)': {
        fontSize: '18px',
        lineHeight: '23px',
      },
    },
    '@media (max-width: 1200px)': {
      marginLeft: '60px',
    },
    '@media (max-width: 768px)': {
      width: '300px',
      marginLeft: '30px',
    },
    '@media (max-width: 576px)': {
      fontSize: '14px',
      maxWidth: '200px',
      padding: '28px 0 6px 0',
      lineHeight: '18px',
      textAlign: 'start',
      marginLeft: '30px',
    },
  },
  button: {
    marginTop: '28px',
    width: '92px',
    height: '40px',
    background: colors.btnHeaderColor || '#FFF',
    border: `1px solid ${colors.newPostButtonText || '#F76F60'}`,
    color: colors.newPostButtonText || '#F76F60',
    borderRadius: '3px',
    transition: '0.5s',
    '@media (max-width: 576px)': {
      position: 'absolute',
    },
    ':hover': {
      background: colors.newPostButtonText || '#F76F60',
      border: `1px solid ${colors.btnColor || '#FFF'}`,
      color: colors.btnColor || '#FFF',
    },
  },
  img: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  imgLogin: {
    position: 'absolute',
    top: 0,
    right: '60px',
    '@media (max-width: 1200px)': {
      height: '140px',
      top: '20px',
      right: '30px',
    },
    '@media (max-width: 991px)': {
      height: '130px',
      top: '15px',
      right: '50px',
    },
    '@media (max-width: 576px)': {
      height: '85px',
      top: '60px',
      left: '220px',
    },
  },
  imgReplied: {
    position: 'absolute',
    top: '30px',
    left: '60px',
    transform: 'scale(1, 1)',
    '@media (max-width: 1200px)': {
      height: '91px',
      top: '60px',
      left: '30px',
    },
    '@media (max-width: 991px)': {
      height: '80px',
      top: '60px',
      left: '55px',
    },
    '@media (max-width: 768px)': {
      height: '68px',
      top: '60px',
      left: '30px',
    },
    '@media (max-width: 576px)': {
      top: '60px',
      left: '220px',
      transform: 'scale(1, 1)',
    },
  },
};
