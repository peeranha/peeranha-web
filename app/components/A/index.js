import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { black } from 'style-constants';

/* istanbul ignore next */
const A = styled(Link)`
  text-decoration: none;
  color: ${black};
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};

  :visited {
    text-decoration: none;
  }

  :hover {
    text-decoration: none;
  }
`;

export default A;
