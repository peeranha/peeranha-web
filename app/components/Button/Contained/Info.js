import { pink, white } from 'style-constants';
import IconStyled from 'components/Icon/IconStyled';

import Button from '../index';

export default Button.extend`
  background: ${pink};
  color: ${white};

  ${IconStyled} {
    stroke: ${white};
  }
`;
