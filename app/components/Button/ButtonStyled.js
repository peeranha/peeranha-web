import { white, darkgray, lightgray, gray, pink } from 'style-constants';
import Span from '../Span';

const ButtonStyled = Span.extend`
  color: ${white};
  border: none;
  cursor: pointer;
  padding: 9px 16px;
  border-radius: 3px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  background: ${pink};

  position: relative;
  overflow: hidden;

  span[data-icon='icon'] {
    stroke: ${white};
    fill: ${white};
    color: ${white};
  }

  :disabled {
    border: 1px solid ${gray};
    background-color: ${lightgray};
    color: ${darkgray};
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24);

    span[data-icon='icon'] {
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

export default ButtonStyled;
