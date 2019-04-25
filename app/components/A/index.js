import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { TEXT_DARK } from 'style-constants';
import IconStyled from 'components/Icon/IconStyled';

/* istanbul ignore next */
const A = styled(Link)`
  text-decoration: none;
  color: ${TEXT_DARK};
  pointer-events: ${x => (x.disabled ? 'none' : 'auto')};

  ${IconStyled} {
    stroke: ${TEXT_DARK};
    fill: ${TEXT_DARK};
  }

  :visited {
    text-decoration: none;
  }

  :hover {
    text-decoration: none;
  }
`;

export default A;
