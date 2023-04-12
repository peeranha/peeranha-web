import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

export const styled = {
  inputRadio: {
    '::after': {
      content: "''",
      display: 'inline-block',
      minWidth: '22px',
      height: '22px',
      border: '1px solid var(--color-gray-dark)',
      borderRadius: '50%',
      marginRight: '18px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: '50% 50%',
    },
  },

  input: {
    ':checked+div::after': {
      border: `6px solid ${colors.btnColor || 'var(--color-blue)'}`,
    },
    ':checked+div': {
      color: `${colors.btnColor || 'var(--color-blue)'}`,
    },
  },

  secondaryColor: {
    color: 'var(--color-gray-dark)',
  },
};
