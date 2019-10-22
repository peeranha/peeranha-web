import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { TEXT_DARK } from 'style-constants';

const ACss = css`
  text-decoration: none;
  color: ${TEXT_DARK};
  font-weight: ${x => (x.bold ? '600' : 'inherit')};
  pointer-events: ${x => (x.disabled ? 'none' : 'auto')};

  :visited {
    text-decoration: none;
  }

  :hover {
    text-decoration: none;
  }
`;

export const ADefault = styled.a`
  ${ACss};
`;

const ALink = styled(Link)`
  ${ACss};
`;

export default ALink;
