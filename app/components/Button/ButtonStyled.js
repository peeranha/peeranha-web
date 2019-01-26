import AddText from '../AddText';

const ButtonStyled = AddText.extend`
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 9px 16px;
  border-radius: 3px;
  min-width: 92px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  background: #f76f60;
  height: 40px;

  position: relative;
  overflow: hidden;

  .chevron {
    color: #fff;
  }

  :disabled {
    border: 1px solid #bdbdbd;
    background-color: #efefef;
    color: #7b7b7b;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24);

    .chevron {
      color: #bdbdbd;
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
