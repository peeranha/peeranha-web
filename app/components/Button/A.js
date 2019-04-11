import { white, darkgray, lightgray, gray } from 'style-constants';
import IconStyled from 'components/Icon/IconStyled';
import Span from '../Span';

const A = Span.extend`
  cursor: pointer;
  border-radius: 3px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  text-align: center;
  transition: 0.5s;
  min-width: 92px;
  padding: 4px 15px;

  position: relative;
  overflow: hidden;

  ${IconStyled} {
    stroke: ${white};
    fill: ${white};
    color: ${white};
  }

  :disabled {
    border: 1px solid ${gray};
    background-color: ${lightgray};
    color: ${darkgray};
    box-shadow: none;

    ${IconStyled} {
      stroke: ${gray};
      fill: ${gray};
      color: ${gray};
    }
  }

  :after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }

  @keyframes ripple {
    0% {
      transform: scale(0, 0);
      opacity: 1;
    }
    20% {
      transform: scale(25, 25);
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: scale(40, 40);
    }
  }

  :focus:not(:active)::after {
    animation: ripple 1s ease-out;
  }
`.withComponent('button');

export default A;
