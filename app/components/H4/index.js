import { TEXT_DARK } from 'style-constants';
import Text from '../Span';

const H4 = Text.extend`
  color: ${TEXT_DARK};
  font-weight: 600;

  ${props => (props.isHeader ? 'padding: 23px 27px;' : '')} font-size: 30px;
  line-height: 38px;
`.withComponent('h4');

export default H4;
