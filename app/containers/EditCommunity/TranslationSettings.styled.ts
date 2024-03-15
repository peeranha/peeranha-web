import { TEXT_PRIMARY } from 'style-constants';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

export const styles = {
  collapsibleContainer: {
    background: graphCommunity
      ? '#161425'
      : 'linear-gradient(0deg, rgba(165, 188, 255, 0.1), rgba(165, 188, 255, 0.1)), #FFFFFF',
    borderRadius: '5px',
    color: `${colors.linkColor || TEXT_PRIMARY}`,
    lineHeight: '23px',
    border: graphCommunity ? '1px solid #3D3D54' : 'none',
  },

  containerWithContent: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },

  collapsible: {
    borderBottom: graphCommunity ? 'none' : '1px solid rgba(194, 198, 216, 1)',

    '@media only screen and (min-width: 768px)': {
      fontSize: '20px',
      lineHeight: '25px',
    },
  },

  content: {
    background: graphCommunity
      ? '#161425'
      : 'linear-gradient(0deg, rgba(165, 188, 255, 0.1), rgba(165, 188, 255, 0.1)), #FFFFFF',
    border: graphCommunity ? '1px solid #3D3D54' : 'none',
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px',
  },

  showContent: {
    display: 'block',
  },

  arrow: {
    color: colors.linkColor || TEXT_PRIMARY,
    width: '18px',
    height: '18px',
    transition: 'transform 0.5s',
    margin: '0 0 0 16px',
  },

  toggleText: {
    lineHeight: '20px',
    color: graphCommunity ? '#E1E1E4' : 'rgba(40, 40, 40, 1)',

    '@media only screen and (min-width: 371px)': {
      fontSize: '16px',
    },
  },

  tooltip: {
    background: graphCommunity ? '#161425' : 'rgb(255,255,255)',
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0.3px',
    width: '264px',
    filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))',
    color: graphCommunity ? '#E1E1E4' : 'inherit',
    border: graphCommunity ? '1px solid #3D3D54' : 'none',
    ':after': {
      content: '""',
      position: 'absolute',
      top: '100%',
      left: '50%',
      marginLeft: '-3px',
      width: 0,
      height: 0,
      borderTop: 'solid 5px rgb(255,255,255)',
      borderLeft: 'solid 7px transparent',
      borderRight: 'solid 7px transparent',
    },
  },

  deleteButton: {
    color: colors.btnColor || TEXT_PRIMARY,
    lineHeight: '20px',
  },
};
