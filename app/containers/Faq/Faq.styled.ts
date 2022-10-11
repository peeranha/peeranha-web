export const styles = {
  buttonContainer: {
    '@media only screen and (max-width: 360px)': {
      width: '40%',
      'justify-content': 'space-between',
      'margin-left': '-15px',
    },
  },

  collapseImage: {
    'margin-right': '18px',
    width: '42px',
    display: 'inline-flex',
    'flex-shrink': 0,

    ':hover': {
      cursor: 'pointer',
    },

    '@media only screen and (max-width: 576px)': {
      'margin-right': '8px',
    },
  },
};
