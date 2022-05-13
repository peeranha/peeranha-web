import { css } from 'styled-components';

import {
  BG_TRANSPARENT,
  BORDER_TRANSPARENT,
  TEXT_LIGHT,
  BUTTON_COLOR,
} from 'style-constants';

import Button from '../index';

export const hover = css`
  :hover {
    color: ${TEXT_LIGHT};
    background: ${BUTTON_COLOR};
    border-color: ${BUTTON_COLOR};
  }
`;

const OutlinedButton = Button.extend`
  background: ${BG_TRANSPARENT};
  border: 1px solid ${BUTTON_COLOR};
  color: ${BUTTON_COLOR};

  ${(props) => props.customStyles};

  :hover {
    color: ${TEXT_LIGHT};
    background: ${BUTTON_COLOR};
    border-color: ${BORDER_TRANSPARENT};
  }
`;

export default OutlinedButton;
