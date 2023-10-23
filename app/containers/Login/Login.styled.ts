import { CSSObject } from '@emotion/react';

export const styles: Record<string, CSSObject> = {
  signIn: {
    fontSize: '24px',
    fontWeight: '600',
    paddingBottom: '4px',
  },

  hintText: {
    fontSize: '16px',
    fontWeight: '400',
    paddingTop: '4px',
  },

  textButton: {
    textDecoration: 'underline',
  },

  divider: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    margin: '20px 0',
  },

  dividerLine: {
    flexGrow: 1,
    backgroundColor: '#E4E7EC',
  },

  dividerText: {
    padding: '0 8px',
    color: '#667085',
    fontWeight: '600',
  },

  walletButton: {
    width: '100%',
    fontWeight: '600',
    backgroundColor: '#ffffff',
    color: '#344054',
    border: '1px solid #C2C6D8',
    fontSize: '16px',
    gap: '14px',
    zIndex: 1000,
    ':hover': {
      svg: {
        path: {
          stroke: `#4BA3FF`,
        },
      },
    },
  },

  wasSentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  letterImage: {
    width: '170px',
    height: '140px',
  },

  wasSentText: {
    fontWeight: 400,
    fontSize: '16px',
    marginBottom: '32px',
  },
};
