import { black } from 'style-constants';
import Text from '../Span';

/* istanbul ignore next */
const H4 = Text.extend`
  color: ${black};
  font-weight: 600;

  ${props => (props.isHeader ? 'padding: 23px 27px;' : '')} font-size: 30px;
  line-height: 38px;

  margin-bottom: ${props => props.marginBottom || 0}px;
`.withComponent('h3');

export default H4;
