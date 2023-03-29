import { TEXT_PRIMARY } from 'style-constants';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

export const styles = {
  container: {
    '> div': {
      width: '100%',

      '@media only screen and (min-width: 664px)': {
        width: '550px',
      },

      '@media only screen and (min-width: 769px)': {
        width: '100%',
      },

      '@media only screen and (min-width: 814px)': {
        width: '550px',
      },

      '@media only screen and (min-width: 992px)': {
        width: '100%',
      },

      '@media only screen and (min-width: 1090px)': {
        width: '550px',
      },
    },
  },

  collapsible: {
    backgroundColor: '#eee',
    color: '#444',
    cursor: 'pointer',
    padding: '18px',
    width: '100%',
    border: 'none',
    textAlign: 'left',
    outline: 'none',
    fontSize: '15px',
  },

  content: {
    padding: '0 18px',
    display: 'none',
    overflow: 'hidden',
    backgroundColor: '#f1f1f1',
  },

  showContent: {
    display: 'block',
  },

  option: {
    padding: '12px 24px',
    color: '#282828',

    ':hover': {
      color: `${colors.linkColor || TEXT_PRIMARY}`,
    },
  },
};
