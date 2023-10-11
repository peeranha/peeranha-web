import { singleCommunityFonts } from 'utils/communityManagement';
import { APP_FONT, TEXT_DARK } from 'style-constants';

const fonts = singleCommunityFonts();

const styles = {
  sectionHeader: {
    padding: '32px 32px 16px',
    '@media only screen and (max-width: 576px)': {
      paddingLeft: '5px',
    },
  },
  roleTitle: {
    padding: '16px 32px',
    fontSize: '20px',
    fontWeight: '600',
    '@media only screen and (max-width: 576px)': {
      paddingLeft: '5px',
    },
  },

  headerTitle: {
    color: TEXT_DARK,
    fontWeight: 600,
    fontSize: '38px',
    lineHeight: '48px',
    display: 'flex',
    alignItems: 'center',
    fontFamily: fonts.h3 || APP_FONT,
    letterSpacing: fonts.h3LetterSpacing || APP_FONT,
    '@media only screen and (max-width: 576px)': {
      fontSize: '28px',
      lineHeight: '28px',
    },
  },

  baseContainer: {
    marginBottom: '16px',
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
  },
};

export default styles;
