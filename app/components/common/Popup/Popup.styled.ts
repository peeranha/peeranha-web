const styles = {
  popup: {
    backgroundColor: 'rgba(16, 34, 87, 0.65)',
    position: 'fixed',
  },
  header: {
    '& h1': {
      margin: 0,
      padding: 0,
      fontSize: 20,
      fontЦeight: 600,
      lineHeight: '24px',

      '@media (min-width: 768px)': {
        fontSize: 30,
        lineHeight: '38px',
      },
    },
  },
  content: {
    maxHeight: '100%',
    borderRadius: '5px',
    backgroundColor: 'var(--color-white)',
    height: '100vh',
    overflow: 'hidden auto',
    boxShadow: '0px 20px 20px rgba(24, 39, 79, 0.1)',

    '@media (min-width: 768px)': {
      height: 'auto',
      padding: 32,
    },
  },
  container: {
    paddingTop: 12,
  },
  close: {
    zIndex: 1,
    right: 16,
    top: 16,
    color: '#576FED',
  },

  full: {
    '@media (min-width: 768px)': {
      '& .content-popup': { maxWidth: 'none', width: '100%' },
    },
  },
  big: {
    '@media (min-width: 768px)': {
      '& .content-popup': { maxWidth: 1200 },
    },
  },
  medium: {
    '@media (min-width: 768px)': {
      '& .content-popup': { maxWidth: 976 },
    },
  },
  small: {
    '@media (min-width: 768px)': {
      '& .content-popup': { maxWidth: 660 },
    },
  },
  tiny: {
    '@media (min-width: 768px)': {
      '& .content-popup': { maxWidth: 470 },
    },
  },
  atom: {
    '@media (min-width: 768px)': {
      '& .content-popup': { maxWidth: 344 },
    },
  },
};

export default styles;
