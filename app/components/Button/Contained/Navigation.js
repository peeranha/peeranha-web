import { BG_TRANSPARENT, TEXT_PRIMARY } from 'style-constants';
import IconStyled, { IconHover } from 'components/Icon/IconStyled';

import PrimaryLarge from './PrimaryLarge';

/* istanbul ignore next */
const NavigationButton = PrimaryLarge.extend`
  padding: 6px 20px;

  @media only screen and (max-width: 576px) {
    padding: 6px 15px;
    min-width: auto;
  }

  ${({ isLink }) =>
    isLink
      ? `
    color: ${TEXT_PRIMARY};
    background: ${BG_TRANSPARENT};

    ${IconStyled} {
      ${IconHover({ color: TEXT_PRIMARY })};
    }
  `
      : ``};
`;

export default NavigationButton;
