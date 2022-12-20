export const styles = {
  transactionsStatusBlock: {
    position: 'fixed',
    right: '-289px',
    top: '0px',
    transition: 'all 1s',
    'z-index': 100,
    'min-height': '100%',
    background: 'black',

    '@media (min-width: 768px)': {
      top: '107px',
      'min-height': '0',
    },
  },

  statusButton: {
    width: '289px',
    height: '70px',
    background: '#A5BCFF',
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
    padding: '24px 16px',
    width: '245px',
    'z-index': 100,
    background: 'linear-gradient(0deg, #FFFFFF, #FFFFFF), #DFE1E9',

    'box-shadow': '0 10px 20px rgba(24, 39, 79, 0.1)',

    gap: '16px',

    right: 0,
    'min-height': '100%',

    '@media (min-width: 768px)': {
      'min-height': '116px',
      top: '-21px',
      'border-radius': '5px 0 0 5px',
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
};
