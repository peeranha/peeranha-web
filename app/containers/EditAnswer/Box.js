import styled from 'styled-components';

const Box = styled.div`
  max-width: 640px;
  margin: 25px auto;
  button {
    min-width: 120px;
  }
  button > div {
    margin: 0 auto;
    width: 20px;
    height: 20px;
    > div::before {
      background: #fff;
    }
  }
`;

export default Box;
