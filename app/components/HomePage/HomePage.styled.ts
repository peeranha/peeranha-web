export const pageStyles = {
  homePage: {
    scrollBehavior: 'smooth',
    background: 'rgb(250, 250, 250)',
  },

  sticky: {
    height: '56px',

    '@media (min-width: 1366px)': {
      height: '95px',
    },
  },

  container: {
    margin: '0 16px',

    '@media (min-width: 768px)': {
      margin: '0 48px',
    },

    '@media (min-width: 1024px)': {
      margin: '0 64px',
    },

    '@media (min-width: 1920px)': {
      margin: '0 120px',
    },
  },
};
