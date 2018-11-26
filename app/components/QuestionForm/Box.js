import styled from 'styled-components';

const Box = styled.form`
  width: 600px;
  margin: 20px auto;
  > div {
    margin: 10px 0;
  }
  .header {
    margin-bottom: 15px;
  }
  button > div {
    margin: 0 auto;
    width: 20px;
    height: 20px;
    > div::before {
      background: #fff;
    }
  }
  .text-danger {
    padding-left: 10px;
    padding-top: 2px;
    font-size: 14px;
  }
`;

export default Box;
