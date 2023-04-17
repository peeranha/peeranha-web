import { singleCommunityColors } from 'utils/communityManagement';
import {
  BG_SECONDARY_SPECIAL_4,
  BORDER_PRIMARY,
  BORDER_PRIMARY_LIGHT,
  BORDER_SECONDARY_LIGHT,
  TEXT_SECONDARY,
} from 'style-constants';

const communityColors = singleCommunityColors();

const styles = {
  container: {
    position: 'absolute',
    padding: '0 18px',
    fontSize: '16px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderBottom: `1px solid ${BORDER_SECONDARY_LIGHT}`,
    alignItems: 'start',
    justifyContent: 'center',
    '> *': {
      marginBottom: '4px',
    },
    '@media only screen and (min-width: 819px) and (max-width: 993px), only screen and (min-width: 1095px)':
      {
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '1.35fr 1.45fr 0.55fr',
        padding: '0 36px',
      },
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    '> span': {
      marginRight: '5px',
    },
    '@media only screen and (min-width: 819px) and (max-width: 993px), only screen and (min-width: 1095px)':
      {
        flexDirection: 'column',
        alignItems: 'start',
      },
  },
  textAndIconWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  notificationTitle: {
    color: 'rgb(40,40,40)',
    lineHeight: '20px',
    marginLeft: '10px',
  },
  additionalInfo: {
    color: 'rgb(123,123,123)',
    lineHeight: '20px',
  },
  unread: {
    borderLeft: `3px solid ${BORDER_PRIMARY_LIGHT}`,
    background: BG_SECONDARY_SPECIAL_4,
  },
  time: {
    color: TEXT_SECONDARY,
    textAlign: 'right',
    whiteSpace: 'nowrap',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    '> span': {
      marginLeft: '5px',
      color: communityColors.btnColor || BORDER_PRIMARY,
    },
  },

  lastNotification: { border: 'none' },
};

export default styles;
