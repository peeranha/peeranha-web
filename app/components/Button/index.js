import styled from 'styled-components';

import _get from 'lodash/get';

import { singleCommunityStyles } from 'utils/communityManagement';

const styles = singleCommunityStyles();

const Button = styled.button`
  cursor: pointer;
  border-radius: ${_get(styles, 'buttonsBorderRadius', '3px')};
  text-align: center;
  transition: 0.5s;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  position: relative;
  overflow: hidden;
  pointer-events: ${x => (x.disabled ? 'none' : 'auto')};
  opacity: ${x => (x.disabled ? '0.5' : '1')};

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

export default Button;
