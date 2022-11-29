export const styled = {
  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.4)',
  },

  container: {
    color: '#282828',
    position: 'fixed',
    top: 0,
    height: '100vh',
    zIndex: 101,
    background: 'var(--color-white)',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
  },

  main: {
    height: '100%',
    gridTemplateColumns: '262px 1fr',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
  },

  leftSection: {
    background: '#FAFAFA',
    height: 'calc(100% - 72px)',
    overflow: 'auto',
  },

  centerSection: { overflow: 'auto', height: 'calc(100% - 100px)' },

  rightSection: { background: '#FAFAFA', height: '100%' },
};
