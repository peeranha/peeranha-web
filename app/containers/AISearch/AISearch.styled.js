import {
  singleCommunityColors,
  graphCommunityColors,
  singleCommunityStyles,
} from 'utils/communityManagement';
import { BORDER_PRIMARY, BORDER_PRIMARY_RGB, BORDER_RADIUS_M, BUTTON_COLOR } from 'style-constants';

const communityStyles = singleCommunityStyles();

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

const customColor = colors.linkColor || BORDER_PRIMARY;

export const styles = {
  mainSection: {
    display: 'flex',
    'flex-direction': 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  maiHeader: {
    fontWeight: 600,
    fontSize: '38px',
    marginBottom: '30px',
    marginTop: '12px',
    color: graphCommunity ? '#E1E1E4' : '#282828',
  },

  mainTextContainer: {
    display: 'flex',
    'flex-direction': 'column',
    alignItems: 'flex-start',
  },

  mainTextElement: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },

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
      height: '64px',
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
      background: BUTTON_COLOR,
    },
  },

  sampleQuestionButton: {
    border: '1px solid #C2C6D8',
    borderRadius: '3px',
    padding: '10px 15px',
    margin: '0 5px',
    cursor: 'pointer',
    color: graphCommunity ? 'rgba(225,225,228,0.55)' : '#282828',
    '&:hover': {
      color: colors.linkColor || '#576FED',
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
    color: graphCommunity ? '#E1E1E4' : '#282828',
  },

  text: {
    fontSize: '16px',
    'user-select': 'text',
    color: graphCommunity ? '#E1E1E4' : '#282828',
    a: {
      color: graphCommunity ? 'rgba(111,76,255,0.8)' : colors.linkColor || '#576FED',
    },
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
    border: `1px solid ${graphCommunity ? 'rgba(255,255,255,0.47)' : customColor}`,
    borderRadius: '3px',
    color: 'rgba(102, 112, 133, 1)',
    ':hover': {
      backgroundColor: graphCommunity ? 'rgba(255,255,255,0.06)' : 'rgba(53, 74, 137, 0.11)',
      color: 'rgba(87, 111, 237, 1)',
      border: '1px solid transparent',
    },
  },

  tagIndex: {
    textSize: '14px',
    width: '18px',
    height: '18px',
    'text-align': 'center',
    color: graphCommunity ? 'rgba(255,255,255,0.47)' : customColor,
    marginRight: '8px',
    border: `1px solid ${graphCommunity ? 'rgba(255,255,255,0.47)' : customColor}`,
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
