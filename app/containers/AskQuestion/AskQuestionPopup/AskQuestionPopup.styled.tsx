export const styles = {
  rulesConsent: {
    background: 'var(--color-gray-light)',
    zIndex: 10,
    top: '61px',
    '@media (min-width: 992px)': {
      width: '50%',
      left: '30%',
      top: '25%',
      height: 'auto',
      borderRadius: '30px',
      border: '3px solid #fc6655',
    },
  },

  rulesConsentAnimation: {
    animation: 'animationRulesPopup 3s forwards',

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
};
