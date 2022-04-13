import { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { BG_TRANSPARENT, TEXT_LIGHT, BG_PRIMARY } from 'style-constants';

import { singleCommunityColors } from 'utils/communityManagement';
import Primary from './Primary';
import Medium from '../Medium';

const colors = singleCommunityColors();

const ButtonCss = css`
  ${Medium};
  min-width: auto;
  font-size: 16px;
  line-height: 20px;

  :hover {
    color: ${TEXT_LIGHT};
  }

  ${({ islink }) =>
    islink
      ? css`
          color: ${colors.linkColor || TEXT_LIGHT};
          background: ${BG_TRANSPARENT};
          border-radius: 0;

          :hover {
            color: ${colors.linkColor || TEXT_LIGHT};
          }
        `
      : css`
          background: ${colors.linkColor || BG_PRIMARY};
        `};
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
