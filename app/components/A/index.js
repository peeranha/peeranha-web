import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { black } from 'style-constants';

const A = styled(Link)`
  text-decoration: none;
  color: ${black};

  :visited {
    text-decoration: none;
  }

  :hover {
    text-decoration: none;
  }
`;

export default A;
