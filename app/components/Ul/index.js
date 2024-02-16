import styled from 'styled-components';
import { BORDER_SECONDARY } from 'style-constants';
import { graphCommunityColors } from 'utils/communityManagement';

const graphCommunity = graphCommunityColors();

const Ul = styled.ul`
  padding: 12px 0;
  border-bottom: 1px solid ${graphCommunity ? 'none' : BORDER_SECONDARY};
`;

export default Ul;
