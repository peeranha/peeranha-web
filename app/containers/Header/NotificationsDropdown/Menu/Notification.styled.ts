import {
  BG_SECONDARY_SPECIAL_4,
  BORDER_PRIMARY_LIGHT,
  BORDER_SECONDARY_LIGHT,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
} from 'style-constants';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

const styles = {
  // Notification styles
  root: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    padding: '16px',
    margin: '0 auto',
    borderBottom: '1px solid rgba(53, 74, 137, 0.15)',
    alignItems: 'start',
    justifyContent: 'start',
    '& :nth-last-child': {
      borderBottom: 'none',
    },
  },
  unreadStyles: {
    borderLeft: `3px solid ${BORDER_PRIMARY_LIGHT}`,
    background: BG_SECONDARY_SPECIAL_4,
  },
  textBlock: {
    textAlign: 'left',
    marginLeft: '12px',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '16px',
    lineHeight: '20px',
    color: '#282828',
  },
  timestamp: {
    color: TEXT_SECONDARY,
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
    display: 'flex',
    width: '100%',
    borderTop: `1px solid ${BORDER_SECONDARY_LIGHT}`,
    padding: '16px',
  },
  seeAll: {
    color: TEXT_PRIMARY,
    marginLeft: '2px',
    marginRight: '25px',
  },
  // Header styles
  headerContainer: {
    display: 'flex',
    width: '100%',
    padding: '16px',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${BORDER_SECONDARY_LIGHT}`,
  },
  headerTitle: {
    marginLeft: '10px',
    fontWeight: '600',
    fontSize: '18px',
    marginRight: '8px',
  },
};

export default styles;
