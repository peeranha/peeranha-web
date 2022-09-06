export const styles = {
  basicStyles: {
    width: '30px',
    height: '30px',
    borderRadius: '5px',
    ':hover': {
      backgroundColor: 'rgba(53, 74, 137, 0.05)',
      color: '#576FED',
    },
    '@media (min-width: 450px)': {
      width: '40px',
      height: '40px',
    },
  },

  activeStyles: {
    backgroundColor: '#F76F60',
    borderRadius: '5px',
    color: '#FFF',
  },

  span: {
    paddingRight: '5px',
  },
};
