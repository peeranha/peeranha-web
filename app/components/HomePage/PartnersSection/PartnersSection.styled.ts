export const styles = {
  background: {
    background: 'rgba(255, 255, 255, 1)',
    padding: '40px 0',

    '@media (min-width: 768px)': {
      padding: '64px 0',
    },

    '@media (min-width: 1024px)': {
      padding: '80px 0',
    },

    '@media (min-width: 1366px)': {
      padding: '90px 0',
    },

    '@media (min-width: 1920px)': {
      padding: '120px 0',
    },
  },

  title: {
    lineHeight: '35px',
    color: '#282828',

    '@media (min-width: 1024px)': {
      fontSize: '32px',
      lineHeight: '40px',
      marginBottom: '40px',
    },

    '@media (min-width: 1366px)': {
      fontSize: '40px',
      lineHeight: '50px',
      marginBottom: '64px',
    },

    '@media (min-width: 1920px)': {
      fontSize: '58px',
      lineHeight: '73px',
      marginBottom: '80px',
    },
  },

  slider: {
    height: '32px',

    '@media (min-width: 768px)': {
      height: '71px',
    },

    '@media (min-width: 1366px)': {
      height: '85px',
    },

    '@media (min-width: 1920px)': {
      height: '106px',
    },
  },

  slideTrack: {
    animation: 'scroll 20s linear infinite',

    '@keyframes scroll': {
      '0%': {
        transform: 'translateX(0)',
      },
      '100%': {
        transform: 'translateX(-50%)',
      },
    },
  },

  slide: {
    display: 'inline-block',
    height: '32px',
    padding: '0 18px',

    '> img': {
      height: '100%',
    },

    '@media (min-width: 768px)': {
      height: '71px',
      padding: '0 40px',
    },

    '@media (min-width: 1366px)': {
      height: '85px',
      padding: '0 48px',
    },

    '@media (min-width: 1920px)': {
      height: '106px',
      padding: '0 60px',
    },
  },
};
