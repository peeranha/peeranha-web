import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { TEXT_PRIMARY, TEXT_DARK } from 'style-constants';
import { svgDraw } from 'components/Icon/IconStyled';
import Span from 'components/Span';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

export const ACss = css`
  text-decoration: none !important;
  font-weight: ${(x) => (x.bold ? '600' : 'inherit')};
  pointer-events: ${(x) => (x.disabled ? 'none' : 'auto')};
  ${svgDraw({ color: graphCommunity ? '#E1E1E4' : TEXT_DARK })};
  cursor: pointer;

  ${(x) => (x.disabled ? `opacity: 0.6` : ``)};

  :hover {
    ${svgDraw({ color: `${colors.linkColor} !important` || TEXT_PRIMARY })};
  }
`;

export const AProps = Span.extend`
  ${ACss};
`.withComponent(Link);

export const ADefault = styled.a`
  ${ACss};
`;

export const APropsDefault = Span.extend`
  ${ACss};
`.withComponent(ADefault);

export default styled(Link)`
  ${ACss};
`;
