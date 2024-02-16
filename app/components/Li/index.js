import { TEXT_DARK } from 'style-constants';
import { graphCommunityColors } from 'utils/communityManagement';
import Span from '../Span';

const graphCommunity = graphCommunityColors();

const Li = Span.extend`
  color: ${graphCommunity ? '#E1E1E4' : TEXT_DARK};
  padding: 0 15px;
  cursor: pointer;
  line-height: 28px;
  display: flex;
  align-items: center;
`.withComponent('li');

export default Li;
