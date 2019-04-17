import { darkblue, white } from 'style-constants';
import IconStyled from 'components/Icon/IconStyled';

import Button from '../index';

export default Button.extend`
  background: ${darkblue};
  color: ${white};

  ${IconStyled} {
    stroke: ${white};
  }
`;
