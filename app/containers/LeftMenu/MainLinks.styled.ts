import P from 'components/P';
import { BORDER_SECONDARY } from 'style-constants';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

export const styles = {
  menuItem: {
    fontFamily: 'Source Sans Pro, serif',
    fontStyle: 'normal',
    fontWeight: 400,
  },

  menuSectionTitle: {
    textTransform: 'uppercase',
    fontSize: '14px',
    lineHeight: '18px',
    height: 30,
    span: {
      'text-transform': 'uppercase',
    },
    color: colors.sectionHeader || '#7B7B7B',

    '&:hover .dropdown-documentation': {
      display: 'block',
    },
  },

  divider: {
    height: '1px',
    background: colors.secondaryAdditional || BORDER_SECONDARY,
    margin: '28px 16px 0 16px',
  },

  dropdownMenu: {
    left: '0px',
    fontWeight: 'normal',
    fontSize: '16px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.25)',
    borderRadius: '5px',
    zIndex: 1,
  },

  dropdownMenuItem: {
    color: 'black',
    fontSize: '14px',
    padding: '16px',
    textDecoration: 'none',
    textTransform: 'initial',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    maxWidth: '310px',

    ':hover': {
      boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
      background: 'rgba(123, 123, 123, 0.1);',
      borderRadius: '5px',
    },
    svg: {
      marginRight: '8px',
    },
  },

  changeLocale: {
    display: 'none',
    '@media only screen and (max-width: 991px)': {
      display: 'block',
      margin: '28px 0',
      paddingLeft: '16px',
    },
  },

  dividerLocale: {
    height: '1px',
    background: colors.secondaryAdditional || BORDER_SECONDARY,
    margin: '28px 16px',
    display: 'none',
    '@media (max-width: 991px)': {
      display: 'block',
    },
  },

  dividerLinks: {
    height: '1px',
    background: colors.secondaryAdditional || BORDER_SECONDARY,
    margin: '28px 16px',
    display: 'none',
    '@media (max-width: 991px)': {
      display: 'block',
    },
  },

  footer: {
    display: 'none',
    '@media (max-width: 991px)': {
      display: 'block',
    },
  },

  logInButton: {
    margin: '28px 16px 0 16px',
  },

  mb28: {
    marginBottom: '28px',
  },

  mb0: {
    marginBottom: 0,
  },
};
