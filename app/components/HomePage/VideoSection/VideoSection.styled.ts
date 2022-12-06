import videoImage from 'images/Frame172.svg?inline';
import background from 'images/Frame2bg.svg?inline';

export const styles = {
  background: {
    background: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    padding: '40px 0 39px',

    '@media (min-width: 768px)': {
      padding: '72px 0 63px',
    },

    '@media (min-width: 1024px)': {
      padding: '80px 0 74px',
    },

    '@media (min-width: 1366px)': {
      padding: '100px 0 70px',
    },

    '@media (min-width: 1920px)': {
      padding: '120px 0 110px',
    },
  },

  videoImage: {
    background: `url(${videoImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    width: '91vw',
    height: '47vw',

    '@media (min-width: 768px)': {
      width: '72vw',
      height: '37vw',
    },

    '@media (min-width: 1366px)': {
      width: '69vw',
      height: '35vw',
    },

    '@media (min-width: 1920px)': {
      width: '60vw',
      height: '31vw',
    },
  },

  videoIframe: {
    width: '82vw',
    height: '40vw',
    paddingTop: '0vw',
    paddingLeft: '10vw',

    '@media (min-width: 768px)': {
      width: '65vw',
      height: '31.5vw',
      paddingTop: '0vw',
      paddingLeft: '8vw',
    },

    '@media (min-width: 1366px)': {
      width: '62vw',
      height: '29.5vw',
      paddingTop: '0vw',
      paddingLeft: '8vw',
    },

    '@media (min-width: 1920px)': {
      width: '54vw',
      height: '26vw',
      paddingTop: '0vw',
      paddingLeft: '7vw',
    },
  },
};
