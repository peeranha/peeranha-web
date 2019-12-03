import Span from 'components/Span';

const Label = Span.extend`
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  margin-bottom: 6px;
`.withComponent('h6');

export default Label;
