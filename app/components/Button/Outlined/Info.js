import { transparent, pink, white } from 'style-constants';
import IconStyled from 'components/Icon/IconStyled';

import Button from '../index';

const OutlinedButton = Button.extend`
  background: ${transparent};
  border: 1px solid ${pink};
  color: ${pink};

  ${IconStyled} {
    stroke: ${pink};
  }

  :hover {
    color: ${white};
    background: ${pink};
    border-color: ${transparent};
  }
`;

export default OutlinedButton;
