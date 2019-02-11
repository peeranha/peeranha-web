import { transparent, pink } from 'style-constants';
import ButtonStyled from './ButtonStyled';

const OutlinedButtonStyled = ButtonStyled.extend`
  background: ${transparent};
  border: 1px solid ${props => props.bg || pink};
  color: ${props => props.bg || pink};
  padding: 4px 20px;
  box-shadow: none;
`;

export default OutlinedButtonStyled;
