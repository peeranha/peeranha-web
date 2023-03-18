export const styles = {
  footer: {
    minHeight: '140px',
    color: '#7B7B7B',
  },

  content: {
    '@media (min-width: 576px)': {
      display: 'block',
    },
  },

  border: {
    borderBottom: '1px solid #c2c6d8',
    marginBottom: '30px',
  },

  infoBlock: {
    marginBottom: '30px',
  },

  infoLinks: {
    width: '100%',
    padding: '0 5px',
    color: 'inherit',
    '@media (min-width: 768px)': {
      padding: '0 35px',
    },
  },

  infoData: {
    fontSize: '12px',
  },

  infoRules: {
    marginTop: '5px',
    lineheight: '1.2',
    fontSize: '10px',
    padding: '10px',
    '> span': {
      whiteSpace: 'normal',
    },
    '@media (min-width: 576px)': {
      padding: '0',
    },
  },

  infoRulesLink: {
    fontWeight: '600',
    transition: 'opacity 0.3s ease-out',
    color: 'inherit',
    ':hover': {
      opacity: '0.8',
      color: 'inherit',
    },
  },
};
