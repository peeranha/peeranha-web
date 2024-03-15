import { BORDER_SECONDARY } from 'style-constants';
import { graphCommunityColors } from 'utils/communityManagement';

const graphCommunity = graphCommunityColors();

export const styles = {
  rulesConsent: {
    background: graphCommunity ? '#161425' : 'var(--color-white)',
    border: graphCommunity ? '1px solid #3D3D54' : '',
    zIndex: 10,
    lineHeight: '20px',
    width: '100%',
    height: '100%',
    left: 0,
    top: '60px',
    boxShadow: '0px 10px 20px rgba(24, 39, 79, 0.1)',
    overflowY: 'auto',
    borderTop: graphCommunity ? '' : `1px solid ${BORDER_SECONDARY}`,
    paddingBottom: '50px',
    '@media only screen and (min-width: 576px)': {
      width: '328px',
      height: 'auto',
      top: 'calc(50% - 582px/2 + 0.5px)',
      left: 'calc(50% - 328px/2)',
      borderRadius: '5px',
      borderTop: graphCommunity ? '' : `none`,
      paddingBottom: 0,
    },
    '@media (min-width: 992px)': {
      width: '580px',
      height: 'auto',
      left: 'calc(50% - 580px/2)',
      top: 'calc(50% - 402px/2 + 0.5px)',
    },
  },

  gotItButton: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    '@media (min-width: 992px)': {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  },

  rulesConsentAnimation: {
    animation: 'animationRulesPopup 2s forwards',

    '@keyframes animationRulesPopup': {
      '0%': {
        transform: 'translateY(0)',
      },
      '100%': {
        transform: 'translateY(300%)',
        display: 'none',
      },
    },
  },

  modalOpen: {
    zIndex: '9',
    opacity: '0.3',
    backgroundColor: 'black',
  },

  modalClose: {
    display: 'none',
  },
};
