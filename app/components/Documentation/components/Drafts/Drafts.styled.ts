import { singleCommunityDocumentation } from 'utils/communityManagement';
import { APP_FONT } from 'style-constants';

const documentationColors = singleCommunityDocumentation();

export const styles = {
  draftItem: {
    fontFamily: APP_FONT || 'Source Sans Pro, serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
  },

  draftsSectionTitle: {
    height: 30,
    span: {
      'text-transform': 'uppercase',
    },
    color: '#7B7B7B',
  },

  draftItemHover: {
    ':hover': {
      color: documentationColors.linkColor || '#576fed',
    },
  },

  draftItemTitle: {
    textOverflow: 'ellipsis',
    display: '-webkit-box !important',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    whiteSpace: 'normal',
  },
};
