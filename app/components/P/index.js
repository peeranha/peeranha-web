import Span from 'components/Span';

import { graphCommunityColors } from 'utils/communityManagement';

const graphCommunity = graphCommunityColors();

export default Span.extend`
  display: block;
  color: ${graphCommunity ? 'rgba(167, 167, 173, 1)' : '#7b7b7b'};
`.withComponent('p');
