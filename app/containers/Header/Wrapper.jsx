import styled from 'styled-components';
import { BG_LIGHT } from 'style-constants';

import { HEADER_HEIGHT, MOBILE_HEADER_HEIGHT } from './constants';

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  position: fixed;
  height: ${HEADER_HEIGHT}px;
  transform: translate(0px, 0px);
  z-index: 9999;
  background: ${BG_LIGHT};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  padding: 20px 0;
  width: 100%;
  transition: all 0.4s ease;

  form {
    flex: 1;
  }

  &.sticky {
    transform: translate(0px, -${HEADER_HEIGHT}px);
  }

  @media only screen and (max-width: 576px) {
    height: ${MOBILE_HEADER_HEIGHT}px;

    &.sticky {
      transform: translate(0px, -${MOBILE_HEADER_HEIGHT}px);
    }
  }
`;

export default Wrapper;
