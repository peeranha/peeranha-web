import styled from 'styled-components';

/* istanbul ignore next */
const Gradient = styled.div`
  background-image: linear-gradient(
    to ${props => props.position || 'top'},
    #fbfbfb 0,
    #fcfcfc 10px,
    #fdfdfd 20px,
    #fefefe 30px,
    #ffffff 40px
  );
  background-repeat: no-repeat;
  background-size: 100% 50px;
  background-position: ${props =>
    props.position === 'bottom' ? 'top' : 'bottom'};
`;

export default Gradient;
