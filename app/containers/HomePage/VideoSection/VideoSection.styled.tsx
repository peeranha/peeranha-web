import videoBg from 'images/Frame172.svg?inline';
import bg from 'images/Frame2bg.svg?inline';

export const styles = {
  videoSection: {
    '@media (min-width: 992px)': {
      height: '700px',
      background: `url(${videoBg})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  },

  videoBlock: {
    '@media (min-width: 992px)': {
      paddingTop: '76px',
      paddingLeft: '16px',
    },
  },

  videoMobile: {
    '@media (max-width: 992px)': {
      position: 'relative',
      width: '100%',
      height: '0',
      paddingBottom: '56.25%',
    },
  },

  videoIframe: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    '@media (min-width: 992px)': {
      position: 'static',
      width: '818px',
      height: '458px',
    },
  },

  background: {
    '@media (min-width: 992px)': {
      height: '700px',
      background: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  },
};
