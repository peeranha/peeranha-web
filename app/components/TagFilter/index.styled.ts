export const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    padding: '20px 0px',
    maxWidth: '70%',
    '@media only screen and (max-width: 1280px)': {
      maxWidth: '50%',
    },
    '@media only screen and (max-width: 768px)': {
      paddingBottom: '10px',
      gridColumnStart: '1',
      gridColumnEnd: '3',
      gridTemplateColumns: '1fr',
      alignItems: 'center',
      padding: '8px 0px',
      maxWidth: '100%',
      button: {
        flex: 'auto',
        'text-align': 'center',
      },
    },
    '@media only screen and (max-width: 576px)': {
      gridRowStart: '3',
      gridColumnStart: '1',
      gridColumnEnd: '2',
      paddingBottom: '0px',
      paddingTop: '10px',
    },
  },
  TagFilter: {
    color: 'var(--text-light)',
    border: 'var(--color-borderColor)',
    borderRadius: 'var(--border-radius)',
    background: 'var(--background-style)',
    marginLeft: '8px',
    marginRight: '0px',
    '@media only screen and (max-width: 576px)': {
      marginLeft: '0px',
      marginRight: '8px',
    },
    '&:first-child': {
      marginLeft: '0px',
    },
  },
  RemoveTagIcon: {
    display: 'inline-flex',
    padding: '0 0 0 10px',
  },
};
