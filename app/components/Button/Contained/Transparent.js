import { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { BG_TRANSPARENT, BORDER_TRANSPARENT, LINK_COLOR } from 'style-constants';
import { graphCommunityColors } from 'utils/communityManagement';
import Button from '../index';

const graphCommunity = graphCommunityColors();

const ButtonCss = css`
  color: ${({ color }) => (graphCommunity ? '#6F4CFF' : color || LINK_COLOR)};
  background: ${BG_TRANSPARENT};
  border: 1px solid ${BORDER_TRANSPARENT};
  border-radius: 0;
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
