export const styles = {
  popupOverlap: {
    zIndex: 999,
  },

  cookieConsent: {
    background: 'var(--color-gray-light)',
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
