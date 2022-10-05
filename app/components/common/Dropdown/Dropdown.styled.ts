const disabled = {
  cursor: 'not-allowed',
  '& *': {
    pointerEvents: 'none',
  },
  '& .dropdown-icon': {
    opacity: 0.3,
  },
};

const styles = {
  root: {
    height: 40,
    padding: '11px 12px 11px 16px',
    backgroundColor: 'var(--color-white)',
    fontSize: 14,
    borderWidth: 0,
    '&:disabled': {
      ...disabled,
      backgroundColor: 'rgba(63, 78, 93, 0.02)',
      borderColor: 'rgba(0, 0, 0, 0.06)',
      '& .dropdown-placeholder, & .dropdown-label': {
        color: 'rgba(0, 0, 0, 0.35)',
      },
      '& .dropdown-arrow': {
        opacity: 0.3,
      },
    },
    '&:not(:disabled):hover': {
      borderColor: 'rgba(0, 0, 0, 0.22))',
      boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.22)',
    },
  },
  icon: {
    color: '#7B7B7B',
    width: 24,
    height: 24,
  },
  arrow: {
    padding: '0px 4px',
    marginLeft: 'auto',
    color: '#7B7B7B',
    transition: 'transform 0.25s',
  },
  open: {
    transform: 'rotate(-180deg)',
  },
  invalid: {
    '&, &:not(:disabled):hover': {
      borderColor: 'var(--color-error)',
      boxShadow: '0 0 0 1px var(--color-error)',
    },
  },
  placeholder: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  label: {
    color: 'var(--color-black)',
  },
  optionsWrap: {
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.25)',
    borderRadius: '5px',
  },
  options: {
    maxHeight: 190,
    overflowY: 'auto',
    backgroundColor: 'var(--color-white)',
    color: 'var(--color-black)',
    fontSize: 14,
  },
  option: {
    height: 40,
    '&:hover': {
      backgroundColor: 'rgba(63, 78, 93, 0.05)',
    },
    '&:active': {
      backgroundColor: 'rgba(63, 78, 93, 0.16)',
    },
    transition: 'all .2s',
  },
  active: {
    '& .dropdown-multiple': {},
  },
  disabled: {
    ...disabled,
    color: 'rgba(0, 0, 0, 0.35)',
    '& .dropdown-multiple': {
      opacity: 0.3,
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  multiple: {
    width: 18,
    height: 18,
    color: '#7B7B7B',
    marginLeft: 'auto',
  },
};

export default styles;
