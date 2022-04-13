import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BG_PRIMARY } from 'style-constants';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

const loaderBackground = colors.loaderColor || BG_PRIMARY;

/* eslint indent: 0 */
const Circle = styled.div`
  width: ${props => (props.width ? `${props.width}px` : '10px')};
  height: ${props => (props.height ? `${props.height}px` : '10px')};
  border-radius: 50%;
  background-color: ${loaderBackground};
  margin: ${props => (props.margin ? `${props.margin}px` : '10px')};
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
    width: ${props => (props.width ? `${props.width}px` : '10px')};
    height: ${props => (props.height ? `${props.height}px` : '10px')};
    border-radius: 50%;
    background-color: ${loaderBackground};
    opacity: 0.7;
    animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
    animation-delay: ${x => x.number * 200}ms;

    transition: 0.5s all ease;
    transform: scale(1);
  }

  @media only screen and (max-width: 576px) {
    margin: 4px;
  }
`;

Circle.propTypes = {
  number: PropTypes.number.isRequired,
};

export default Circle;
