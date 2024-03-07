import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

export const styles = {
  markdownPreview: {
    fontFamily: graphCommunity ? 'Euclid Circular A' : 'Source Sans Pro',
    fontWeight: graphCommunity ? 400 : '',
    fontSize: graphCommunity ? '16px' : '',
    lineHeight: graphCommunity ? '24px' : '',

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
