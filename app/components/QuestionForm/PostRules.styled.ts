import { BG_PRIMARY, RULES_BACKGROUND, TEXT_SECONDARY } from 'style-constants';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

export const styles = {
  wrapper: {
    marginBottom: '32px',
    padding: '16px',
    backgroundColor: graphCommunity
      ? '#6F4CFF33'
      : colors.newPostMediaBackgroundColor || RULES_BACKGROUND,
    width: '100%',
  },
  title: {
    marginBottom: '12px',
    fontSize: '18px',
  },
  list: {
    paddingBottom: '6px',
    '::after': {
      content: '""',
      display: 'block',
      width: '100%',
      height: '1px',
      backgroundColor: graphCommunity ? '#6F4CFF' : '#fff',
      margin: '20px auto 12px',
    },
  },
  listItem: {
    display: 'flex',
    alignItems: 'start',
    marginBottom: '12px',
    fontSize: graphCommunity ? '14px' : '16px',
    lineHeight: '20px',
    ':before': {
      content: graphCommunity ? "'\\25E6'" : '""',
      flexBasis: graphCommunity ? '' : '5px',
      height: graphCommunity ? '' : '5px',
      borderRadius: graphCommunity ? '' : '50%',
      background: graphCommunity ? 'none' : `${colors.textColor || BG_PRIMARY}`,
      marginRight: '10px',
      display: 'inline-flex',
      position: 'relative',
      top: graphCommunity ? '' : '8px',
    },
    span: {
      flex: 1,
    },
  },
  secondaryText: {
    color: graphCommunity ? '#A7A7AD' : TEXT_SECONDARY,
    fontSize: graphCommunity ? '14px' : '16px',
    lineHeight: graphCommunity ? '20px' : '24px',
  },
  fullRules: {
    fontStyle: 'italic',
    marginBottom: '12px',
    display: 'block',
  },
};
