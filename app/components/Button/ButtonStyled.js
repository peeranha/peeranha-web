import { white, darkgray, lightgray, gray, pink } from 'style-constants';
import Span from '../Span';

const ButtonStyled = Span.extend`
  color: ${white};
  border: none;
  cursor: pointer;
  padding: 9px 16px;
  min-width: 92px;
  border-radius: 3px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  background: ${props => props.bg || pink};
  text-align: center;
  transition: 0.5s;

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
    box-shadow: none;

    span[data-icon='icon'] {
      stroke: ${gray};
      fill: ${gray};
      color: ${gray};
    }
  }

  ${props =>
    props.isRounded
      ? `
    width: 43px !important;
    height: 43px !important;
    border-radius: 50% !important;
    min-width: inherit !important;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.4);
  `
      : ``} :after {
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
