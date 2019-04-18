import { transparent, blue } from 'style-constants';
import IconStyled from 'components/Icon/IconStyled';

import Button from '../index';

export default Button.extend`
  color: ${blue};
  background: ${transparent};
  border: 1px solid ${transparent};

  ${IconStyled} {
    stroke: ${blue};
  }
`;
