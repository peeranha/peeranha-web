import {
  BG_TRANSPARENT,
  BORDER_TRANSPARENT,
  TEXT_PRIMARY,
} from 'style-constants';
import IconStyled from 'components/Icon/IconStyled';

import Button from '../index';

export default Button.extend`
  color: ${TEXT_PRIMARY};
  background: ${BG_TRANSPARENT};
  border: 1px solid ${BORDER_TRANSPARENT};

  ${IconStyled} {
    stroke: ${TEXT_PRIMARY};
  }
`;
