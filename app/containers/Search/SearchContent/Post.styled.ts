import {
  BG_SUCCESS_LIGHT,
  BG_TRANSPARENT,
  TEXT_DARK,
} from '../../../style-constants';
import { singleCommunityColors } from '../../../utils/communityManagement';

const colors = singleCommunityColors();

export const styles = {
  post: {
    background: '#fff',
    boxShadow: '0px 2px 4px rgba(7, 16, 64, 0.1)',
    borderRadius: '5px',

    ':hover': {
      outline: '3px solid rgb(165, 188, 255)',
      boxShadow: '0px 20px 20px rgba(24, 39, 79, 0.1)',
    },
  },

  content: {
    resize: 'none',
    color: '#7B7B7B',
    lineHeight: '18px',
    maxHeight: '90px',
    textAlign: 'justify',
    marginRight: '-1em',
    paddingRight: '1em',

    ':before': {
      content: '"..."',
      position: 'absolute',
      right: 0,
      bottom: 0,
    },

    ':after': {
      content: '""',
      position: 'absolute',
      right: 0,
      width: '1em',
      height: '1em',
      marginTop: '0.2em',
      background: '#fff',
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
