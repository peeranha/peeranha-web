import {
  BG_SUCCESS_LIGHT,
  BG_TRANSPARENT,
  TEXT_DARK,
  TEXT_SECONDARY,
  BORDER_PRIMARY,
} from 'style-constants';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

export const styles = {
  post: {
    background: graphCommunity ? '#161425' : 'rgb(255,255,255)',
    boxShadow: `0px 2px 4px ${graphCommunity ? '#3D3D54' : 'rgba(7, 16, 64, 0.1)'}`,
    borderRadius: '5px',
    border: colors.border ? `1px solid ${colors.border}` : 'none',
    ':hover': {
      boxShadow: `5px 5px 5px ${colors.baseShadow || 'rgba(40, 40, 40, 0.1)'}`,
    },
  },

  container: {
    '@media only screen and (min-width: 1024px)': {
      margin: '24px 32px',
    },
  },

  title: {
    color: graphCommunity ? '#E1E1E4' : TEXT_DARK,
    lineHeight: '23px',
    fontSize: '12px',
    fontWeight: 600,
    ':hover': {
      color: TEXT_DARK,
    },

    '@media only screen and (min-width: 1024px)': {
      fontSize: '24px',
      lineHeight: '30px',
      paddingLeft: '3px',
    },
  },

  mainInfo: {
    '@media only screen and (min-width: 1024px)': {
      paddingLeft: '50px',
    },
  },

  creationTime: {
    lineHeight: '15px',
    color: graphCommunity ? '#A7A7AD' : TEXT_SECONDARY,

    '@media only screen and (min-width: 768px)': {
      fontSize: '14px',
      lineHeight: '18px',
    },
  },

  content: {
    color: graphCommunity ? '#A7A7AD' : TEXT_SECONDARY,
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
    background: graphCommunity ? 'rgba(111, 76, 255, 0.16)' : 'none',
    color: graphCommunity ? '#E1E1E4' : BORDER_PRIMARY,
    lineHeight: '18px',
    border: `1px solid ${graphCommunity ? 'rgba(111,76,255,0.16)' : BORDER_PRIMARY}`,
    borderRadius: graphCommunity ? '10px' : '2px',
    padding: '3px 9px',
    '@media only screen and (min-width: 768px)': {
      marginBottom: '0',
    },
  },

  count: {
    color: colors.linkColor || TEXT_DARK,
  },

  bestReply: {
    background: graphCommunity ? '#4BCA81' : BG_SUCCESS_LIGHT,
  },

  noBestReply: { background: BG_TRANSPARENT },
};
