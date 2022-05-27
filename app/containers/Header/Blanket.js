import styled from 'styled-components';
import { BG_PRIMARY_BLANKET } from 'style-constants';
import { LOADER_HEIGHT } from './constants';

export default styled.div`
  position: fixed;
  top: ${LOADER_HEIGHT}px;
  left: 0;
  width: 100%;
  height: calc(${(x) => x.hieght}px - ${LOADER_HEIGHT}px);
  z-index: 400;
  background: ${BG_PRIMARY_BLANKET};
`;
