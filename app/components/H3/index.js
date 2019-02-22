import { black } from 'style-constants';
import Text from '../Span';

/* istanbul ignore next */
const H3 = Text.extend`
  color: ${black};
  font-weight: 600;
  font-size: 38px;
  line-height: 48px;
  margin-bottom: ${props => props.marginBottom || 0}px;
`.withComponent('h3');

export default H3;
