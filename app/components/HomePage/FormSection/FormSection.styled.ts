export const styles = {
  container: {
    background: 'rgba(250, 250, 250, 1)',
    padding: '40px 0px',

    '@media (min-width: 768px)': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '90px 0px',
    },

    '@media (min-width: 1366px)': {
      justifyContent: 'space-between',
      padding: '90px 105px',
    },

    '@media (min-width: 1920px)': {
      justifyContent: 'space-between',
      padding: '120px 289px',
    },
  },

  image: {
    padding: '0 40px 24px',
    margin: '0 auto',
    minWidth: '234px',
    maxWidth: '394px',

    '@media (min-width: 768px)': {
      padding: 0,
      margin: '0 44px 0 34px',
      minWidth: '314px',
    },

    '@media (min-width: 1024px)': {
      minWidth: '407px',
    },

    '@media (min-width: 1366px)': {
      minWidth: '478px',
    },
  },

  field: {
    '@media (min-width: 768px)': {
      width: '266px',
    },

    '@media (min-width: 1024px)': {
      width: '359px',
    },

    '@media (min-width: 1366px)': {
      width: '397px',
      marginBottom: '24px',
    },
  },

  label: {
    left: '16px',
    lineHeight: '20px',
    color: '#7B7B7B',
    pointerEvents: 'none',
  },

  input: {
    height: '40px',
    background: 'linear-gradient(0deg, #FFFFFF, #FFFFFF), #D8D8D8',
    border: '1px solid #C2C6D8',
    borderRadius: '3px',
  },

  warning: {
    fontStyle: 'normal',
    letterSpacing: '0.3px',
    color: 'rgb(220, 53, 69)',
  },

  button: {
    height: '40px',
    background: 'rgba(247,111,96,1)',
    borderRadius: '5px',
    lineHeight: '23px',
    color: '#FFFFFF',
    transition: '0.4s',

    ':hover': {
      opacity: 0.8,
    },

    '@media (min-width: 768px)': {
      width: '150px',
    },

    '@media (min-width: 1366px)': {
      height: '56px',
      width: '256px',
      fontSize: '28px',
      lineHeight: '35px',
    },
  },
};
