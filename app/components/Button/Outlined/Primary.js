import {
  BG_TRANSPARENT,
  BORDER_TRANSPARENT,
  TEXT_PRIMARY,
  BG_PRIMARY,
  TEXT_LIGHT,
  BORDER_PRIMARY,
} from 'style-constants';

import Button from '../index';

const PrimaryButton = Button.extend`
  background: ${BG_TRANSPARENT};
  border: 1px solid ${BORDER_PRIMARY};
  color: ${TEXT_PRIMARY};

  :hover {
    color: ${TEXT_LIGHT};
    background: ${BG_PRIMARY};
    border-color: ${BORDER_TRANSPARENT};
  }
`;

export default PrimaryButton;
