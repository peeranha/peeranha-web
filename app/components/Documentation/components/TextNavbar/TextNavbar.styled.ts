import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

export const styles = {
  wrapper: {
    background: 'rgb(250,250,250,1)',
    minWidth: '208px',

    '@media (min-width: 720px)': {
      display: 'block',
    },
  },

  navbarTitle: {
    span: {
      'text-transform': 'uppercase',
    },
    color: 'rgb(123,123,123)',
  },

  navbarItem: {
    fontFamily: 'Source Sans Pro, serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
    color: '#576FED',
  },

  navbarItemHover: {
    ':hover': {
      color: colors.linkColor || '#F76F60',
    },
  },
};
