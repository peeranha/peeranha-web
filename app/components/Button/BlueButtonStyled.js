import { blue, darkblue, transparent, white } from 'style-constants';
import ButtonStyled from './ButtonStyled';

const BlueButtonStyled = ButtonStyled.extend`
  padding: 4px 15px;
  box-shadow: none;
  border: none;
  color: ${props => (props.isLink ? blue : white)};
  background: ${props => (props.isLink ? transparent : darkblue)};
`;

export default BlueButtonStyled;
