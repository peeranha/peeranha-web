import { createUseStyles } from 'react-jss';
import { TypePopup } from './types';

type StylesSPopup = {
  isTransition: boolean;
  type: TypePopup;
};

const useStyles = createUseStyles<string, StylesSPopup>({
  popup: {
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'fixed',
  },
  header: {
    '& h1': {
      margin: 0,
      padding: 0,
      fontSize: 20,
    },
  },
  content: ({ isTransition, type }) => ({
    maxHeight: '100%',
    borderRadius: 0,
    backgroundColor: 'var(--color-white)',

    ...(isTransition && {
      transition: 'all 0.3s ease-out',
      opacity: 0.5,
      transform: 'translateY(-10%)',
    }),

    ...(type === 'advertising' && {
      width: 'max-content',
      height: 'auto',
      padding: 0,
      backgroundColor: 'transparent',
    }),

    ...(type === 'default' && {
      height: '100vh',
      overflow: 'hidden auto',
    }),
  }),
  container: {
    paddingTop: ({ type }) => (type === 'advertising' ? 0 : 12),
  },
  closeAdvertising: {
    right: 1,
    top: -18,
    zIndex: 1,
    padding: 7,
    borderRadius: '50%',
    color: 'var(--color-white)',
    backgroundColor: 'var(--color-black)',
    transition: 'all .3s',

    '& svg': {
      width: 24,
      height: 24,
    },

    '&:hover': {
      backgroundColor: 'var(--color-white)',
      color: 'var(--color-black)',
    },
  },
  close: {
    zIndex: 1,
    right: 15,
    top: 25,
    color: 'var(--color-icons)',
  },

  // Необходимы для добавления классов
  full: {},
  big: {},
  medium: {},
  small: {},
  tiny: {},
  atom: {},

  '@media (min-width: 768px)': {
    header: {
      '& h1': {
        fontSize: 32,
      },
    },
    content: ({ type }) => ({
      borderRadius: 5,
      ...(type === 'default' && {
        height: 'auto',
        padding: 24,
      }),
    }),
    closeAdvertising: {
      top: -20,
      right: 0,
      padding: 8,
    },
    full: ({ type }) => ({
      ...(type === 'default' && {
        '& $content': { maxWidth: 'none', width: '100%' },
      }),
    }),
    big: {
      '& $content': { maxWidth: 1200 },
    },
    medium: {
      '& $content': { maxWidth: 976 },
    },
    small: {
      '& $content': { maxWidth: 660 },
    },
    tiny: {
      '& $content': { maxWidth: 470 },
    },
    atom: {
      '& $content': { maxWidth: 344 },
    },
  },
});

export default useStyles;
