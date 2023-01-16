export const styles = {
  root: {
    overflow: 'hidden',
  },
  container: {
    scrollbarWidth: 'none',
    overflow: 'auto',
    height: '100%',

    '::-webkit-scrollbar': {
      height: '4px',
      backgroundColor: 'transparent',
    },

    '::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(53, 74, 137, 0.25)',
      borderRadius: '4px',
    },
  },
};
