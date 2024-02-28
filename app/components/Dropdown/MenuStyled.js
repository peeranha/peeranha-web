import styled from 'styled-components';

import { BG_LIGHT } from 'style-constants';
import { graphCommunityColors } from 'utils/communityManagement';

const graphCommunity = graphCommunityColors();

const MenuStyled = styled.div`
  margin: 10px 0;
  padding: 0;
  border-radius: 10px;
  min-width: max-content;
  overflow: hidden;
  background-color: ${graphCommunity ? '#1A172F' : BG_LIGHT};
  box-shadow: 0 0 4px 0 ${graphCommunity ? '' : 'rgba(0, 0, 0, 0.3)'};
  white-space: nowrap;
  z-index: 3;
  visibility: visible;
  border: 1px solid #3d3d54;
`;

export default MenuStyled;
