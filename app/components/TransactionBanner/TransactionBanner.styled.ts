import { CSSObject } from '@emotion/react';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

export const styles: Record<string, CSSObject> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    border: colors.linkColor ? `1px solid #3D3D54` : '1px solid #A5BCFF',
    borderRadius: '5px',
    background: '#161425',
  },

  mainBlock: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },

  mainBlockTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '4px',
  },

  mainBlockTitle: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#E1E1E4' || '#576FED',
    marginRight: '8px',
  },

  mainBlockText: {
    fontSize: '14px',
    lineHeight: '20px',
    color: '#A7A7AD',
    marginBottom: '8px',
  },

  loader: {
    width: '100%',
    height: '8px',
    display: 'inline-block',
    position: 'relative',
    background: '#354A891A',
    overflow: 'hidden',
    borderRadius: '8px',

    ':after': {
      content: '""',
      width: '20%',
      height: '8px',
      background: '#6f4cff' || '#7699FF',
      position: 'absolute',
      top: 0,
      left: 0,
      borderRadius: '8px',
      boxSizing: 'border-box',
      animation: 'animloader 2s linear infinite',
    },

    '@keyframes animloader': {
      '0%': {
        left: 0,
        transform: 'translateX(-100%)',
      },
      '100%': {
        left: '100%',
        transform: 'translateX(0%)',
      },
    },
  },
};
