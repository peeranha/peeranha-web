import { css } from 'styled-components';
import { Link } from 'react-router-dom';

import {
  BG_TRANSPARENT,
  BORDER_TRANSPARENT,
  TEXT_PRIMARY,
} from 'style-constants';

import IconStyled, { IconHover } from 'components/Icon/IconStyled';

import Button from '../index';

const ButtonCss = css`
  color: ${TEXT_PRIMARY};
  background: ${BG_TRANSPARENT};
  border: 1px solid ${BORDER_TRANSPARENT};

  ${IconStyled} {
    ${IconHover({ color: TEXT_PRIMARY })};
  }
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
