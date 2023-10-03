import { singleCommunityColors } from 'utils/communityManagement';
import {
  BG_LIGHT,
  BORDER_PRIMARY_RGB,
  BORDER_RADIUS_L,
  SECONDARY_SPECIAL_2,
  TEXT_PRIMARY,
} from 'style-constants';

const colors = singleCommunityColors();

export const styles = {
  searchBlock: {
    background: BG_LIGHT,
    borderRadius: BORDER_RADIUS_L,
    boxShadow: `0 2px 2px 0 ${colors.baseShadow || SECONDARY_SPECIAL_2}`,
    border: `1px solid ${colors.border || '#fff'}`,
    transition: '0.5s',
    padding: '16px',

    ':hover': {
      boxShadow: `5px 5px 5px ${colors.baseShadow || 'rgba(40, 40, 40, 0.1)'}`,
    },

    '@media (min-width: 577px)': {
      display: 'none',
    },
  },

  subTitle: {
    fontWeight: 600,
    fontSize: '22px',
    lineHeight: '28px',
    margin: '40px 0 23px',
    color: colors.sectionHeader || 'rgba(40, 40, 40, 1)',

    '@media (min-width: 768px)': {
      fontSize: '30px',
      lineHeight: '38px',
    },
  },

  additionalInfo: {
    display: 'flex',
    flexDirection: 'column',

    '@media (min-width: 768px)': {
      flexDirection: 'row',
      gap: '14px',
    },
  },

  additionalInfoItem: {
    flex: '1 1 0px',
    background: BG_LIGHT,
    borderRadius: BORDER_RADIUS_L,
    boxShadow: `0 2px 2px 0 ${colors.baseShadow || SECONDARY_SPECIAL_2}`,
    border: `1px solid ${colors.border || '#fff'}`,
    transition: '0.5s',
    marginBottom: '14px',
    padding: '16px',

    ':hover': {
      boxShadow: `5px 5px 5px ${colors.baseShadow || 'rgba(40, 40, 40, 0.1)'}`,
    },
  },

  additionalInfoItemTitle: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '26px',
    margin: '16px 0 8px',
    color: 'rgba(40, 40, 40, 1)',
  },

  additionalInfoItemContent: {
    fontSize: '16px',
    lineHeight: '24px',
    color: 'rgba(40, 40, 40, 1)',
  },

  searchField: {
    position: 'relative',
    width: '100%',
  },

  headerSearchField: {
    marginTop: '25px',
    display: 'none',
    position: 'relative',
    width: '100%',

    '@media (min-width: 577px)': {
      display: 'block',
    },
  },

  searchInput: {
    width: '100%',
    height: '56px',
    border: `1px solid #C2C6D8`,
    borderRadius: '3px',
    padding: '0 10px 0 60px',
    outline: 'none',
    opacity: 1,
    boxSizing: 'border-box',

    '@media (min-width: 577px)': {
      height: '64px',
      padding: '0 135px 0 60px',
    },
    ':focus': {
      borderColor: colors.linkColorTransparent || `rgb(${BORDER_PRIMARY_RGB})`,
      boxShadow: `0 0 0 3px ${colors.linkColorTransparent || `rgba(${BORDER_PRIMARY_RGB}, 0.40)`}`,
    },
  },

  searchInputIcon: {
    position: 'absolute',
    top: '13px',
    left: '20px',

    '@media (min-width: 577px)': {
      top: '17px',
    },
  },

  closeInputIcon: {
    cursor: 'pointer',
    position: 'absolute',
    top: '20px',
    left: '26px',

    '@media (min-width: 577px)': {
      top: '23px',
      left: '26px',
    },
  },

  searchMainBlock: {
    '@media (min-width: 1366px)': {
      display: 'flex',
    },
  },

  searchResult: {
    background: BG_LIGHT,
    borderRadius: BORDER_RADIUS_L,
    boxShadow: `0 2px 2px 0 ${colors.baseShadow || SECONDARY_SPECIAL_2}`,
    border: `1px solid ${colors.border || '#fff'}`,
    transition: '0.5s',
    padding: '16px',
    marginBottom: '15px',

    ':hover': {
      boxShadow: `5px 5px 5px ${colors.baseShadow || 'rgba(40, 40, 40, 0.1)'}`,
    },

    '@media (min-width: 768px)': {
      padding: '20px 30px',
    },

    '@media (min-width: 1366px)': {
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,

      ':hover': {
        boxShadow: `0 2px 2px 0 ${colors.baseShadow || SECONDARY_SPECIAL_2}`,
      },
    },
  },

  searchResultTitle: {
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '26px',
    marginBottom: '16px',
    color: `${colors.linkColor || TEXT_PRIMARY}`,

    '@media (min-width: 768px)': {
      fontSize: '24px',
      lineHeight: '26px',
    },

    '@media (min-width: 1366px)': {
      marginBottom: '25px',
    },
  },

  sources: {
    background: '#FAFAFA',
    borderRadius: BORDER_RADIUS_L,
    boxShadow: `0 2px 2px 0 ${colors.baseShadow || SECONDARY_SPECIAL_2}`,
    border: `1px solid #FAFAFA`,
    transition: '0.5s',
    padding: '16px',
    marginBottom: '15px',

    ':hover': {
      boxShadow: `5px 5px 5px ${colors.baseShadow || 'rgba(40, 40, 40, 0.1)'}`,
    },

    '@media (min-width: 768px)': {
      padding: '20px 30px',
    },

    '@media (min-width: 1366px)': {
      padding: '20px 16px',
      flex: '0 0 300px',
      boxSizing: 'border-box',
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      ':hover': {
        boxShadow: `0 2px 2px 0 ${colors.baseShadow || SECONDARY_SPECIAL_2}`,
      },
    },
  },

  sourcesTitle: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '26px',
    color: 'rgba(40, 40, 40, 1)',
    margin: '0 0 12px 12px',
  },

  sourcesList: {
    listStyleType: 'none',
  },

  sourcesListItem: {
    borderRadius: '3px',
    padding: '12px',

    ':hover': {
      background: 'rgba(173, 186, 255, 0.2)',
    },
  },

  sourcesListItemTitle: {
    color: `${colors.linkColor || TEXT_PRIMARY}`,
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: 400,
    marginBottom: '8px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box !important',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    whiteSpace: 'normal',
  },

  sourcesListItemText: {
    fontSize: '14px',
    lineHeight: '18px',
    color: '#344054',
    marginBottom: '8px',
    fontWeight: 400,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box !important',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',
    whiteSpace: 'normal',
  },

  sourcesListItemLink: {
    fontSize: '14px',
    lineHeight: '18px',
    color: '#667085',
    fontWeight: 400,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box !important',
    '-webkit-line-clamp': '1',
    '-webkit-box-orient': 'vertical',
    whiteSpace: 'normal',
  },
};
