export const styles = {
  rulesConsent: {
    background: 'var(--color-white)',
    zIndex: 10,
    lineHeight: '20px',
    width: '328px',
    height: 'auto',
    left: 'calc(50% - 328px/2)',
    top: 'calc(50% - 582px/2 + 0.5px)',

    borderRadius: '5px',
    boxShadow: '0px 10px 20px rgba(24, 39, 79, 0.1)',

    '@media (min-width: 992px)': {
      width: '580px',
      height: 'auto',
      left: 'calc(50% - 580px/2)',
      top: 'calc(50% - 402px/2 + 0.5px)',
    },
  },

  gotItButton: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    '@media (min-width: 992px)': {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  },

  rulesConsentAnimation: {
    animation: 'animationRulesPopup 2s forwards',

    '@keyframes animationRulesPopup': {
      '0%': {
        transform: 'translateY(0)',
      },
      '100%': {
        transform: 'translateY(300%)',
        display: 'none',
      },
    },
  },

  modalOpen: {
    zIndex: '9',
    opacity: '0.3',
    backgroundColor: 'black',
  },

  modalClose: {
    display: 'none',
  },
};
