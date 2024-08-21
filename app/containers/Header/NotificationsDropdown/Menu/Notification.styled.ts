import {
  BG_SECONDARY_SPECIAL_4,
  BORDER_PRIMARY_LIGHT,
  BORDER_SECONDARY_LIGHT,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
} from 'style-constants';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

const styles = {
  // Notification styles
  root: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    padding: '10px 16px',
    margin: '0 auto',
    borderBottom: `1px solid ${graphCommunity ? '#3D3D54' : 'rgba(53, 74, 137, 0.15)'}`,
    alignItems: 'start',
    justifyContent: 'start',
    svg: {
      marginTop: '3px',
    },
    '& :nth-last-child': {
      borderBottom: 'none',
    },
  },
  unread: {
    borderLeft: `3px solid ${BORDER_PRIMARY_LIGHT}`,
    background: BG_SECONDARY_SPECIAL_4,
  },
  textBlock: {
    textAlign: 'left',
    marginLeft: '12px',
    display: 'flex',
    flexDirection: 'column',
  },
  titleWrapper: {
    '& span': {
      whiteSpace: 'nowrap',
      lineHeight: '20px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: 'block',
      width: '100%',
    },
  },
  title: {
    fontSize: '16px',
    lineHeight: '20px',
    color: graphCommunity ? '#E1E1E4' : '#282828',
  },
  timestamp: {
    color: graphCommunity ? '#A7A7AD' : colors.secondaryTextColor || TEXT_SECONDARY,
    whiteSpace: 'nowrap',
    fontSize: '14px',
    margin: '5px 0',
  },
  link: {
    fontSize: '14px',
    color: colors.btnColor || '#576FED',
  },
  // Footer styles
  footerContainer: {
    display: 'inline-block',
    width: '100%',
    borderTop: `1px solid ${colors.dividerColor || BORDER_SECONDARY_LIGHT}`,
    padding: '16px',
  },
  seeAll: {
    color: graphCommunity ? '#E1E1E4' : colors.btnColor || TEXT_PRIMARY,
    marginRight: '25px',
  },
  // Header styles
  headerContainer: {
    display: 'flex',
    width: '100%',
    padding: '16px',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${
      graphCommunity ? '#3D3D54' : colors.dividerColor || BORDER_SECONDARY_LIGHT
    }`,
  },
  headerTitle: {
    marginLeft: '10px',
    fontWeight: '600',
    fontSize: '18px',
    marginRight: '8px',
  },
};

export default styles;
