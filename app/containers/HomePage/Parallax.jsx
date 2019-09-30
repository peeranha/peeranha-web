import bg from 'images/BG_main.jpg';
import animatedBG1 from 'images/QA_01-01.svg?inline';
import animatedBG2 from 'images/QA_02-01.png';

import Section from './Section';

const Parallax = Section.extend`
  position: relative;
  height: 100vh;
  background: url(${bg}) no-repeat;
  background-size: cover;
  padding: 0;

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
      background: url(${animatedBG1});
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
  }

  @media only screen and (max-width: 992px) {
    height: 100vmax;

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
