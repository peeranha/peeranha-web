import { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { BG_TRANSPARENT, TEXT_PRIMARY, TEXT_LIGHT } from 'style-constants';

import Primary from './Primary';
import Medium from '../Medium';

const ButtonCss = css`
  ${Medium};
  min-width: auto;
  font-size: 16px;
  line-height: 20px;

  :hover {
    color: ${TEXT_LIGHT};
  }

  ${({ isLink }) =>
    isLink
      ? `
    color: ${TEXT_PRIMARY};
    background: ${BG_TRANSPARENT};
    border-radius: 0;

    :hover {
      color: ${TEXT_PRIMARY};
    }
  `
      : ``};
`;

export const NavigationLinkDefault = Primary.extend`
  ${ButtonCss};
`.withComponent('a');

export const NavigationLink = Primary.extend`
  ${ButtonCss};
`.withComponent(Link);

const NavigationButton = Primary.extend`
  ${ButtonCss};
`;

export default NavigationButton;
