import { graphCommunityColors } from 'utils/communityManagement';

const graphCommunity = graphCommunityColors();

export const styles = {
  transactionsStatusBlock: {
    position: 'fixed',
    right: '-289px',
    top: '0px',
    transition: 'all 1s',
    'z-index': 100,
    'min-height': '100%',
    background: '#282828',

    '@media (min-width: 768px)': {
      top: '107px',
      'min-height': '0',
    },
  },

  statusButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '16px',
    position: 'absolute',
    width: '289px',
    height: '70px',
    background: graphCommunity ? 'rgba(111, 76, 255, 1)' : '#A5BCFF',
    'box-shadow': '0 10px 20px rgba(24, 39, 79, 0.1)',
    'border-radius': '24px 0 0 24px',
    right: '0px',
    bottom: '10px',
    'z-index': 100,
    transition: 'all 0.3s',
    '@media (min-width: 768px)': {
      top: '0',
      right: '0',
    },
  },

  transactionList: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    position: 'absolute',
    padding: '24px 16px',
    color: graphCommunity ? 'rgba(225, 225, 228, 1)' : '',
    width: '245px',
    'z-index': 100,
    background: graphCommunity
      ? 'rgba(26, 23, 47, 1)'
      : 'linear-gradient(0deg, #FFFFFF, #FFFFFF), #DFE1E9',
    border: graphCommunity ? '1px solid #3D3D54' : '',

    'box-shadow': '0 10px 20px rgba(24, 39, 79, 0.1)',

    gap: '16px',

    right: 0,
    'min-height': '100%',

    '@media (min-width: 768px)': {
      'min-height': '116px',
      top: '-21px',
      'border-radius': '5px 0 0 5px',
    },
    'p:first-child': {
      fontWeight: 700,
    },
  },

  blocker: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(16, 34, 87, 0.65)',
    'z-index': 99,
    '@media (min-width: 768px)': {
      display: 'none',
    },
  },

  transactionLoader: {
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

  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },

  singleTransactionBlock: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    color: graphCommunity ? 'rgba(225, 225, 228, 1)' : '',
    marginLeft: '12px',
    '>p': {
      fontSize: '12px',
    },
    'p:first-child': {
      fontSize: '14px',
      marginBottom: '8px',
    },
  },

  transactionsPopup: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '12px',
    color: graphCommunity ? 'rgba(225, 225, 228, 1)' : '',
    'div:first-child': {
      fontSize: '14px',
      fontWeight: 400,
      color: '#fff',
    },
    'div:nth-child(2)': {
      fontSize: '12px',
      color: '#fff',
    },
  },

  successfulTransactions: {
    width: '213px',
    height: '1px',
    background: 'rgba(53, 74, 137, 0.15)',
    alignSelf: 'stretch',
    color: graphCommunity ? 'rgba(225, 225, 228, 1)' : '',
    flexGrow: 0,
  },
};
