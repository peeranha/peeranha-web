import { css } from 'styled-components';

import {
  BG_TRANSPARENT,
  BG_LIGHT,
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
    margin: 0;
  }
`;

const OutlinedButton = Button.extend`
  background: ${BG_LIGHT};
  border: 1px solid ${BUTTON_COLOR};
  color: ${BUTTON_COLOR};

  ${props => props.customStyles};

  :hover {
    color: ${TEXT_LIGHT};
    background: ${BUTTON_COLOR};
    border-color: ${BORDER_TRANSPARENT};
  }
`;

export default OutlinedButton;
