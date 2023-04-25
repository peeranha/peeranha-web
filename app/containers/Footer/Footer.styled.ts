import { TEXT_SECONDARY } from 'style-constants';

export const styles = {
  footer: {
    minHeight: '220px',
    color: TEXT_SECONDARY,
  },

  footerCommunityMode: {
    minHeight: '150px',
    '@media (max-width: 991px)': {
      paddingBottom: '20px',
    },
  },

  logo: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '32px',
    '@media (max-width: 991px)': {
      justifyContent: 'start',
      marginLeft: '32px',
    },
    img: {
      width: '180px',
      marginBottom: '20px',
    },
  },

  infoBlock: {
    display: 'flex',
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
    color: '#667085',
    fontWeight: 600,
    '@media (max-width: 991px)': {
      marginBottom: '12px',
    },
  },

  border: {
    borderBottom: '1px solid #c2c6d8',
    margin: '32px',
  },

  infoRules: {
    '@media (max-width: 991px)': {
      marginBottom: '25px',
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
    },
  },

  contactsLogo: {
    '@media (max-width: 991px)': {
      marginLeft: '32px',
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
  },

  infoSingleComm: {
    alignItems: 'center',
    margin: '0 auto',
    '@media (max-width: 991px)': {
      alignItems: 'start',
      flexDirection: 'column',
      marginLeft: '32px',
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
};
