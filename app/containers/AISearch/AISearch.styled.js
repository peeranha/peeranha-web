import {
  singleCommunityColors,
  graphCommunityColors,
  singleCommunityStyles,
} from 'utils/communityManagement';
import { BORDER_PRIMARY_RGB, BORDER_RADIUS_M } from 'style-constants';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();
const communityStyles = singleCommunityStyles();

export const styles = {
  headerSearchField: {
    display: 'block',
    position: 'relative',
    width: '100%',
  },

  textField: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '25px',
    padding: '30px 30px 0 30px',
    flex: 1,
    overflow: 'hidden',
  },

  communicationField: {
    boxSizing: 'border-box',
    flexGrow: 0,
    padding: '20px',
    height: '127px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  aiTip: {
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '18px',
    color: '#8B8B8B',
  },

  searchInput: {
    width: '100%',
    height: '60px',
    border: `1px solid ${graphCommunity ? '#FFFFFF0F' : '#C2C6D8'}`,
    backgroundColor: graphCommunity ? '#FFFFFF0F' : '',
    borderRadius: `${BORDER_RADIUS_M}`,
    padding: '0 10px',
    outline: 'none',
    opacity: 1,
    boxSizing: 'border-box',
    color: graphCommunity ? '#E1E1E4' : 'inherit',
    '@media (min-width: 577px)': {
      height: graphCommunity ? '48px' : '64px',
      padding: '0 135px 0 16px',
    },
    '&:focus': {
      borderColor: graphCommunity
        ? '#6F4CFF'
        : colors.linkColorTransparent || `rgb(${BORDER_PRIMARY_RGB})`,
      boxShadow: graphCommunity
        ? 'none'
        : `0 0 0 3px ${colors.linkColorTransparent || `rgba(${BORDER_PRIMARY_RGB}, 0.40)`}`,
      backgroundColor: graphCommunity ? 'rgba(111, 76, 255, 0.06)' : '',

      '&:hover': {
        border: graphCommunity ? '1px solid rgba(111, 76, 255, 1)' : '',
        background: graphCommunity ? 'rgba(111, 76, 255, 0.06) !important' : '',
      },
    },
    '&:hover': {
      borderColor: graphCommunity ? '#3D3D54' : '',
      background: graphCommunity ? 'rgba(255, 255, 255, 0.06)' : '',
    },
    '::placeholder': {
      color: graphCommunity ? '#E1E1E4' : '',
      opacity: graphCommunity ? 1 : '',
    },
  },

  searchInputIcon: {
    cursor: 'pointer',
    borderRadius: '3px',
    fill: 'red',
    position: 'absolute',

    top: '14px',
    right: '13px',
    '&:hover': {
      background: '#FC6655',
    },
  },

  sampleQuestionButton: {
    border: '1px solid #C2C6D8',
    borderRadius: '3px',
    padding: '10px 15px',
    margin: '0 5px',
    '&:hover': {
      color: '#576FED',
      boxShadow: '0 1px 1px rgba(40, 40, 40, 0.1)',
    },
  },

  chatFragmentContainer: {
    display: 'flex',
    paddingBottom: '30px',
    'user-select': 'text',
  },

  chatInfo: {
    display: 'flex',
    flex: 1,
    'flex-direction': 'column',
    'user-select': 'text',
  },

  username: {
    fontWeight: '600',
    fontSize: '18px',
    paddingBottom: '12px',
  },

  text: {
    fontSize: '16px',
    'user-select': 'text',
  },

  iconContainer: {
    paddingRight: '12px',
  },

  buttonChatContainer: {
    display: 'flex',
    'flex-direction': 'column',
    marginLeft: '54px',
    gap: '16px',
  },

  row: {
    display: 'flex',
    alignItems: 'center',
    'flex-wrap': 'wrap',
    gap: '3px',
  },

  button: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '5px 10px',
    marginRight: '10px',
    border: `1px solid rgba(198, 202, 218, 1)`,
    borderRadius: '3px',
    color: 'rgba(102, 112, 133, 1)',
    ':hover': {
      backgroundColor: 'rgba(173, 186, 255, 0.2)',
      color: 'rgba(87, 111, 237, 1)',
      border: '1px solid transparent',
    },
  },

  tagIndex: {
    textSize: '14px',
    width: '18px',
    height: '18px',
    'text-align': 'center',
    color: 'rgba(87, 111, 237, 1)',
    marginRight: '8px',
    border: `1px solid rgba(87, 111, 237, 1)`,
    borderRadius: '3px',
  },

  loader: {
    width: '18px',
    marginRight: '8px',
    animation: 'rotation 2s infinite linear',
    '@keyframes rotation': {
      '0%': {
        transform: 'rotate(0deg)',
      },
      '100%': {
        transform: 'rotate(360deg)',
      },
    },
  },

  additionalButton: {
    ...communityStyles.headerLoginButtonStyles,
  },

  startOver: {
    display: 'none',
    '@media (min-width: 577px)': {
      display: 'block',
      position: 'absolute',
      top: '50px',
      left: '-300px',
    },
  },
};
