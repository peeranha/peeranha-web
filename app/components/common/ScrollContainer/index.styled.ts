import { graphCommunityColors } from 'utils/communityManagement';
const graphCommunity = graphCommunityColors();

export const styles = {
  root: {
    overflow: 'hidden',
  },
  container: {
    scrollbarWidth: graphCommunity ? 'auto' : 'none',
    overflow: 'auto',
    height: '100%',

    '::-webkit-scrollbar': {
      height: '4px',
      backgroundColor: 'transparent',
    },

    '::-webkit-scrollbar-thumb': {
      backgroundColor: graphCommunity ? '#6F4CFF' : 'rgba(53, 74, 137, 0.25)',
      borderRadius: '4px',
    },
  },
};
