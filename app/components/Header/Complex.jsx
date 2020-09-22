import styled from 'styled-components';

import Base from 'components/Base';
import { C3 } from './Simple';

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
`;
