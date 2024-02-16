import styled from 'styled-components';
import { BG_LIGHT } from 'style-constants';
import { graphCommunityColors } from 'utils/communityManagement';

const graphCommunity = graphCommunityColors();

const BackSide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${graphCommunity ? '#161425' : BG_LIGHT};
  display: none;
  border-radius: 5px;

  > div {
    position: relative;
    height: 100%;
    padding: 20px;
    overflow-y: auto;
  }
`;

export default BackSide;
