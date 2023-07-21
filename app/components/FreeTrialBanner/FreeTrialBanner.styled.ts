import { BORDER_RADIUS_L } from 'style-constants';

export const styles = {
  container: {
    width: '260px',
    height: '272px',
    background: 'rgba(255, 255, 255, 1)',
    margin: '0px 0px 0px 16px',
    padding: '20px',
    overflow: 'hidden',
    borderRadius: BORDER_RADIUS_L,
    textAlign: 'center',
    '@media (min-width: 992px)': {
      margin: '16px 0px 0px 0px',
    },
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
    background: 'rgba(252, 102, 85, 1)',
    borderRadius: '2px',
    color: 'rgb(255, 255, 255)',
    transition: '0.4s',
    zIndex: 10,

    ':hover': {
      background: 'rgba(247, 111, 96, 0.8)',
      color: 'rgb(255, 255, 255)',
    },
  },
  img: {
    width: '108px',
    height: '118px',
    margin: '10px 0px',
  },
};
