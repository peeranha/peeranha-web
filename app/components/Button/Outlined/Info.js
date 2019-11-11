import {
  BG_TRANSPARENT,
  BORDER_TRANSPARENT,
  TEXT_WARNING_LIGHT,
  BG_WARNING_LIGHT,
  TEXT_LIGHT,
  BORDER_WARNING_LIGHT,
} from 'style-constants';

import Button from '../index';

const OutlinedButton = Button.extend`
  background: ${BG_TRANSPARENT};
  border: 1px solid ${BORDER_WARNING_LIGHT};
  color: ${TEXT_WARNING_LIGHT};

  :hover {
    color: ${TEXT_LIGHT};
    background: ${BG_WARNING_LIGHT};
    border-color: ${BORDER_TRANSPARENT};
  }
`;

export default OutlinedButton;
