import styled from 'styled-components';
import { BG_LIGHT } from 'style-constants';

export default styled.div`
  position: relative;
  z-index: 500;
  background: ${BG_LIGHT};
  width: 420px;
  margin: 0 15px;
  padding: 30px;
  border-radius: 5px;
  transition: 1s;
  max-height: 95vh;
  overflow: auto;
  animation: moveFromTopToCenter 0.5s;

  @keyframes moveFromTopToCenter {
    from {
      top: -450px;
    }
    to {
      top: 0px;
    }
  }

  @media only screen and (max-width: 414px) {
    padding: 20px;
    margin: 0 5px;
  }
`;
