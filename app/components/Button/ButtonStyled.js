import styled from 'styled-components';

const ButtonStyled = styled.button`
  border: none;
  cursor: pointer;
  color: #fff;
  padding: 9px 16px;
  border-radius: 3px;
  min-width: 92px;
  font-size: 16px;
  font-family: Open Sans, sans-serif;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  background: #f76f60;
  line-height: 20px;
  height: 40px;

  position: relative;
  overflow: hidden;

  .chevron {
    margin-right: 12px;
  }

  :disabled {
    opacity: 0.5;
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
`;

export default ButtonStyled;
