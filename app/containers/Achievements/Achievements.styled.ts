import { singleCommunityColors } from 'utils/communityManagement';
import {
  TEXT_DARK,
  BORDER_PRIMARY,
  TEXT_LIGHT,
  APP_FONT,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  BG_SECONDARY_SPECIAL_4,
} from 'style-constants';

const colors = singleCommunityColors();

export const styles = {
  base: {
    background: TEXT_LIGHT,
    marginBottom: '15px',
    padding: '20px 30px',
    flexGrow: 1,
    overflow: 'hidden',
    borderRadius: '5px',
    boxShadow: `0 2px 2px 0 ${colors.baseShadow || 'rgba(40, 40, 40, 0.1)'}`,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    transition: '0.5s',
    position: 'relative',
    ':hover': {
      boxShadow: `5px 5px 5px ${colors.baseShadow || 'rgba(40, 40, 40, 0.1)'}`,
    },
  },
  h3: {
    color: TEXT_DARK,
    fontWeight: 600,
    fontSize: '38px',
    lineHeight: '48px',
    display: 'flex',
    alignItems: 'center',
    fontFamily: APP_FONT,
    letterSpacing: APP_FONT,
    marginBottom: '12px',
    '@media only screen and (max-width: 576px)': {
      fontSize: '28px',
      lineHeight: '28px',
    },
  },

  db: {
    display: 'block',
  },

  achievements: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 12,
    marginTop: 10,

    '@media (min-width: 768px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },

    '@media (min-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    '@media (min-width: 1366px)': {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
  progressBar: {
    position: 'relative',
    height: 4,
    background: 'rgba(53, 74, 137, 0.15)',
    borderRadius: '4px',
    width: '60%',

    '@media (min-width: 992px)': {
      height: 8,
    },
  },
  progressBarLine: {
    position: 'absolute',
    height: 4,
    background: colors.textColor || TEXT_PRIMARY,
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
    '@media (min-width: 992px)': {
      height: 8,
    },
  },

  progressBarLineFull: {
    borderTopRightRadius: '4px',
    borderBottomRightRadius: '4px',
  },

  textEllipsis: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    a: {
      color: colors.btnColor || BORDER_PRIMARY,
    },
  },
  limitedLabel: {
    position: 'absolute',
    fontSize: '14px',
    fontWeight: 600,
    padding: '0 8px',
    top: 4,
    right: 4,
    background:
      'linear-gradient(82.23deg, rgba(255, 255, 255, 0) 97.33%, rgba(255, 255, 255, 0.813625) 136.6%, rgba(255, 255, 255, 0) 175.67%), linear-gradient(220.98deg, #FFE069 23.25%, #AA6507 132.4%)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    borderRadius: '70px',
    lineHeight: '18px',
    color: TEXT_LIGHT,

    '@media (min-width: 1024px)': {
      top: 8,
      right: 8,
    },
  },

  communityLabel: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    height: 24,
    width: 24,
    top: 4,
    left: 4,
    background: TEXT_LIGHT,
    borderRadius: '20px',
    '@media (min-width: 1024px)': {
      top: 8,
      left: 8,
      height: 32,
      width: 32,
      transition: 'width .3s ease-out',
    },
    img: {
      width: 24,
      height: 24,
      '@media (min-width: 1024px)': {
        width: 32,
        height: 32,
      },
    },
    div: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '18px',
      paddingLeft: '8px',
      paddingRight: '12px',
    },
  },

  link: {
    marginTop: '8px',
    fontSize: '14px',
    lineHeight: '18px',
    color: TEXT_SECONDARY,
    fontStyle: 'italic',
  },

  nft: {
    position: 'relative',
    padding: '12px',
    background: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '5px',
    minWidth: 148,
    '@media (min-width: 1024px)': {
      padding: 16,
      minWidth: 256,
    },
  },

  nftBG: {
    background: TEXT_LIGHT,
    boxShadow: '0px 2px 4px rgba(7, 16, 64, 0.1)',
  },

  nftCard: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    padding: 13,
    border: '3px solid #A5BCFF',
    boxShadow: '0px 10px 20px rgba(24, 39, 79, 0.1)',
    borderRadius: '5px',
    background: TEXT_LIGHT,
  },

  nftContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
    width: '100%',
    background: BG_SECONDARY_SPECIAL_4,
    borderRadius: '5px',
  },

  nftContainerBG: {
    background: 'rgba(249, 249, 249, 0.5)',
  },

  nftImg: {
    width: '100%',
    height: 'auto',
  },

  achievementCard: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    bottom: 8,
    '@media (min-width: 992px)': {
      bottom: 16,
    },
  },

  achievementContainer: {
    paddingTop: '12px',
    color: TEXT_DARK,
    '@media (min-width: 1024px)': {
      paddingTop: 16,
    },
  },

  achievementTitle: {
    fontWeight: 600,
    fontSize: '12px',
    overflow: 'hidden',
    lineHeight: '15px',
    '@media (min-width: 1024px)': {
      fontSize: 16,
      lineHeight: '20px',
    },
  },

  achievementTitleHover: {
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '1',
  },

  achievementCount: {
    marginTop: '4px',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '1',
    fontSize: 10,
    lineHeight: '13px',
    '@media (min-width: 1024px)': {
      marginTop: 8,
      fontSize: 14,
      lineHeight: '18px',
    },
  },
};
