import styled from 'styled-components';

import * as bg from 'images/BG_main.jpg';
import * as animatedBG1 from 'images/Paralax_01.svg';
import * as animatedBG2 from 'images/Paralax_02.svg';
import * as animatedBG3 from 'images/Paralax_03.svg';

import { FIRST_SCREEN } from './constants';

const choice = {
  [FIRST_SCREEN]: {
    height: '100vh',
    animatedBG: animatedBG1,
  },
};

const Parallax = styled.section`
  position: relative;
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
      background-size: 100%;
      opacity: 0.7;
      animation: Floating 10s infinite;
    }

    & .pattern-2 .inner {
      background: url(${animatedBG2});
      background-size: 85%;
      opacity: 0.5;
      animation: Floating 8s infinite;
      animation-delay: 1s;
    }

    & .pattern-3 .inner {
      background: url(${animatedBG3});
      background-size: 70%;
      opacity: 0.7;
      animation: Floating 8s infinite;
      animation-delay: 2s;
    }
  }

  @media only screen and (max-width: 992px) {
    & .pattern-1 .inner,
    & .pattern-2 .inner,
    & .pattern-3 .inner {
      background-size: cover !important;
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
