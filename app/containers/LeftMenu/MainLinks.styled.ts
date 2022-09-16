export const styles = {
  menuSectionTitle: {
    fontFamily: 'Source Sans Pro, serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
    span: {
      'text-transform': 'uppercase',
    },
    color: '#7B7B7B',
    padding: '0 0 12px 15px',
  },

  divider: {
    height: '1px',
    background: '#C2C6D8',
    marginTop: '28px',
  },

  dropdownMenu: {
    left: '0px',
    fontWeight: 'normal',
    fontSize: '16px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.25)',
    borderRadius: '5px',
    zIndex: 1,
  },

  dropdownMenuItem: {
    color: 'black',
    padding: '12px 16px',
    textDecoration: 'none',
    display: 'block',
    ':hover': {
      boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid #7699FF',
      borderRadius: '5px',
    },
  },
};
