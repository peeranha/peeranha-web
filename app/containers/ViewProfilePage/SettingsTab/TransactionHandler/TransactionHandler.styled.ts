import { CSSObject } from '@emotion/react';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

export const styles: Record<string, CSSObject> = {
  inputRadio: {
    '::before': {
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

  recommended: {
    '::after': {
      display: 'inline',
      position: 'relative',
      width: 'max-content',
      height: '15px',
      fontSize: '10px',
      background: `${colors.btnColor || 'var(--color-blue)'}`,
      color: 'var(--color-white)',
      borderRadius: '14px',
      marginLeft: '15px',
      padding: '3px 5px 3px 5px',
    },
  },

  input: {
    ':checked+div::before': {
      border: `6px solid ${colors.btnColor || 'var(--color-blue)'}`,
    },
  },

  secondaryColor: {
    color: 'var(--color-gray-dark)',
  },
};
