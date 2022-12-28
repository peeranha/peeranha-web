export const styles = {
  draftItem: {
    fontFamily: 'Source Sans Pro, serif',
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
      color: '#576fed',
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
