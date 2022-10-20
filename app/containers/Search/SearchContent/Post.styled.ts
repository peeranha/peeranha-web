import {
  BG_SUCCESS_LIGHT,
  BG_TRANSPARENT,
  TEXT_DARK,
  TEXT_SECONDARY,
  BORDER_PRIMARY,
} from '../../../style-constants';
import { singleCommunityColors } from '../../../utils/communityManagement';

const colors = singleCommunityColors();

export const styles = {
  post: {
    background: 'rgb(255,255,255)',
    boxShadow: '0px 2px 4px rgba(7, 16, 64, 0.1)',
    borderRadius: '5px',

    ':hover': {
      outline: '3px solid rgb(165, 188, 255)',
      boxShadow: '0px 20px 20px rgba(24, 39, 79, 0.1)',
    },
  },

  container: {
    '@media only screen and (min-width: 1024px)': {
      margin: '24px 32px',
    },
  },

  title: {
    color: TEXT_DARK,
    lineHeight: '23px',

    ':hover': {
      color: TEXT_DARK,
    },

    '@media only screen and (min-width: 1024px)': {
      fontSize: '24px',
      lineHeight: '30px',
      paddingLeft: '7px',
    },
  },

  mainInfo: {
    '@media only screen and (min-width: 1024px)': {
      paddingLeft: '50px',
    },
  },

  creationTime: {
    lineHeight: '15px',
    color: TEXT_SECONDARY,

    '@media only screen and (min-width: 768px)': {
      fontSize: '14px',
      lineHeight: '18px',
    },
  },

  content: {
    color: TEXT_SECONDARY,
    lineHeight: '21px',
    textOverflow: 'ellipsis',
    display: '-webkit-box !important',
    '-webkit-line-clamp': '5',
    '-webkit-box-orient': 'vertical',
    whiteSpace: 'normal',
  },

  tagsAndCommunity: {
    '@media only screen and (min-width: 768px)': {
      display: 'flex',
      alignItems: 'center',
    },
  },

  communityAvatar: {
    width: '24px',
    height: '24px',
  },

  communityName: {
    color: TEXT_DARK,
    lineHeight: '18px',
  },

  additionalInfo: {
    '@media only screen and (min-width: 1024px)': {
      marginBottom: '0px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      paddingLeft: '50px',
    },
  },

  tag: {
    color: BORDER_PRIMARY,
    lineHeight: '18px',
    border: `1px solid ${BORDER_PRIMARY}`,
    borderRadius: '2px',
    padding: '3px 9px',

    '@media only screen and (min-width: 768px)': {
      marginBottom: '0',
    },
  },

  count: {
    color: colors.linkColor || TEXT_DARK,
  },

  bestReply: {
    background: BG_SUCCESS_LIGHT,
  },

  noBestReply: { background: BG_TRANSPARENT },
};
