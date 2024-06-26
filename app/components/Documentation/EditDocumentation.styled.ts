import { singleCommunityDocumentation, graphCommunityColors } from 'utils/communityManagement';

const documentationColors = singleCommunityDocumentation();
const graphCommunity = graphCommunityColors();

export const styled = {
  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.4)',
  },

  container: {
    color: graphCommunity ? '#E1E1E4' : '#282828',
    position: 'fixed',
    top: 0,
    height: '100vh',
    zIndex: 101,
    background: graphCommunity ? '#161425' : 'var(--color-white)',
    boxShadow: `0px 2px 2px ${graphCommunity ? '#3D3D54' : 'rgba(0, 0, 0, 0.1)'}`,
  },

  main: {
    height: '100%',
    gridTemplateColumns: '262px 1fr 262px',
    boxShadow: `0px 2px 2px ${graphCommunity ? '#3D3D54' : 'rgba(0, 0, 0, 0.1)'}`,
  },

  leftSection: {
    background: graphCommunity ? '#161425' : '#FAFAFA',
    height: 'calc(100% - 72px)',
    overflow: 'auto',
  },

  centerSection: { overflow: 'auto', height: 'calc(100% - 72px)' },

  rightSection: {
    background: graphCommunity ? '#161425' : '#FAFAFA',
    height: 'calc(100% - 72px)',
    overflow: 'auto',
  },

  scroll: {
    paddingRight: '6px',
    overflow: 'hidden',

    ':hover': {
      overflowY: 'scroll',
      paddingRight: 0,
    },

    '::-webkit-scrollbar': {
      width: '6px',
    },

    '::-webkit-scrollbar-thumb': {
      background: 'rgba(53, 74, 137, 0.25)',
      borderRadius: '10px',
    },

    '::-webkit-scrollbar-thumb:hover': {
      background: 'rgba(53, 74, 137, 0.5)',
    },
  },

  cancelButton: {
    background: graphCommunity ? 'none' : documentationColors.publishBackground || 'white',
    color: documentationColors.publishText || 'var(--color-button-secondary)',
    borderColor: documentationColors.publishText || 'var(--color-button-secondary)',
    '&:hover': {
      background: documentationColors.publishBackgroundHover || 'var(--color-button-secondary)',
      color: documentationColors.publishTextHover || 'var(--color-white)',
      '.icon': {
        stroke: documentationColors.publishTextHover || 'var(--color-white)',
      },
    },
  },
};
