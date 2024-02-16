import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

export const styles = {
  markdownPreview: {
    'ol li': {
      listStyleType: 'decimal',
    },
    'ul li': {
      listStyleType: 'disc',
    },
    table: {
      wordBreak: 'normal',
      overflowX: 'auto',
    },
    em: {
      font: 'revert',
    },
    iframe: {
      maxWidth: '100%',
    },
    background: graphCommunity ? 'none' : colors.backgroundSpecial || '',
    color: graphCommunity ? '#E1E1E4' : '#282828',
  },
};
