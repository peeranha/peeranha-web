import styled from 'styled-components';
import { BG_LIGHT } from 'style-constants';

import IconStyled from 'components/Icon/IconStyled';

export default styled.div`
  position: relative;
  animation: moveFromTopToCenter 0.5s;

  @keyframes moveFromTopToCenter {
    from {
      top: -450px;
    }
    to {
      top: 0px;
    }
  }

  > ${IconStyled} {
    position: absolute;
    cursor: pointer;
    top: -18px;
    right: -8px;
    z-index: 500;
  }

  > div {
    position: relative;
    z-index: 500;
    background: ${BG_LIGHT};
    width: 410px;
    margin: 0 15px;
    padding: 30px;
    border-radius: 5px;
    transition: 1s;
    max-height: 95vh;
    overflow: auto;

    @media only screen and (max-width: 414px) {
      width: auto;
      padding: 20px;
      margin: 0 10px;
    }
  }
`;
