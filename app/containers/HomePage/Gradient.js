import styled from 'styled-components';

const Gradient = styled.div`
  background-image: linear-gradient(
    to ${props => props.position || 'top'},
    #f9f9f9 0,
    #f8f8f8 0,
    #fafafa 25px,
    #fbfbfb 60%,
    #fcfcfc 80%,
    #fdfdfd 100%
  );
`;

export default Gradient;
