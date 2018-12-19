import styled from 'styled-components';

const Gradient = styled.div`
  background-image: -webkit-linear-gradient(
    ${props => props.position || 'bottom'},
    #f9f9f9 0,
    #f8f8f8 0,
    #fafafa 25px,
    #fbfbfb 60%,
    #fcfcfc 80%,
    #fdfdfd 100%
  );
  background-image: -moz-linear-gradient(
    ${props => props.position || 'bottom'},
    #f9f9f9 0,
    #f8f8f8 0,
    #fafafa 25px,
    #fbfbfb 60%,
    #fcfcfc 80%,
    #fdfdfd 100%
  );
  background-image: -o-linear-gradient(
    ${props => props.position || 'bottom'},
    #f9f9f9 0,
    #f8f8f8 0,
    #fafafa 25px,
    #fbfbfb 60%,
    #fcfcfc 80%,
    #fdfdfd 100%
  );
  background-image: -ms-linear-gradient(
    ${props => props.position || 'bottom'},
    #f9f9f9 0,
    #f8f8f8 0,
    #fafafa 25px,
    #fbfbfb 60%,
    #fcfcfc 80%,
    #fdfdfd 100%
  );
  background-image: linear-gradient(
    ${props => props.position || 'bottom'},
    #f9f9f9 0,
    #f8f8f8 0,
    #fafafa 25px,
    #fbfbfb 60%,
    #fcfcfc 80%,
    #fdfdfd 100%
  );
`;

export default Gradient;
