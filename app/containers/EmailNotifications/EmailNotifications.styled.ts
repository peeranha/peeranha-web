import { CSSObject } from '@emotion/react';
import {
  TEXT_LIGHT,
  TEXT_SECONDARY,
  TEXT_DARK,
  LINK_COLOR,
  BG_TRANSPARENT,
  BORDER_TRANSPARENT,
  BUTTON_COLOR,
} from 'style-constants';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

export const styles: Record<string, CSSObject> = {
  confirmButton: {
    border: '1px solid #F76F60',
    width: '86px',
    height: '40px',
    color: TEXT_LIGHT,
    borderRadius: '2px',
    background: '#F76F60',
    fontSize: '16px',
  },

  changeEmailForm: {
    h4: {
      textAlign: 'center',
      marginBottom: '10px',
      color: TEXT_DARK,
      fontWeight: 600,
      fontSize: '30px',
      lineHeight: '38px',
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
      color: TEXT_DARK,
      fontWeight: 600,
      fontSize: '30px',
      lineHeight: '38px',
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
      color: TEXT_DARK,
      fontWeight: 600,
      fontSize: '30px',
      lineHeight: '38px',
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
        color: LINK_COLOR,
        background: BG_TRANSPARENT,
        border: `1px solid ${BORDER_TRANSPARENT}`,
        borderRadius: 0,
        height: 'auto',
        minHeight: 'auto',
        fontSize: '16px',
        lineHeight: '18px',
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
      boxShadow: '0 0 0 3px rgba(252,102,85,0.40)',
    },
    'input:focus': {
      border: '1px solid #F76F60',
      boxShadow: '0 0 0 3px rgba(252,102,85,0.40)',
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

  timerButton: {
    color: LINK_COLOR,
    background: BG_TRANSPARENT,
    border: `1px solid ${BORDER_TRANSPARENT}`,
    borderRadius: 0,
    height: 'auto',
    minHeight: 'auto',
    fontSize: '16px',
    lineHeight: '18px',
  },
  verifyButton: {
    padding: '10px 18px',
    fontSize: '16px',
    lineHeight: '18px',
    minWidth: '92px',
    height: '40px',
    background: BUTTON_COLOR,
    color: TEXT_LIGHT,
    ':hover': {
      opacity: '0.8',
    },
  },
  transparentButton: {
    color: LINK_COLOR,
    background: BG_TRANSPARENT,
    border: `1px solid ${BORDER_TRANSPARENT}`,
    borderRadius: 0,
    height: 'auto',
    minHeight: 'auto',
    fontSize: '16px',
    lineHeight: '18px',
    svg: {
      marginRight: '5px',
    },
  },
};
