import styled from 'styled-components';
import { BG_LIGHT } from 'style-constants';

export default styled.div`
  position: relative;
  z-index: 500;
  background: ${BG_LIGHT};
  max-width: 480px;
  margin: 0 15px;
  padding: 30px;
  border-radius: 5px;
  transition: 1s;
  max-height: 95vh;
  overflow: auto;
  animation: TT111 0.5s;
  @keyframes TT111 {
    from {
      top: -450px;
    }
    to {
      top: 0px;
    }
  }
`;
