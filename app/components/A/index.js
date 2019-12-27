import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { TEXT_DARK, TEXT_PRIMARY } from 'style-constants';
import { svgDraw } from 'components/Icon/IconStyled';
import Span from 'components/Span';

export const ACss = css`
  text-decoration: none !important;
  font-weight: ${x => (x.bold ? '600' : 'inherit')};
  pointer-events: ${x => (x.disabled ? 'none' : 'auto')};
  ${svgDraw({ color: TEXT_DARK })};
  cursor: pointer;

  ${x => (x.disabled ? `opacity: 0.6` : ``)};

  :hover {
    ${svgDraw({ color: TEXT_PRIMARY })};
  }
`;

export const AProps = Span.extend`
  ${ACss};
`.withComponent(Link);

export const ADefault = styled.a`
  ${ACss};
`;

export default styled(Link)`
  ${ACss};
`;
