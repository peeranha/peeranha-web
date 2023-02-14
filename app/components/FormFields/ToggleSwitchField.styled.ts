export const styles = {
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
    backgroundColor: 'rgba(53, 74, 137, 0.15)',
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
      backgroundColor: 'rgb(255, 255, 255)',
      borderRadius: '50%',
      transition: 'transform 0.3s ease',
      boxShadow:
        '0px 4px 5px rgba(0, 8, 29, 0.05), 0px 3px 4px rgba(0, 8, 29, 0.06), 0px 2px 6px rgba(0, 8, 29, 0.08)',
    },
  },
};
