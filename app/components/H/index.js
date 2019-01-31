import { black } from 'style-constants';
import Text from '../Span';

const H1 = 64;

const H = Text.extend`
  color: ${black};
  font-weight: bold;
  font-size: ${props => Math.floor(H1 / +props.size)};
  line-height: ${props => Math.floor((H1 * 1.25) / +props.size)};
`.withComponent('h4');

export default H;
