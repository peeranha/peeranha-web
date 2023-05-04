import styled from 'styled-components';

import Base from 'components/Base';
import { C3 } from './Simple';
import { singleCommunityColors } from 'utils/communityManagement';
import { isSuiBlockchain } from 'utils/sui/sui';

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
  border: 1px solid ${isSuiBlockchain ? colors.border : '#fff'};
  ${({ isColumnForSM }) => C3(isColumnForSM)};
`;
