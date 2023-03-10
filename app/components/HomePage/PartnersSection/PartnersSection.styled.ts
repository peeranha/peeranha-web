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
      fontSize: '40px',
      lineHeight: '40px',
      marginBottom: '40px',
    },

    '@media (min-width: 1366px)': {
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
      height: '45px',
    },

    '@media (min-width: 1024px)': {
      height: '71px',
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
      height: '45px',
    },

    '@media (min-width: 1024px)': {
      height: '71px',
      padding: '0 40px',
    },
  },

  titleAnimation: {
    animation: 'animationTitle 1s forwards',
    opacity: 0,
    '@keyframes animationTitle': {
      '0%': {
        transform: 'translateY(60px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0)',
        opacity: 1,
      },
    },
  },

  sliderAnimation: {
    animation: 'animationSlider 1s forwards',
    opacity: 0,

    '@keyframes animationSlider': {
      '0%': {
        transform: 'translateY(80px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0)',
        opacity: 1,
      },
    },
  },

  slideTrackAnimation: {
    animation: 'scroll 50s linear infinite',
    animationDelay: '1s',

    '@keyframes scroll': {
      '0%': {
        transform: 'translateX(0)',
      },
      '100%': {
        transform: 'translateX(-50%)',
      },
    },
  },
};
