import styled from 'styled-components';

import * as bg from 'images/BG_main.jpg';
import * as animatedBG1 from 'images/Paralax_01.svg';
import * as animatedBG3 from 'images/bg33.png';

import { FIRST_SCREEN, THIRD_SCREEN } from './constants';

const choice = {
  [FIRST_SCREEN]: {
    height: '100vh',
    animatedBG: animatedBG1,
  },
  [THIRD_SCREEN]: {
    height: 'auto',
    animatedBG: animatedBG3,
  },
};

const Parallax = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => choice[props.id].height};
  background: url(${bg}) no-repeat;
  background-size: cover;

  .layers {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    .pattern {
      position: absolute;
      top: -10px;
      left: -10px;
      bottom: -10px;
      right: -10px;
      background-position: top left;

      .inner {
        transform: translate(-10px, 10px);
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }
    }

    & .pattern-1 .inner {
      background: url(${props => choice[props.id].animatedBG});
      background-size: contain;
      opacity: 0.6;
      animation: Floating 10s infinite;
    }
  }

  @keyframes Floating {
    0% {
      transform: translate(-10px, 10px);
    }
    50% {
      transform: translate(10px, -10px);
    }
    100% {
      transform: translate(-10px, 10px);
    }
  }
`;

export default Parallax;
