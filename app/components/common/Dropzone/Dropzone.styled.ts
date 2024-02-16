import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

export const styles = {
  fileDropzone: {
    background: graphCommunity
      ? '#161425'
      : colors.newPostMediaBackgroundColor || 'rgb(250, 250, 250)',
    border: '1px dashed rgb(220, 220, 220)',
    borderRadius: '5px',
  },

  plusIcon: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    background: graphCommunity ? '#6F4CFF' : 'rgba(118, 153, 255, 0.2)',
    border: `1px solid ${graphCommunity ? '#E1E1E4' : 'rgb(165, 188, 255)'}`,
    margin: '18px 13px',
  },

  dragText: {
    '@media (min-width: 1024px)': {
      display: 'inline',
      color: graphCommunity ? '#E1E1E4' : 'rgba(0, 0, 0, 0.87)',
      lineHeight: '18px',
    },
  },

  attachOr: {
    lineHeight: '14px',
    color: graphCommunity ? '#E1E1E4' : 'rgba(0, 0, 0, 0.54)',

    '@media (min-width: 1024px)': {
      display: 'inline',
    },
  },

  attachText: {
    display: 'inline-block',
    lineHeight: '14px',
    color: graphCommunity ? '#E1E1E4' : 'rgba(0, 0, 0, 0.54)',

    ':after': {
      content: '" "',
      whiteSpace: 'pre',
    },

    ':first-letter': {
      textTransform: 'capitalize',
    },

    '@media (min-width: 1024px)': {
      ':first-letter': {
        textTransform: 'none',
      },
    },
  },

  attachWord: {
    color: graphCommunity ? '#6F4CFF' : colors.linkColor || 'rgb(87, 111, 237)',
  },

  restrictionsText: {
    color: 'rgb(123, 123, 123)',
    lineHeight: '18px',
  },
};
