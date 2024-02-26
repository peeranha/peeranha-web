import { CSSObject } from '@emotion/react';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';
import {
  BG_SECONDARY_SPECIAL_4,
  BORDER_PRIMARY,
  BORDER_PRIMARY_LIGHT,
  BORDER_SECONDARY_LIGHT,
  TEXT_SECONDARY,
} from 'style-constants';

const communityColors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

const styles: Record<string, CSSObject> = {
  container: {
    position: 'absolute',
    padding: '16px',
    fontSize: '16px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderBottom: `1px solid ${graphCommunity ? '#3D3D54' : BORDER_SECONDARY_LIGHT}`,
    alignItems: 'start',
    justifyContent: 'center',

    '@media only screen and (min-width: 819px) and (max-width: 993px), only screen and (min-width: 1095px)':
      {
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '1.35fr 1.45fr 0.55fr',
        padding: '0 36px',
      },
  },

  containerBorders: {
    border: `1px solid ${graphCommunity ? '#3D3D54' : communityColors.border}`,
    borderRadius: '5px',
  },

  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    '> span': {
      marginRight: '5px',
    },
  },
  textAndIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '4px',

    '@media only screen and (min-width: 819px) and (max-width: 993px), only screen and (min-width: 1095px)':
      {
        marginBottom: 0,
      },
  },
  notificationTypeTitle: {
    color: graphCommunity ? '#E1E1E4' : 'rgb(40,40,40)',
    lineHeight: '20px',
    marginLeft: '10px',
  },
  additionalInfo: {
    color: 'rgb(123,123,123)',
    lineHeight: '20px',
    marginTop: '4px',
    marginBottom: '8px',
    '@media only screen and (min-width: 819px) and (max-width: 993px), only screen and (min-width: 1095px)':
      {
        marginBottom: 0,
      },
  },
  unread: {
    borderLeft: `3px solid ${graphCommunity ? '#3D3D54' : BORDER_PRIMARY_LIGHT}`,
    background: BG_SECONDARY_SPECIAL_4,
  },
  time: {
    color: graphCommunity ? '#A7A7AD' : TEXT_SECONDARY,
    textAlign: 'right',
    whiteSpace: 'nowrap',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    '> span': {
      color: graphCommunity ? '#FFFFFF' : communityColors.btnColor || BORDER_PRIMARY,
    },
  },

  lastNotification: { border: 'none' },

  notificationTitle: {
    fontSize: '16px',
    lineHeight: '20px',
    color: graphCommunity ? '#E1E1E4' : '#576FED',
    marginBottom: '8px',
    '@media only screen and (min-width: 819px) and (max-width: 993px), only screen and (min-width: 1095px)':
      {
        marginBottom: 0,
      },
  },

  fullDate: {
    color: graphCommunity ? '#A7A7AD' : 'rgb(40, 40, 40)',
  },

  lastDatePart: {
    color: graphCommunity ? '#A7A7AD' : 'rgb(123,123,123)',
  },
};

export default styles;
