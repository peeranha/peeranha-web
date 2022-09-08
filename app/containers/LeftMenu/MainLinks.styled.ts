export const styles = {
  menuSectionTitle: {
    'font-family': 'Source Sans Pro, serif',
    'font-style': 'normal',
    'font-weight': 400,
    'font-size': '14px',
    'line-height': '18px',
    span: {
      'text-transform': 'uppercase',
    },
    color: '#7B7B7B',
    padding: '0 0 12px 15px',
  },

  divider: {
    height: '1px',
    background: '#C2C6D8',
    'margin-top': '28px',
  },

  dropdownMenu: {
    position: 'absolute',
    'font-weight': 'normal',
    'font-size': '16px',
    'background-color': '#FFFFFF',
    'box-shadow': '0px 4px 6px rgba(0, 0, 0, 0.25)',
    'border-radius': '5px',
    'z-index': 1,
  },

  dropdownMenuItem: {
    color: 'black',
    padding: '12px 16px',
    'text-decoration': 'none',
    display: 'block',
    ':hover': {
      'box-shadow': '0px 2px 2px rgba(0, 0, 0, 0.1)',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid #7699FF',
      'border-radius': '5px',
    },
  },
};
