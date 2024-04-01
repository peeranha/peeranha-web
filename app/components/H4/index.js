import { TEXT_DARK } from 'style-constants';
import { graphCommunityColors } from 'utils/communityManagement';

import Text from '../Span';

const graphCommunity = graphCommunityColors();

const H4 = Text.extend`
  color: ${graphCommunity ? '#E1E1E4' : TEXT_DARK};
  font-weight: 600;

  font-size: 30px;
  line-height: 38px;

  ${(x) => (x.isHeader ? 'padding: 23px 27px;' : '')};
`.withComponent('h4');

export default H4;
