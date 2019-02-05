import styled from 'styled-components';
import { white } from 'style-constants';

export const HEADER_HEIGHT = 80;

const Wrapper = styled.header`
  position: relative;
  height: ${HEADER_HEIGHT}px;
  z-index: 9999;
  background: ${white};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  padding: 20px 0;
`;

export default Wrapper;
