import { TEXT_DARK } from 'style-constants';

export const styles = {
  mainInfo: {
    justifyContent: 'space-after',
    marginRight: '15px',
    minWidth: '0',
  },

  contentGrid: {
    gridTemplateColumns: '3fr 5fr 6fr',
  },

  addModeratorButton: {
    '@media only screen and (max-width: 991px)': {
      padding: 0,
      borderRadius: '50%',
      minWidth: 'auto',
      width: '40px',
      height: '40px',
    },
    '@media only screen and (max-width: 576px)': {
      width: '36px !important',
      height: '36px !important',
    },
  },

  removeTagIcon: {
    padding: '0 0 0 10px',
  },

  popupTitle: {
    color: TEXT_DARK,
    lineHeight: '28px',
  },

  validationError: {
    border: '1px solid rgb(252, 102, 85)',
    boxShadow: '0 0 0 3px rgb(252 102 85 / 40%)',
    borderRadius: '3px',
  },

  dropdown: {
    marginBottom: '5px',

    span: {
      fontSize: '14px',
    },
    button: {
      boxShadow: 'none !important',
    },
  },

  popupText: {
    color: '#7b7b7b',
    fontStyle: 'italic',
  },

  popupField: {
    paddingRight: '14px !important',
  },
};
