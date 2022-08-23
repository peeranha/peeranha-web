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

  videoIframe: {
    width: '100vw',
    height: '400px',
    '@media (min-width: 992px)': {
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
