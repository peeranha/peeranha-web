const disabled = {
  cursor: 'not-allowed',
  '& *': {
    pointerEvents: 'none',
  },
  '& $icon': {
    opacity: 0.3,
  },
};

const styles = {
  root: {
    height: 40,
    padding: '11px 12px 11px 16px',
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-gray-border)',
    fontSize: 14,
    '&:disabled': {
      ...disabled,
      backgroundColor: 'var(--color-bg-disable)',
      borderColor: 'var(--color-lite-gray-divider)',
      '& $placeholder, & $label': {
        color: 'var(--color-black-text-disable)',
      },
      '& $arrow': {
        opacity: 0.3,
      },
    },
    '&:not(:disabled):hover': {
      borderColor: 'var(--color-gray-border-hover)',
      boxShadow: '0 0 0 1px var(--color-gray-border-hover)',
    },
    '&:not(:disabled):focus': {
      borderColor: 'var(--color-orange)',
      boxShadow: '0 0 0 1px var(--color-orange)',
    },
  },
  icon: {
    color: 'var(--color-gray-text)',
    width: 24,
    height: 24,
  },
  arrow: {
    padding: '0px 4px',
    marginLeft: 'auto',
    color: 'var(--color-gray-text)',
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
    color: 'var(--color-gray-text)',
  },
  label: {
    color: 'var(--color-black-text)',
  },
  optionsWrap: {
    boxShadow: 'var(--shadow-8dp)',
  },
  options: {
    maxHeight: 190,
    overflowY: 'auto',
    backgroundColor: 'var(--color-white)',
    color: 'var(--color-black-text)',
    fontSize: 14,
  },
  option: {
    height: 40,
    '&:hover': {
      backgroundColor: 'var(--color-bg-hover)',
    },
    '&:active': {
      backgroundColor: 'var(--color-bg-pressed)',
    },
    transition: 'all .2s',
  },
  active: {
    color: 'var(--color-orange)',
    '& $multiple': {
      color: 'var(--color-orange)',
    },
  },
  disabled: {
    ...disabled,
    color: 'var(--color-black-text-disable)',
    '& $multiple': {
      opacity: 0.3,
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  multiple: {
    width: 18,
    height: 18,
    color: 'var(--color-icons)',
    marginLeft: 'auto',
  },
};

export default styles;
