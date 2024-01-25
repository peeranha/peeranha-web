import { CSSObject } from '@emotion/react';
import { TEXT_SECONDARY, LINK_COLOR } from 'style-constants';
import { isSingleCommunityWebsite, singleCommunityColors } from 'utils/communityManagement';
import { isSuiBlockchain } from 'utils/constants';

const colors = singleCommunityColors();
const isSingleCommunityMode = isSingleCommunityWebsite();
const isSuiFooter = isSuiBlockchain && !isSingleCommunityMode;

export const styles: Record<string, CSSObject> = {
  footer: {
    minHeight: '220px',
    color: colors.footerText || TEXT_SECONDARY,
  },

  footerCommunityMode: {
    minHeight: '150px',
    background: colors.mainBackground || (isSuiFooter ? 'rgb(245,252,255)' : 'rgb(234, 236, 244)'),
    '@media (min-width: 991px)': {
      background: isSuiFooter
        ? colors.footerBackgroundColor || 'rgb(234, 247, 255)'
        : colors.footerBackgroundColor || colors.mainBackground || 'rgb(234, 236, 244)',
    },
  },

  logo: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: isSuiFooter ? 0 : '32px',
    '@media (max-width: 991px)': {
      justifyContent: 'start',
      marginLeft: '16px',
      marginTop: 0,
    },
    img: {
      width: '180px',
      paddingBottom: '32px',
      '@media (max-width: 991px)': {
        marginBottom: '24px',
      },
    },
  },

  infoBlock: {
    display: isSuiFooter ? 'none' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    '@media (max-width: 991px)': {
      justifyContent: 'start',
    },
  },

  content: {
    display: 'flex',
    fontSize: '16px',
    '@media (max-width: 991px)': {
      flexDirection: 'column',
    },
  },

  infoLinks: {
    width: '100%',
    margin: '0 32px',
    color: colors.footerText || '#667085',
    fontWeight: 600,
    '@media (max-width: 991px)': {
      margin: '0 32px 12px 16px',
      fontWeight: 400,
      color: '#667085',
      ':last-child': {
        marginBottom: 0,
      },
    },
    ':hover': {
      color: colors.footerTextHoverColor || LINK_COLOR,
    },
  },

  border: {
    borderBottom: `1px solid ${colors.footerBorderColor || '#c2c6d8'}`,
    margin: isSuiFooter ? '0 0 32px' : '32px',
    '@media (max-width: 991px)': {
      display: isSuiFooter ? 'none' : 'block',
      margin: '28px 16px',
    },
  },

  infoRules: {
    color: colors.footerText || '#667085',
    '@media (max-width: 991px)': {
      marginBottom: '25px',
      color: '#667085',
    },
    '> span': {
      whiteSpace: 'normal',
    },
  },

  contacts: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '32px',
    '@media (max-width: 991px)': {
      flexDirection: 'column-reverse',
      alignItems: 'start',
      paddingBottom: 0,
    },
  },

  contactsLogo: {
    '@media (max-width: 991px)': {
      marginLeft: '16px',
      marginBottom: '25px',
    },
    svg: {
      color: '#667085',
      marginRight: '25px',
      '@media (max-width: 400px)': {
        marginBottom: '12px',
      },
    },
  },

  infoData: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
  },

  info: {
    display: 'flex',
    alignItems: 'start',
    flexDirection: 'column',
    marginLeft: '32px',
    color: colors.footerText || '#667085',
    lineHeight: '24px',
    '@media (max-width: 991px)': {
      marginLeft: '16px',
    },
  },

  infoSingleComm: {
    alignItems: 'center',
    margin: '0 auto',
    '@media (max-width: 991px)': {
      alignItems: 'start',
      flexDirection: 'column',
      marginLeft: '16px',
    },
  },

  infoRulesLink: {
    textDecoration: 'underline !important',
    transition: 'opacity 0.3s ease-out',
    color: 'inherit',
    ':hover': {
      opacity: '0.8',
      color: 'inherit',
    },
  },
  infoPoweredBy: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: TEXT_SECONDARY,
    fontSize: '16px',
    marginBottom: '8px',
    '@media (min-width: 991px)': {
      color: colors.footerText || TEXT_SECONDARY,
    },
    ':hover': {
      color: TEXT_SECONDARY,
    },
    img: {
      width: '90px',
      height: '20px',
      marginLeft: '5px',
      filter: 'grayscale(0)',
      ':hover': {
        filter: 'grayscale(100%)',
      },
    },
  },
  imgLogo: {
    width: '61px',
    height: '15px',
    margin: '5px 25px 0 5px',
  },
  borderBlock: {
    paddingBottom: '30px',
    margin: 0,
    border: 'none',
  },
};
