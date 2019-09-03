import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { TEXT_DARK } from 'style-constants';

/* istanbul ignore next */
const A = styled(Link)`
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

export default A;
