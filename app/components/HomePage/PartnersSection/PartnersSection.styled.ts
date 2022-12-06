export const styles = {
  background: {
    background: 'rgba(255, 255, 255, 1)',
    padding: '40px 0',
  },

  title: {
    fontSize: '28px',
    lineHeight: '35px',
    color: '#282828',
  },

  slider: {
    width: 'fit-content',
    height: '32px',

    animation: 'scroll 10s linear infinite',

    '@keyframes scroll': {
      '0%': {
        left: 'translateX(0)',
      },
      '100%': {
        transform: 'translateX(-100%)',
      },
    },
  },

  slide: {
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 18px',

    '> img': {
      maxHeight: '100%',
    },
  },
};
