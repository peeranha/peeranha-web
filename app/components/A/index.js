import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { black } from 'style-constants';
import IconStyled from 'components/Icon/IconStyled';

/* istanbul ignore next */
const A = styled(Link)`
  text-decoration: none;
  color: ${black};
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};

  ${IconStyled} {
    stroke: ${black};
    fill: ${black};
  }

  :visited {
    text-decoration: none;
  }

  :hover {
    text-decoration: none;
  }
`;

export default A;
