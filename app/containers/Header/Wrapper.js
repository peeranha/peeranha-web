import styled from 'styled-components';
import { BG_LIGHT } from 'style-constants';

import { HEADER_HEIGHT } from './constants';

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  position: fixed;
  height: ${HEADER_HEIGHT}px;
  z-index: 9999;
  background: ${BG_LIGHT};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  padding: 20px 0;
  width: 100%;
  transition: 0.4s;

  &.scroll-hidden {
    top: 0px;
    transform: translate(0px, ${-HEADER_HEIGHT}px);
    box-shadow: none;
  }

  &.scroll-visible {
    top: ${-HEADER_HEIGHT}px;
    transform: translate(0px, ${HEADER_HEIGHT}px);
  }
`;

export default Wrapper;
