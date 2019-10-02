import styled from 'styled-components';

export default styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    position: relative;
  }
`;
