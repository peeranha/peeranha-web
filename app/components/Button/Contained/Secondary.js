import {
  BG_SECONDARY_LIGHT,
  BORDER_SECONDARY,
  TEXT_SECONDARY,
} from 'style-constants';

import Button from '../index';

export default Button.extend`
  color: ${TEXT_SECONDARY};
  background: ${BG_SECONDARY_LIGHT};
  border: 1px solid ${BORDER_SECONDARY};
`;
