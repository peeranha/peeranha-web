import styled from 'styled-components';
import { BG_LIGHT } from '../../style-constants';

const BackSide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${BG_LIGHT};
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
