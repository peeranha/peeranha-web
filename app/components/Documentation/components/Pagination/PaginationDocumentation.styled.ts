import { singleCommunityDocumentation } from 'utils/communityManagement';
import { TEXT_SECONDARY, TEXT_LIGHT } from 'style-constants';
import { Position } from 'components/common/Popover/Popover.stories';
const documentationColors = singleCommunityDocumentation();

export const styled = {
  viewBlock: {
    display: 'none',
  },
  paginationBlock: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    margin: '32px 0 16px 0',
    flexWrap: 'wrap,',
  },

  paginationButton: {
    width: '350px',
    height: '65px',
    margin: '0 12px 12px 12px',
    border: '1px solid rgba(53, 74, 137, 0.15);',
    ':hover': {
      background: 'rgba(53, 74, 137, 0.05)',
    },
  },

  paginationButtonBlock: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0 12px',
    svg: {
      color: TEXT_SECONDARY,
    },
  },

  paginationButtonText: {
    display: 'flex',
    flexDirection: 'column',

    marginRight: '16px',
    'div:first-child': {
      color: TEXT_SECONDARY,
      marginBottom: '4px',
      fontSize: '14px',
    },
    'div:nth-child(2)': {
      fontSize: '18px',
      fontWeight: 600,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box !important',
      '-webkit-line-clamp': '1',
      '-webkit-box-orient': 'vertical',
    },
  },

  paginationButtonBlockMobile: {
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: '60px',
    border: '1px solid rgba(53, 74, 137, 0.15)',
    backgroundColor: TEXT_LIGHT,
    '>div': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '>div': {
        width: '80%',
      },
    },
  },

  paginationButtonTextMobile: {
    marginLeft: '8px',
    'div:first-child': {
      color: TEXT_SECONDARY,
    },
    'div:nth-child(2)': {
      fontSize: '16px',
      fontWeight: 600,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      marginTop: '4px',
      display: '-webkit-box !important',
      '-webkit-line-clamp': '1',
      '-webkit-box-orient': 'vertical',
    },
  },

  arrowMobile: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '60px',
    flexBasis: '20%',
    'svg:first-child': {
      transform: 'rotate(360deg)',
    },
    'svg:nth-child(2)': {
      transform: 'rotate(180deg)',
    },
  },

  cancelButton: {
    background: documentationColors.publishBackground || 'white',
    color: documentationColors.publishText || 'var(--color-button-secondary)',
    borderColor:
      documentationColors.publishText || 'var(--color-button-secondary)',
    '&:hover': {
      background:
        documentationColors.publishBackgroundHover ||
        'var(--color-button-secondary)',
      color: documentationColors.publishTextHover || 'var(--color-white)',
      '.icon': {
        stroke: documentationColors.publishTextHover || 'var(--color-white)',
      },
    },
  },
};
