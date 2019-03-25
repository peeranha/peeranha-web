import { black } from 'style-constants';
import Span from '../Span';

const Li = Span.extend`
  color: ${black};
  padding: 0 15px;
  cursor: pointer;
  line-height: 28px;
`.withComponent('li');

export default Li;
