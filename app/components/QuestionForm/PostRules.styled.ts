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
      backgroundColor: '#6F4CFF',
      margin: '20px auto 12px',
    },
  },
  listItem: {
    display: 'flex',
    alignItems: 'start',
    marginBottom: '12px',
    fontSize: '14px',
    lineHeight: '20px',
    ':before': {
      content: "'\\25E6'",
      marginRight: '10px',
      display: 'inline-flex',
      position: 'relative',
    },
    span: {
      flex: 1,
    },
  },
  secondaryText: {
    color: `#A7A7AD`,
    fontSize: '14px',
    lineHeight: '20px',
  },
  fullRules: {
    fontStyle: 'italic',
    marginBottom: '12px',
    display: 'block',
  },
};
