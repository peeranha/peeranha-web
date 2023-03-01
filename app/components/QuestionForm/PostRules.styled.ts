import { BG_PRIMARY, RULES_BACKGROUND, TEXT_SECONDARY } from 'style-constants';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

export const styles = {
  wrapper: {
    marginBottom: '32px',
    padding: '16px',
    backgroundColor: `${RULES_BACKGROUND}`,
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
      backgroundColor: '#fff',
      margin: '20px auto 12px',
    },
  },
  listItem: {
    display: 'flex',
    alignItems: 'start',
    marginBottom: '12px',
    fontSize: '16px',
    lineHeight: '20px',
    ':before': {
      content: '""',
      flexBasis: '5px',
      height: '5px',
      borderRadius: '50%',
      background: `${colors.textColor || BG_PRIMARY}`,
      marginRight: '10px',
      display: 'inline-flex',
      position: 'relative',
      top: '8px',
    },
    span: {
      flex: 1,
    },
  },
  secondaryText: {
    color: `${TEXT_SECONDARY}`,
    fontSize: '16px',
    lineHeight: '24px',
  },
  fullRules: {
    fontStyle: 'italic',
    marginBottom: '12px',
    display: 'block',
  },
};
