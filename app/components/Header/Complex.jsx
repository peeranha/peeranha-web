import styled from 'styled-components';
import { singleCommunityColors } from 'utils/communityManagement';
import { isSuiBlockchain } from 'utils/sui/sui';
import Base from 'components/Base';
import { C3 } from './Simple';

const colors = singleCommunityColors();

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
  border: ${isSuiBlockchain ? `1px solid ${colors.border}` : 'none'};
  ${({ isColumnForSM }) => C3(isColumnForSM)};
`;
