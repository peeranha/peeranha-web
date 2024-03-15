import { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { BG_TRANSPARENT, TEXT_LIGHT, BG_PRIMARY, TEXT_PRIMARY } from 'style-constants';

import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';
import Primary from './Primary';
import Medium from '../Medium';

const graphCommunity = graphCommunityColors();

const colors = singleCommunityColors();
const linkColor = colors.linkColor || TEXT_PRIMARY;

const ButtonCss = css`
  ${Medium};
  min-width: auto;
  font-size: 16px;
  line-height: 20px;

  :hover {
    color: ${graphCommunity ? '#E1E1E4' : TEXT_LIGHT};
  }

  ${({ islink }) =>
    islink
      ? css`
          color: ${graphCommunity ? '#6F4CFF' : linkColor};
          background: ${BG_TRANSPARENT};
          border-radius: 0;

          :hover {
            color: ${graphCommunity ? 'rgba(111, 76, 255, 0.8)' : linkColor};
          }
        `
      : css`
          background: ${graphCommunity ? '#6F4CFF' : colors.linkColor || BG_PRIMARY};
        `};
`;

export const NavigationLinkDefault = Primary.extend`
  ${ButtonCss};
`.withComponent('a');

export const NavigationLink = Primary.extend`
  ${ButtonCss};
  font-weight: 400;

  span {
    font-weight: 400;
  }
`.withComponent(Link);

const NavigationButton = Primary.extend`
  ${ButtonCss};
`;

export default NavigationButton;
