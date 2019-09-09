import { TEXT_DARK } from 'style-constants';
import Text from '../Span';

const H3 = Text.extend`
  color: ${TEXT_DARK};
  font-weight: 600;
  font-size: 38px;
  line-height: 48px;
  display: flex;
  align-items: center;
`.withComponent('h3');

export default H3;
