import PropTypes from 'prop-types';
import styled from 'styled-components';

const Circle = styled.div`
  width: 20px;
  height: 20px;
  background: #1e90ff;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin: 7px;
  display: flex;
  justify-content: center;
  align-items: center;

  @keyframes scale {
    0% {
      transform: scale(1);
    }
    50%,
    75% {
      transform: scale(2.5);
    }
    78%,
    100% {
      opacity: 0;
    }
  }

  &:before {
    content: '';
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #1e90ff;
    opacity: 0.7;
    animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
    animation-delay: ${props => props.number * 200}ms;
    transition: 0.5s all ease;
    transform: scale(1);
  }
`;

Circle.propTypes = {
  number: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default Circle;
