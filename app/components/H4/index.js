import { black } from 'style-constants';
import Text from '../Span';

const H4 = Text.extend`
  color: ${black};
  font-weight: bold;
  line-height: 18px;
`.withComponent('h4');

export default H4;
