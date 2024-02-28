import { CSSObject } from '@emotion/react';
import { BORDER_RADIUS_L, APP_FONT } from 'style-constants';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

export const styles: Record<string, CSSObject> = {
  container: {
    background: graphCommunity ? '#161425' : '#fff',
    height: '180px',
    marginTop: '16px',
    overflow: 'hidden',
    borderRadius: '5px',
    borderTopLeftRadius: BORDER_RADIUS_L,
    borderBottomLeftRadius: BORDER_RADIUS_L,
    border: '1px solid #3D3D54',
    transition: '0.5s',
    position: 'relative',
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
    fontFamily: APP_FONT || 'Source Sans Pro',
    maxWidth: '500px',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20px',
    color: graphCommunity ? '#E1E1E4' : '#282828',
    padding: '28px 0 6px 0',
    textAlign: 'center',
    marginBottom: '28px',
    'div:first-child': {
      fontWeight: 600,
      fontSize: '24px',
      lineHeight: '30px',
      marginBottom: '6px',
      '@media (max-width: 991px)': {
        fontSize: '18px',
        lineHeight: '23px',
      },
    },
    '@media (max-width: 576px)': {
      fontSize: '16px',
      lineHeight: '18px',
      textAlign: 'start',
      marginLeft: '30px',
    },
    'div:nth-child(2)': {
      '@media (max-width: 991px)': {
        fontSize: '16px',
      },
    },
  },
  h3Replied: {
    fontFamily: APP_FONT || 'Source Sans Pro',
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
      marginBottom: '6px',
      '@media (max-width: 991px)': {
        fontSize: '18px',
        lineHeight: '23px',
      },
    },
    'div:nth-child(2)': {
      '@media (max-width: 576px)': {
        width: '175px',
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
      fontSize: '16px',
      maxWidth: '200px',
      padding: '28px 0 6px 0',
      lineHeight: '18px',
      textAlign: 'start',
      marginLeft: '30px',
    },
  },
  h3Reputation: {
    fontFamily: APP_FONT || 'Source Sans Pro',
    maxWidth: '510px',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20px',
    color: '#282828',
    padding: '50px 0 6px 0',
    textAlign: 'start',
    marginBottom: '28px',
    'div:first-child': {
      fontWeight: 600,
      fontSize: '24px',
      lineHeight: '30px',
      marginBottom: '6px',
      '@media (max-width: 1200px)': {
        width: '320px',
      },
      '@media (max-width: 768px)': {
        fontSize: '18px',
        lineHeight: '23px',
        width: '250px',
      },
    },
    'div:nth-child(2)': {
      '@media (max-width: 768px)': {
        fontSize: '16px',
        width: '170px',
      },
      '@media (max-width: 576px)': {
        width: '175px',
      },
    },
    '@media (max-width: 1200px)': {
      marginLeft: '60px',
    },
    '@media (max-width: 991px)': {
      padding: '29px 0 6px 0',
    },
    '@media (max-width: 768px)': {
      width: '300px',
      marginLeft: '30px',
    },
    '@media (max-width: 576px)': {
      fontSize: '16px',
      maxWidth: '240px',
      padding: '16px 0 6px 0',
      lineHeight: '18px',
      marginLeft: '30px',
    },
  },
  button: {
    marginTop: '28px',
    width: '92px',
    height: '40px',
    background: graphCommunity ? '#6F4CFF' : '#FFF',
    border: `1px solid ${colors.btnColor || '#F76F60'}`,
    color: `${graphCommunity ? '#E1E1E4' : colors.btnColor || '#F76F60'}`,
    borderRadius: '3px',
    fontSize: '14px',
    fontWeight: 600,
    transition: '0.5s',
    '@media (max-width: 576px)': {
      position: 'absolute',
    },
    '@media (max-width: 991px)': {
      marginTop: '21px',
    },
    ':hover': {
      background: graphCommunity ? 'rgba(111,76,255,0.8)' : `${colors.btnHoverColor || '#F76F60'}`,
      border: `1px solid ${
        graphCommunity ? 'rgba(111,76,255,0.8)' : colors.btnHoverColor || '#FFF'
      }`,
      color: '#FFF',
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
      height: '162px',
      top: '10px',
      right: '30px',
    },
    '@media (max-width: 991px)': {
      height: '131px',
      top: '15px',
      right: '50px',
    },
    '@media (max-width: 864px)': {
      height: '131px',
      top: '15px',
      right: '50px',
    },
    '@media (max-width: 768px)': {
      height: '113px',
      top: '30px',
      right: '20px',
    },
    '@media (max-width: 576px)': {
      height: '85px',
      top: '60px',
      left: '190px',
    },
  },
  imgReplied: {
    position: 'absolute',
    top: '30px',
    left: '60px',
    transform: 'scale(1, 1)',
    '@media (max-width: 1200px)': {
      height: '125px',
      top: '45px',
      left: '25px',
    },
    '@media (max-width: 991px)': {
      height: '80px',
      top: '63px',
      left: '55px',
    },
    '@media (max-width: 768px)': {
      height: '80px',
      top: '65px',
      left: '30px',
    },
    '@media (max-width: 576px)': {
      height: '68px',
      top: '73px',
      left: '210px',
      transform: 'scale(-1, 1)',
    },
  },
  imgReputation: {
    position: 'absolute',
    top: '30px',
    left: '44px',

    '@media (max-width: 1200px)': {
      height: '119px',
      top: '55px',
      left: '60px',
    },
    '@media (max-width: 991px)': {
      height: '94px',
      top: '45px',
      left: '95px',
    },
    '@media (max-width: 768px)': {
      height: '94px',
      top: '40px',
      left: '30px',
    },
    '@media (max-width: 576px)': {
      height: '65px',
      top: '73px',
      left: '230px',
    },
  },
};
