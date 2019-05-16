import { TEXT_DARK } from 'style-constants';
import Span from '../Span';

const Li = Span.extend`
  color: ${TEXT_DARK};
  padding: 0 15px;
  cursor: pointer;
  line-height: 28px;
`.withComponent('li');

export default Li;
