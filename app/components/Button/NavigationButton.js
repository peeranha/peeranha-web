import { blue, darkblue, transparent, white, gray } from 'style-constants';
import A from './A';

/* istanbul ignore next */
const NavigationButton = A.extend`
  box-shadow: none;
  border: none;
  color: ${props => (props.isLink ? blue : white)};
  background: ${props => (props.isLink ? transparent : darkblue)};

  span[data-icon='icon'] {
    stroke: ${props => (props.isLink ? blue : white)};
  }

  :disabled {
    background: ${transparent};
    color: ${gray};
    border: none;
  }
`;

export default NavigationButton;
