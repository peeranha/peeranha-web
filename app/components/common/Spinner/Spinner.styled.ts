export const styles = {
  loadingSpinner: {
    border: '2px solid rgba(118, 153, 255, 0.2)',
    borderTop: '2px solid',
    borderRadius: '50%',
    animation: 'spinner 1.5s linear infinite',

    '@keyframes spinner': {
      '0%': {
        transform: 'rotate(0deg)',
      },
      '100%': {
        transform: 'rotate(360deg)',
      },
    },
  },
};
