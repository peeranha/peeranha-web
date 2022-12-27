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

  letterAnimation: {
    animation: 'letterImageAnimation 1s forwards',
    opacity: 0,

    '@keyframes letterImageAnimation': {
      '0%': {
        transform: 'translateX(-100px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0)',
        opacity: 1,
      },
    },
  },

  firstFieldAnimation: {
    animation: 'firstFormFieldAnimation 1.2s forwards',

    '@keyframes firstFormFieldAnimation': {
      '0%': {
        transform: 'translateY(40px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0)',
        opacity: 1,
      },
    },
  },
  secondFieldAnimation: {
    animation: 'secondFormFieldAnimation1 1.2s forwards',
    animationDelay: '0.2s',

    '@keyframes secondFormFieldAnimation1': {
      '0%': {
        transform: 'translateY(40px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0)',
        opacity: 1,
      },
    },
  },
  thirdFieldAnimation: {
    animation: 'thirdFormFieldAnimation 1.2s forwards',
    animationDelay: '0.4s',

    '@keyframes thirdFormFieldAnimation': {
      '0%': {
        transform: 'translateY(40px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0)',
        opacity: 1,
      },
    },
  },
  fourthFieldAnimation: {
    animation: 'fourthFormFieldAnimation 1.2s forwards',
    animationDelay: '0.6s',

    '@keyframes fourthFormFieldAnimation': {
      '0%': {
        transform: 'translateY(40px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0)',
        opacity: 1,
      },
    },
  },
  buttonFieldAnimation: {
    animation: 'buttonFormFieldAnimation 1.2s forwards',
    animationDelay: '0.8s',

    '@keyframes buttonFormFieldAnimation': {
      '0%': {
        transform: 'translateY(40px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0)',
        opacity: 1,
      },
    },
  },
};
