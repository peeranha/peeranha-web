export const styles = {
  filePreviewContainer: {
    width: '108px',
    height: '62px',

    '@media (min-width: 1024px)': {
      width: '126px',
      height: '72px',
    },
  },

  backgroundHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },

  topRightIconWrapper: {
    top: '3px',
    right: '5px',
    zIndex: 2,
  },

  centerIconsContainer: {
    margin: '0 auto',
  },

  centerIcon: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    background: 'rgb(255,255,255)',

    '@media (min-width: 1024px)': {
      display: 'none',
    },
  },

  showOnHover: {
    display: 'flex !important',
  },

  leftCenterIcon: {
    '@media (min-width: 1024px)': {
      marginRight: '24px',
      display: 'none',
    },
  },

  failedUploadIcon: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    border: '2px solid rgba(118, 153, 255, 0.2)',
  },

  reloadIcon: {
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    border: '1px solid rgb(87, 111, 237)',
  },
};
