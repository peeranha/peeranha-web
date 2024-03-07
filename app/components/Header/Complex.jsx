/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';
import { isSuiBlockchain } from 'utils/constants';
import Base from 'components/Base';
import { C3 } from './Simple';
singleCommunityColors();
const graphCommunity = graphCommunityColors();

export const SubHeaderWrapperRightPanel = styled.div`
  align-self: center;
  width: auto !important;
  margin-top: 5px !important;

  button {
    .button-label {
      @media only screen and (max-width: 576px) {
        display: none;
      }
    }
  }
`;

export default Base.extend`
  ${({ isColumnForSM }) => C3(isColumnForSM)};
  border: 1px solid ${isSuiBlockchain ? '#D0DAE6' : graphCommunity ? '#3D3D54' : '#fff'};
`;
