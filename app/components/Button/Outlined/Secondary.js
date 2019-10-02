import {
  BG_TRANSPARENT,
  TEXT_DARK,
  BORDER_SECONDARY,
  TEXT_SECONDARY,
} from 'style-constants';

import IconStyled, { IconHover } from 'components/Icon/IconStyled';
import Button from '../index';

const SecondaryButton = Button.extend`
  background: ${BG_TRANSPARENT};
  border: 1px solid ${BORDER_SECONDARY};
  color: ${TEXT_SECONDARY};

  ${IconStyled} {
    ${IconHover({ color: TEXT_DARK })};
  }
`;

export default SecondaryButton;
