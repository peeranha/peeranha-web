export const styles = {
  root: {
    overflow: 'hidden',
  },
  container: {
    scrollbarWidth: 'none',
    overflow: 'hidden',
    height: '100%',

    '::-webkit-scrollbar': {
      height: '4px',
      backgroundColor: 'transparent',
    },
    ':hover': {
      overflow: 'auto',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(53, 74, 137, 0.25)',
      borderRadius: '4px',
    },
  },
};
