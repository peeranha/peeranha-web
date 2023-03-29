import { TEXT_LIGHT, TEXT_SECONDARY } from 'style-constants';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

export const styles = {
  confirmButton: {
    border: '1px solid #F76F60',
    width: '86px',
    height: '40px',
    color: TEXT_LIGHT,
    borderRadius: '2px',
    background: '#F76F60',
  },

  changeEmailForm: {
    h4: {
      textAlign: 'center',
      marginBottom: '10px',
    },
    '> div': {
      paddingBottom: '5px',
      textAlign: 'center',
    },
    div: {
      color: TEXT_SECONDARY,
      marginBottom: '10px',
    },
  },

  sendEmailForm: {
    h4: {
      textAlign: 'center',
      paddingBottom: '5px',
    },
    div: {
      textAlign: 'center',
      paddingBottom: '5px',
      img: {
        maxWidth: '170px',
        paddingBottom: '5px',
      },
      p: {
        textAlign: 'center',
        paddingBottom: '5px',
        color: TEXT_SECONDARY,
      },
      div: {
        fontWeight: 600,
        paddingBottom: '25px',
      },
    },
    button: {
      display: 'block',
      margin: 'auto',
      marginBottom: '25px',
    },
    form: {
      button: {
        width: '100%',
        marginBottom: '0',
      },
    },
  },

  confirmEmailForm: {
    h4: {
      textAlign: 'center',
      paddingBottom: '5px',
    },
    'h4 ~ div': {
      textAlign: 'center',
      paddingBottom: '5px',
      img: {
        maxWidth: '170px',
        paddingBottom: '5px',
      },
      p: {
        textAlign: 'center',
        paddingBottom: '5px',
        color: TEXT_SECONDARY,
      },
      div: {
        fontWeight: 600,
        marginBottom: '25px',
      },
      button: {
        display: 'block',
        margin: 'auto',
        marginBottom: '25px',
      },
      'div:last-child': {
        height: '1px',
        background: '#C2C6D8',
        marginTop: '25px',
      },
    },
    form: {
      span: {
        color: TEXT_SECONDARY,
      },
      'button:last-child': {
        width: '100%',
        marginTop: '25px',
        marginBottom: '0',
      },
    },
  },

  inputWarning: {
    input: {
      border: '1px solid #F76F60',
      boxShadow: '0 0 0 3px rgba(255, 0, 0, 0.40)',
    },
  },

  textWarning: {
    color: '#F76F60',
    fontStyle: 'italic',
    fontSize: '14px',
    marginBottom: '15px',
  },

  timer: {
    span: {
      color: TEXT_SECONDARY,
      marginLeft: '5px',
    },
    'span:last-child': {
      color: colors.btnColor || '#576FED',
      marginLeft: '0',
    },
  },
};
