import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
  form {
    width: 320px;
  }
  form * {
    margin: 3px 0;
  }
  .text-danger {
    padding-left: 10px;
    padding-top: 2px;
    font-size: 14px;
  }
`;

export default Wrapper;
