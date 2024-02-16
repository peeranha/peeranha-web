import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

export const styles = {
  basicStyles: {
    width: '30px',
    height: '30px',
    borderRadius: '5px',
    color: graphCommunity ? '#E1E1E4' : 'inherit',
    ':hover': {
      backgroundColor: graphCommunity ? 'rgba(111, 76, 255, 0.2)' : 'rgba(53, 74, 137, 0.05)',
      color: colors.linkColor || '#576FED',
    },
    '@media (min-width: 450px)': {
      width: '40px',
      height: '40px',
    },
  },

  activeStyles: {
    backgroundColor: colors.paginationButtonBackgroundColor || '#F76F60',
    borderRadius: '5px',
    color: colors.paginationButtonTextColor || colors.footerText || '#FFF',
  },

  span: {
    paddingRight: '5px',
  },

  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
