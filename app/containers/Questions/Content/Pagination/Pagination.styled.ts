import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

export const styles = {
  basicStyles: {
    width: '30px',
    height: '30px',
    borderRadius: '5px',
    ':hover': {
      backgroundColor: 'rgba(53, 74, 137, 0.05)',
      color: colors.linkColor || '#576FED',
    },
    '@media (min-width: 450px)': {
      width: '40px',
      height: '40px',
    },
  },

  activeStyles: {
    backgroundColor: colors.footerBG || '#F76F60',
    borderRadius: '5px',
    color: colors.footerText || '#FFF',
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
