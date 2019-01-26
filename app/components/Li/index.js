import AddText from '../AddText';

const Li = AddText.extend`
  color: #282828;
  padding: 0 15px;
  cursor: pointer;
  line-height: 28px;
`.withComponent('li');

export default Li;
