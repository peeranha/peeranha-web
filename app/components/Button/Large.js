import { css } from 'styled-components';
import { graphCommunityColors } from 'utils/communityManagement';

const graphCommunity = graphCommunityColors();

export default css`
  padding: 10px 18px;
  font-size: ${graphCommunity ? '14px' : '16px'};
  line-height: 18px;
  min-width: 92px;
  height: ${graphCommunity ? '48px' : '40px'};
  font-weight: ${graphCommunity ? 600 : ''};
`;
