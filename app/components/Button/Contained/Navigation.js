import { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { BG_TRANSPARENT, TEXT_PRIMARY, TEXT_LIGHT } from 'style-constants';

import PrimaryLarge from './PrimaryLarge';

const ButtonCss = css`
  padding: 6px 20px;

  :hover {
    color: ${TEXT_LIGHT};
  }

  @media only screen and (max-width: 576px) {
    padding: 6px 15px;
    font-size: 14px;
    min-width: auto;
  }

  ${({ isLink }) =>
    isLink
      ? `
    color: ${TEXT_PRIMARY};
    background: ${BG_TRANSPARENT};

    :hover {
      color: ${TEXT_PRIMARY};
    }
  `
      : ``};
`;

export const NavigationLinkDefault = PrimaryLarge.extend`
  ${ButtonCss};
`.withComponent('a');

export const NavigationLink = PrimaryLarge.extend`
  ${ButtonCss};
`.withComponent(Link);

const NavigationButton = PrimaryLarge.extend`
  ${ButtonCss};
`;

export default NavigationButton;
