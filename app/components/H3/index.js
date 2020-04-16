import { TEXT_DARK } from 'style-constants';
import { singleCommunityFonts } from 'utils/communityManagement';
import Text from '../Span';

const fonts = singleCommunityFonts();

const H3 = Text.extend`
  color: ${TEXT_DARK};
  font-weight: 600;
  font-size: 38px;
  line-height: 48px;
  display: flex;
  align-items: center;
  font-family: ${fonts.h3};
  letter-spacing: ${fonts.h3LetterSpacing};

  @media only screen and (max-width: 576px) {
    font-size: 28px;
    line-height: 28px;
  }
`.withComponent('h3');

export default H3;
