import { BORDER_SECONDARY, TEXT_LIGHT } from 'style-constants';
import {
  singleCommunityColors,
  singleCommunityFonts,
  graphCommunityColors,
} from 'utils/communityManagement';

const colors = singleCommunityColors();
const { main } = singleCommunityFonts();
const graphCommunity = graphCommunityColors();

export const styles = {
  menuItem: {
    fontFamily: main || 'Source Sans Pro, serif',
    fontStyle: 'normal',
    fontWeight: 400,
  },

  searchLabel: {
    background: colors.btnColor || 'rgba(87, 111, 237, 1)',
    color: TEXT_LIGHT,
    minWidth: '39px',
    height: graphCommunity ? '24px' : '20px',
    borderRadius: graphCommunity ? '20px' : '3px',
    fontWeight: 600,
    fontSize: graphCommunity ? '12px' : '14px',
    lineHeight: graphCommunity ? '20px' : '16px',
    padding: graphCommunity ? '2px 12px 0 12px' : '1.5px 6px 2.5px 6px',
    gap: '10px',
    marginLeft: '8px',
    whiteSpace: 'nowrap',
  },

  menuSectionTitle: {
    textTransform: 'uppercase',
    fontSize: '14px',
    lineHeight: '18px',
    height: 30,
    span: {
      'text-transform': 'uppercase',
    },
    color: graphCommunity ? '#807F89' : colors.sectionHeader || 'rgba(123, 123, 123, 1)',

    '&:hover .dropdown-documentation': {
      display: 'block',
    },
    '@media only screen and (min-width: 991px)': {
      marginTop: '28px',
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
    color: graphCommunity ? '#E1E1E4' : 'black',
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
      background: graphCommunity
        ? 'none'
        : colors.navMenuBackgroundColor || 'rgba(123, 123, 123, 0.1)',
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

  logInButtonContainer: {
    display: 'flex',
    alignItems: 'center',
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
