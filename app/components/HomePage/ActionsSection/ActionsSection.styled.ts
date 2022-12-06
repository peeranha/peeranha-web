export const styles = {
  wrapper: {
    padding: '32px 0 48px',

    '@media (min-width: 768px)': {
      padding: '0 0 48px',
    },
  },

  action: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '40px',

    '@media (min-width: 768px)': {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 0,
      padding: '56px 0',
    },

    '@media (min-width: 1024px)': {
      padding: '64px 0',
    },

    '@media (min-width: 1366px)': {
      padding: '90px 0',
    },

    '@media (min-width: 1920px)': {
      padding: '100px 0',
    },
  },

  reverse: {
    '@media (min-width: 768px)': {
      flexDirection: 'row-reverse',
      alignItems: 'center',
      padding: '56px 0',
      marginBottom: 0,

      div: {
        marginRight: '0',
        marginLeft: '34px',
      },
    },

    '@media (min-width: 1024px)': {
      padding: '64px 0',

      div: {
        marginRight: '0',
        marginLeft: '52px',
      },
    },

    '@media (min-width: 1366px)': {
      padding: '90px 0',

      div: {
        marginRight: '0',
        marginLeft: '56px',
      },
    },

    '@media (min-width: 1920px)': {
      padding: '100px 0',

      div: {
        marginRight: '0',
        marginLeft: '118px',
      },
    },
  },

  textBlock: {
    '@media (min-width: 768px)': {
      width: '250px',
      minWidth: '250px',
      marginRight: '34px',
    },

    '@media (min-width: 1024px)': {
      width: '307px',
      minWidth: '307px',
      marginRight: '52px',
    },

    '@media (min-width: 1366px)': {
      width: '421px',
      minWidth: '421px',
      marginRight: '56px',
    },

    '@media (min-width: 1920px)': {
      width: '568px',
      minWidth: '568px',
      marginRight: '118px',
    },
  },

  header: {
    fontWeight: 700,
    fontSize: '28px',
    lineHeight: '110%',
    color: 'rgb(40, 40, 40)',
    marginBottom: '8px',

    '@media (min-width: 768px)': {
      marginBottom: '16px',
    },

    '@media (min-width: 1024px)': {
      fontSize: '32px',
    },

    '@media (min-width: 1366px)': {
      fontSize: '40px',
    },

    '@media (min-width: 1920px)': {
      fontSize: '58px',
    },
  },

  text: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '150%',
    color: 'rgb(40, 40, 40)',
    display: 'inline-block',
    marginBottom: '16px',

    '@media (min-width: 768px)': {
      marginBottom: 0,
    },

    '@media (min-width: 1024px)': {
      fontSize: '16px',
    },

    '@media (min-width: 1366px)': {
      fontSize: '18px',
    },

    '@media (min-width: 1920px)': {
      fontSize: '22px',
    },
  },

  image: {
    width: '100%',
    boxShadow: '0px 20px 15px -12px rgba(24, 39, 79, 0.12)',

    '@media (min-width: 768px)': {
      minWidth: '390px',
    },

    '@media (min-width: 1024px)': {
      minWidth: '537px',
    },

    '@media (min-width: 1366px)': {
      minWidth: '761px',
    },

    '@media (min-width: 1920px)': {
      minWidth: '994px',
    },
  },
};
