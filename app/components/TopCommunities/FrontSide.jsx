import styled from 'styled-components';
import { BORDER_SECONDARY } from '../../style-constants';

const FrontSide = styled.div`
  > div:first-child {
    padding: 20px 20px 10px;
  }
  > div:last-child {
    padding: 10px 20px 20px;
  }
  > div {
    div {
      margin-bottom: 10px;

      div {
        margin-bottom: 8px;
      }
    }

    &:not(:last-child) {
      border-bottom: 1px solid ${BORDER_SECONDARY};
    }
  }
`;

export default FrontSide;
