export const styles = {
  wrapper: {
    padding: '32px 0',

    '@media (min-width: 768px)': {
      padding: '0 0 16px',
    },

    '@media (min-width: 1366px)': {
      padding: '16px 0 20px',
    },
  },

  sectionContent: {
    '@media (min-width: 768px)': {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: '30px',
    },

    '@media (min-width: 1024px)': {
      margin: '50px 0 21px',
    },

    '@media (min-width: 1366px)': {
      marginTop: '31px',
    },
  },

  sectionText: {
    '@media (min-width: 768px)': {
      width: '324px',
      alignItems: 'normal',
    },

    '@media (min-width: 1024px)': {
      width: '436px',
    },

    '@media (min-width: 1366px)': {
      width: '607px',
    },

    '@media (min-width: 1920px)': {
      width: '827px',
    },
  },

  heading: {
    lineHeight: '100%',
    color: 'rgb(53, 74, 137)',

    '@media (min-width: 768px)': {
      textAlign: 'start',
    },

    '@media (min-width: 1024px)': {
      fontSize: '64px',
      marginBottom: '16px',
    },

    '@media (min-width: 1366px)': {
      fontSize: '80px',
    },

    '@media (min-width: 1920px)': {
      fontSize: '108px',
    },
  },

  subHeading: {
    lineHeight: '20px',
    color: 'rgb(0, 0, 0)',

    '@media (min-width: 768px)': {
      textAlign: 'start',
    },

    '@media (min-width: 1024px)': {
      fontSize: '20px',
      lineHeight: '25px',
    },

    '@media (min-width: 1366px)': {
      fontSize: '26px',
      lineHeight: '33px',
      marginBottom: '56px',
    },

    '@media (min-width: 1920px)': {
      fontSize: '38px',
      lineHeight: '48px',
    },
  },

  button: {
    width: '190px',
    height: '40px',
    background: 'rgba(247, 111, 96, 1)',
    borderRadius: '5px',
    lineHeight: '25px',
    color: '#FFFFFF',
    marginBottom: '38px',

    '@media (min-width: 768px)': {
      marginBottom: 0,
    },

    '@media (min-width: 1366px)': {
      width: '256px',
      height: '56px',
      fontSize: '28px',
      lineHeight: '35px',
    },
  },

  manImage: {
    marginBottom: '38px',

    '@media (min-width: 768px)': {
      marginBottom: 0,
    },

    '@media (min-width: 1024px)': {
      width: '355px',
    },

    '@media (min-width: 1366px)': {
      width: '500px',
    },

    '@media (min-width: 1920px)': {
      width: '560px',
      marginRight: '129px',
    },
  },

  arrowImage: {
    width: '54px',

    '@media (min-width: 1366px)': {
      width: '82px',
    },
  },
};
