import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  form {
    flex-basis: 480px;
  }
  form * {
    margin: 3px 0;
  }
  .text-danger {
    padding-left: 10px;
    padding-top: 2px;
    font-size: 14px;
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

export default Wrapper;
