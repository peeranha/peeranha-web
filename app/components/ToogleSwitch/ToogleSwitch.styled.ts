export const styled = {
  toggleSwitch: {
    position: 'relative',
    display: 'inline-block',
    width: '50px',
    height: '25px',
    'input[type="checkbox"]': {
      display: 'none',
    },
    'input[type="checkbox"]:checked + span::before': {
      transform: 'translateX(25px)',
      backgroundColor: '#FFF',
    },
    'input[type="checkbox"]:checked + span': {
      backgroundColor: '#576FED',
    },
  },
  switch: {
    position: 'absolute',
    cursor: 'pointer',
    backgroundColor: '#ccc',
    borderRadius: '25px',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    transition: 'background-color 0.2s ease',
    '::before': {
      position: 'absolute',
      content: '""',
      left: '2px',
      top: '2px',
      width: '21px',
      height: '21px',
      backgroundColor: '#aaa',
      borderRadius: '50%',
      transition: 'transform 0.3s ease',
    },
  },
};
