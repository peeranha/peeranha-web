import PropTypes from 'prop-types';
import styled from 'styled-components';

/* eslint indent: 0 */
const Circle = styled.div`
  width: 16px;
  height: 16px;
  background: #d3daf6;
  border-radius: 50%;
  background-color: #7699ff;
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
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #7699ff;
    opacity: 0.7;
    animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
    animation-delay: ${/* istanbul ignore next */ props =>
      props.number * 200}ms;

    transition: 0.5s all ease;
    transform: scale(1);
  }
`;

Circle.propTypes = {
  number: PropTypes.number.isRequired,
};

export default Circle;
