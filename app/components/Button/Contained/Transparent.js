import { css } from 'styled-components';
import { Link } from 'react-router-dom';

import {
  BG_TRANSPARENT,
  BORDER_TRANSPARENT,
  TEXT_PRIMARY,
  LINK_COLOR,
} from 'style-constants';

import Button from '../index';

const ButtonCss = css`
  color: ${({ color }) => (color ? color : LINK_COLOR)};
  background: ${BG_TRANSPARENT};
  border: 1px solid ${BORDER_TRANSPARENT};
  height: auto;
  min-height: auto;
  font-size: 16px;
  line-height: 18px;
`;

export const TransparentLinkDefault = Button.extend`
  ${ButtonCss};
`.withComponent('a');

export const TransparentLink = Button.extend`
  ${ButtonCss};
`.withComponent(Link);

export default Button.extend`
  ${ButtonCss};
`;
