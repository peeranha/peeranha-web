import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

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
      background: colors.backgroundSpecial || '',
    },
  },
};
