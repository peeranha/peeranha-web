import {
  BG_TRANSPARENT,
  BORDER_SECONDARY,
  TEXT_SECONDARY,
} from 'style-constants';

import Button from '../index';

const SecondaryButton = Button.extend`
  background: ${BG_TRANSPARENT};
  border: 1px solid ${BORDER_SECONDARY};
  color: ${TEXT_SECONDARY};
`;

export default SecondaryButton;
