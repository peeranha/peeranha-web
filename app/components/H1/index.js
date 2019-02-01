import { black } from 'style-constants';
import Text from '../Span';

const H1 = Text.extend`
  color: ${black};
  font-weight: bold;
  font-size: 64px;
  line-height: 64px;
`.withComponent('h1');

export default H1;
