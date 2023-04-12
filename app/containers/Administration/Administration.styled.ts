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

  popupSpan: {
    lineHeight: '14px',
    color: '#282828',
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

  validationText: {
    color: 'rgba(247, 111, 96, 1)',
    fontStyle: 'italic',
    marginTop: '9px',
  },

  validationField: {
    color: 'rgba(247, 111, 96, 1)',
  },

  popupCheckboxLabel: {
    fontSize: '16px',
    lineHeight: '14px',
    color: '#282828',
  },

  popupCheckbox: {
    marginRight: '9px',
    width: '22px',
    height: '22px',

    'input[type=checkbox]': {
      position: 'relative',
      cursor: 'pointer',
    },
    'input[type=checkbox]:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '22px',
      height: '22px',
      top: 0,
      left: 0,
      border: '1px solid #C2C6D8',
      borderRadius: '3px',
      backgroundColor: 'rgb(255,255,255)',
    },
    'input[type=checkbox]:checked:before': {
      backgroundColor: 'rgba(87, 111, 237, 1)',
      border: '1px solid rgba(87, 111, 237, 1)',
    },
    'input[type=checkbox]:checked:after': {
      content: '""',
      display: 'block',
      width: '7px',
      height: '13px',
      border: 'solid rgb(255,255,255)',
      borderWidth: '0 2px 2px 0',
      '-webkit-transform': 'rotate(45deg)',
      '-ms-transform': 'rotate(45deg)',
      transform: 'rotate(45deg)',
      position: 'absolute',
      top: '3px',
      left: '8px',
    },
  },

  firstCheckbox: {
    marginRight: '13px',
  },

  checkboxError: {
    'input[type=checkbox]:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '22px',
      height: '22px',
      top: 0,
      left: 0,
      border: '1px solid rgba(247, 111, 96, 1)',
      borderRadius: '3px',
      backgroundColor: 'rgb(255,255,255)',
      boxShadow: '0 0 0 3px rgb(252 102 85 / 40%)',
    },
  },
};
