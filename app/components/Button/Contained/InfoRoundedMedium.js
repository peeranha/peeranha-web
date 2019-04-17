import { pink, white } from 'style-constants';
import Button from '../index';

export default Button.extend`
  width: 43px !important;
  height: 43px !important;
  border-radius: 50% !important;
  min-width: inherit !important;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.4);
  background: ${pink};
  color: ${white};
`;
