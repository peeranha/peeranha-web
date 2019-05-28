import { BG_PRIMARY_DARK, TEXT_LIGHT } from 'style-constants';
import IconStyled, { IconHover } from 'components/Icon/IconStyled';

import Button from '../index';

export default Button.extend`
  background: ${BG_PRIMARY_DARK};
  color: ${TEXT_LIGHT};

  ${IconStyled} {
    ${IconHover({ color: TEXT_LIGHT })};
  }
`;
