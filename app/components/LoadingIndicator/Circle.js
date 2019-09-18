import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BG_PRIMARY } from 'style-constants';

/* eslint indent: 0 */
const Circle = styled.div`
  width: 12px;
  height: 12px;
  background: #d3daf6;
  border-radius: 50%;
  background-color: ${BG_PRIMARY};
  margin: 6px;
  display: flex;
  justify-content: center;
  align-items: center;

  @keyframes scale {
    0% {
      transform: scale(1);
    }
    50%,
    75% {
      transform: scale(2);
    }
    78%,
    100% {
      opacity: 0;
    }
  }

  &:before {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${BG_PRIMARY};
    opacity: 0.7;
    animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
    animation-delay: ${x => x.number * 200}ms;

    transition: 0.5s all ease;
    transform: scale(1);
  }

  @media only screen and (max-width: 576px) {
    width: 10px;
    height: 10px;
    margin: 4px;

    &:before {
      width: 10px;
      height: 10px;
    }
  }
`;

Circle.propTypes = {
  number: PropTypes.number.isRequired,
};

export default Circle;
