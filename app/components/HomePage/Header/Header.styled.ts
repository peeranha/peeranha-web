export const styles = {
  wrapper: {
    padding: '14px 0',

    '@media (min-width: 768px)': {
      padding: '13px 0',
    },

    '@media (min-width: 1366px)': {
      padding: '20.5px 0',
    },
  },

  logo: {
    width: '122px',

    '@media (min-width: 1366px)': {
      width: '240px',
    },
  },

  link: {
    display: 'none',
    fontSize: '16px',
    lineHeight: '20px',
    color: 'rgba(40, 40, 40, 1)',

    '@media (min-width: 768px)': {
      display: 'inline',
      marginRight: '42px',
    },
  },

  button: {
    width: '93px',
    height: '28px',
    color: 'rgb(247, 111, 96)',
    border: '1px solid rgb(247, 111, 96)',
    borderRadius: '2px',
    lineHeight: '18px',
    transition: '0.4s',

    '@media (min-width: 768px)': {
      width: '140px',
      height: '30px',
      fontSize: '16px',
      lineHeight: '20px',
    },

    '@media (min-width: 1366px)': {
      height: '40px',
    },

    ':hover': {
      color: 'rgb(255, 255, 255)',
      background: 'rgb(247, 111, 96)',
    },
  },
};
