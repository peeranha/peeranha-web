import { TEXT_DARK } from 'style-constants';
import Text from '../Span';

/* istanbul ignore next */
const H3 = Text.extend`
  color: ${TEXT_DARK};
  font-weight: 600;
  font-size: 38px;
  line-height: 48px;
`.withComponent('h3');

export default H3;
