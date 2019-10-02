import styled from 'styled-components';

export default styled.form`
  position: relative;
  padding-left: ${x => x.size}px;
  padding-bottom: 50px;

  @media only screen and (max-width: 768px) {
    padding-left: 0;
  }
`;
