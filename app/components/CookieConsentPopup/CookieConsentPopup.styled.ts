export const styles = {
  cookieConsent: {
    background: '#f0f8ff',
    zIndex: 999,
  },

  cookieImage: {
    '@media (min-width: 450px)': {
      display: 'inline',
      width: 70,
    },
  },

  cookieConsentAnimation: {
    animation: 'animationCookiePopup 1s forwards',

    '@keyframes animationCookiePopup': {
      '0%': {
        transform: 'translateY(0)',
      },
      '100%': {
        transform: 'translateY(100%)',
        display: 'none',
      },
    },
  },

  text: {
    lineHeight: '20px',
  },
};
