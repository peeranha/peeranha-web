import { transparent, blue } from 'style-constants';
import IconStyled from 'components/Icon/IconStyled';

import PrimaryLarge from './PrimaryLarge';

/* istanbul ignore next */
const NavigationButton = PrimaryLarge.extend`
  padding: 6px 20px;

  ${({ isLink }) =>
    isLink
      ? `
    color: ${blue};
    background: ${transparent};

    ${IconStyled} * {
      stroke: ${blue};
    }
  `
      : ``};
`;

export default NavigationButton;
