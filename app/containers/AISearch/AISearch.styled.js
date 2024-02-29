import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';
import {
  BG_LIGHT,
  BORDER_PRIMARY_RGB,
  BORDER_RADIUS_L,
  BORDER_RADIUS_M,
  SECONDARY_SPECIAL_2,
  TEXT_PRIMARY,
} from 'style-constants';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

export const styles = {
  searchBlock: {
    background: graphCommunity ? '#161425' : BG_LIGHT,
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
    background: graphCommunity ? '#161425' : BG_LIGHT,
    borderRadius: BORDER_RADIUS_L,
    border: `1px solid ${colors.border || '#fff'}`,
    transition: '0.5s',
    marginBottom: '14px',
    padding: '16px',
  },

  aiPoweredSearchText: {
    '@media (max-width: 576px)': {
      color: colors.sectionHeader || 'rgba(40, 40, 40, 1)',
    },
  },

  additionalInfoItemTitle: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '26px',
    margin: '16px 0 8px',
    color: graphCommunity ? '#E1E1E4' : 'rgba(40, 40, 40, 1)',
  },

  additionalInfoItemContent: {
    fontSize: '16px',
    lineHeight: '24px',
    color: graphCommunity ? '#A7A7AD' : 'rgba(40, 40, 40, 1)',
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
    border: `1px solid ${graphCommunity ? '#3D3D54' : '#C2C6D8'}`,
    borderRadius: `${BORDER_RADIUS_M}`,
    padding: '0 10px 0 60px',
    outline: 'none',
    opacity: 1,
    boxSizing: 'border-box',
    color: graphCommunity ? '#E1E1E4' : 'inherit',
    '@media (min-width: 577px)': {
      height: '64px',
      padding: '0 135px 0 60px',
    },
    ':focus': {
      borderColor: graphCommunity
        ? '#6F4CFF'
        : colors.linkColorTransparent || `rgb(${BORDER_PRIMARY_RGB})`,
      backgroundColor: '#6F4CFF0F',
    },
  },

  searchInputIcon: {
    position: 'absolute',
    top: '13px',
    left: '20px',

    '@media (min-width: 577px)': {
      top: graphCommunity ? '20px' : '17px',
    },
  },

  closeInputIcon: {
    cursor: 'pointer',
    position: 'absolute',
    top: '20px',
    left: '26px',

    '@media (min-width: 577px)': {
      top: graphCommunity ? '19px' : '17px',
      left: '26px',
    },
  },

  searchMainBlock: {
    '@media (min-width: 1366px)': {
      display: 'flex',
    },
  },

  searchResult: {
    background: graphCommunity ? '#161425' : BG_LIGHT,
    borderRadius: BORDER_RADIUS_L,
    border: `1px solid ${colors.border || '#fff'}`,
    transition: '0.5s',
    padding: '16px',
    marginBottom: '15px',

    '@media (min-width: 768px)': {
      padding: '20px 30px',
    },

    '@media (min-width: 1366px)': {
      width: 'calc(100% - 300px)',
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
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
    background: graphCommunity ? '#FFFFFF05' : '#FAFAFA',
    borderRadius: BORDER_RADIUS_L,
    border: `1px solid ${graphCommunity ? '#3D3D54' : '#FAFAFA'}`,
    transition: '0.5s',
    padding: '16px',
    marginBottom: '15px',

    '@media (min-width: 768px)': {
      padding: '20px 30px',
    },

    '@media (min-width: 1366px)': {
      padding: '20px 16px',
      flex: '0 0 300px',
      boxSizing: 'border-box',
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
    },
  },

  sourcesTitle: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '26px',
    color: graphCommunity ? '#E1E1E4' : 'rgba(40, 40, 40, 1)',
    margin: '0 0 12px 12px',
  },

  sourcesList: {
    listStyleType: 'none',
  },

  sourcesListItem: {
    borderRadius: '3px',
    padding: '12px',

    ':hover': {
      background: '#6F4CFF33',

      'p, span': {
        color: '#E1E1E4',
      },
    },
  },

  sourcesListItemTitle: {
    color: graphCommunity ? '#6F4CFF' : `${colors.linkColor || TEXT_PRIMARY}`,
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
    color: graphCommunity ? '#A7A7AD' : '#344054',
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
    color: graphCommunity ? '#A7A7AD' : '#667085',
    fontWeight: 400,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box !important',
    '-webkit-line-clamp': '1',
    '-webkit-box-orient': 'vertical',
    whiteSpace: 'normal',
  },
};
